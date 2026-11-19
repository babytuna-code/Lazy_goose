// =====================================================
// theme.js — ลูกเล่นที่ใช้ทุกหน้า
//  - ก้อนเมฆลอยผ่านด้านหลังช้า ๆ
//  - แตะ/คลิกพื้นที่ว่าง มีดอกเดซี่กระจาย
//  ปิดเองเมื่อเครื่องตั้ง "ลดการเคลื่อนไหว"
// =====================================================
// นาฬิกากลางของทั้งเว็บ (เก็บเวลาเริ่มไว้ในแท็บนี้): เมฆและห่านเดินคำนวณตำแหน่งจากเวลานี้
// เปลี่ยนหน้า/เปลี่ยนข้อแล้วจึงเคลื่อนต่อจากตำแหน่งเดิม ไม่เริ่มใหม่จากขอบจอ
window.lgElapsed = function () {
    let e = window.__lgEpoch;
    if (!e) {
        try { e = +sessionStorage.getItem("lgEpoch"); if (!e) { e = Date.now(); sessionStorage.setItem("lgEpoch", String(e)); } }
        catch (_) { e = Date.now(); }
        window.__lgEpoch = e;
    }
    return (Date.now() - e) / 1000;
};

(function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ---------- ก้อนเมฆ ----------
    const cloudSVG =
        '<svg viewBox="0 0 120 64" aria-hidden="true"><path d="M22 56 C8 56 4 42 14 36 C10 22 28 14 38 22 C42 8 66 4 74 18 ' +
        'C84 10 102 16 100 30 C114 30 118 48 106 54 C104 56 102 56 98 56 Z" fill="#fff" stroke="#3b2516" stroke-width="3.5" stroke-linejoin="round"/></svg>';
    const wide = window.innerWidth >= 700;
    const clouds = wide
        ? [{ y: "15%", w: 170, t: 75, d: -12 }, { y: "42%", w: 130, t: 95, d: -60 }, { y: "66%", w: 155, t: 85, d: -32 }]   // เมฆขาวลายเส้นที่ลอย
        : [{ y: "18%", w: 100, t: 60, d: -22 }, { y: "58%", w: 80, t: 75, d: -48 }];
    clouds.forEach(c => {
        const el = document.createElement("div");
        el.className = "lg-cloud";
        el.setAttribute("aria-hidden", "true");
        el.innerHTML = cloudSVG;
        el.style.setProperty("--y", c.y);
        el.style.setProperty("--w", c.w + "px");
        el.style.setProperty("--t", c.t + "s");
        el.style.setProperty("--d", -(((window.lgElapsed() - c.d) % c.t + c.t) % c.t) + "s");   // ต่อจากตำแหน่งเดิม
        document.body.appendChild(el);
    });

    // ---------- ดอกเดซี่กระจาย ----------
    const SKIP = "button, a, input, select, textarea, label, [role=button], [role=dialog], .tip-overlay, .guide-overlay, .feedback-overlay, .settings-wrap, .calc-panel, .balloon, .ball-option, .tile, .flashcard";
    document.addEventListener("pointerdown", e => {
        if (e.target.closest(SKIP)) return;
        for (let i = 0; i < 6; i++) {
            const d = document.createElement("span");
            d.className = "lg-burst";
            const ang = (Math.PI * 2 * i) / 6 + Math.random() * 0.6;
            const dist = 38 + Math.random() * 34;
            d.style.left = e.clientX + "px";
            d.style.top = e.clientY + "px";
            d.style.setProperty("--dx", Math.cos(ang) * dist + "px");
            d.style.setProperty("--dy", Math.sin(ang) * dist + "px");
            d.style.setProperty("--r", (Math.random() * 240 - 120) + "deg");
            document.body.appendChild(d);
            d.addEventListener("animationend", () => d.remove());
        }
    }, { passive: true });
})();

/* =====================================================
   คลื่นสีเขียวบน/ล่างแบบพิกเซล (ทุกหน้า)
   อ่านเส้นโค้งเดิมของคลื่น แล้ววาดใหม่เป็นขั้นบันไดสี่เหลี่ยมจัตุรัส ตามขนาดจอจริง
   (คำนวณใหม่ทุกครั้งที่เปลี่ยนขนาดจอ ขั้นจึงเป็นจัตุรัสเสมอ ไม่ยืดเบี้ยว)
===================================================== */
(function () {
    const waves = [...document.querySelectorAll(".lg-wave")];
    if (!waves.length) return;

    // เก็บเส้นโค้งต้นฉบับ (ในหน่วย viewBox 1000 x 100) ไว้ครั้งเดียว
    waves.forEach(w => {
        const svg = w.querySelector("svg");
        if (!svg || svg.__src) return;
        const paths = [...svg.querySelectorAll("path")];
        svg.__src = paths.map(p => ({ el: p, cls: p.getAttribute("class") || "", d: p.getAttribute("d") }));
    });

    // แปลงเส้นโค้งเป็นตาราง y ตาม x (0..1000) ด้วยการสุ่มจุดตามความยาวเส้น
    function sampler(d) {
        const ns = "http://www.w3.org/2000/svg";
        const tmp = document.createElementNS(ns, "svg");
        tmp.setAttribute("width", "0"); tmp.setAttribute("height", "0");
        tmp.style.position = "absolute"; tmp.style.visibility = "hidden";
        const p = document.createElementNS(ns, "path"); p.setAttribute("d", d); tmp.appendChild(p);
        document.body.appendChild(tmp);
        const L = p.getTotalLength(), pts = [];
        for (let i = 0; i <= 400; i++) { const q = p.getPointAtLength(L * i / 400); pts.push([q.x, q.y]); }
        tmp.remove();
        pts.sort((a, b) => a[0] - b[0]);
        return x => {
            let i = pts.findIndex(q => q[0] >= x);
            if (i <= 0) return pts[Math.max(0, i)][1];
            const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
            return x1 === x0 ? y0 : y0 + (y1 - y0) * (x - x0) / (x1 - x0);
        };
    }

    // เนินหญ้าแบบลายเส้นวาดมือ (โทนสีตามภาพตัวอย่าง): ขอบเป็นพุ่มลอนเล็กใหญ่สลับกัน + เส้นขอบเข้มบาง,
    // แถบเงา 1 ชั้นใต้ขอบ (ขอบล่างของเงาเป็นลอน), และขีดหญ้าสั้น ๆ กระจายห่าง ๆ 3 แถวใกล้ขอบ
    const HILL = {
        back:  { base: "#7eb438", shade: "#61912a" },
        front: { base: "#beda56", shade: "#9cbc42" }
    };
    const OUT = "#2b2622";                                              // เส้นขอบ
    const DASH = "rgba(43, 38, 34, 0.4)";                              // ขีดหญ้า
    // ค่าสุ่มคงที่ตามตำแหน่ง (ลายเหมือนเดิมทุกครั้งที่เปิดหน้า)
    const hash = (a, b, k) => {
        let h = (a * 374761393 + b * 668265263 + k * 2147483647) | 0;
        h = Math.imul(h ^ (h >>> 13), 1274126177);
        return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
    };

    function render() {
        waves.forEach(w => {
            const svg = w.querySelector("svg");
            if (!svg || !svg.__src) return;
            const W = Math.max(1, w.clientWidth), H = Math.max(1, w.clientHeight);
            const dpr = Math.min(3, window.devicePixelRatio || 1);
            const top = w.classList.contains("top");
            const get = cls => svg.__src.map((src, i) => ({ src, i })).filter(o => o.src.cls.split(/\s+/).includes(cls));
            const edges = get("edge"), backP = get("back")[0], frontP = get("fill")[0];
            if (edges.length < 2 || !backP || !frontP) return;
            svg.__fn = svg.__fn || {};
            const fb = svg.__fn[edges[0].i] || (svg.__fn[edges[0].i] = sampler(edges[0].src.d));   // ขอบเนินหลัง
            const ff = svg.__fn[edges[1].i] || (svg.__fn[edges[1].i] = sampler(edges[1].src.d));   // ขอบเนินหน้า
            let cv = w.querySelector("canvas.px-wave-cv");
            if (!cv) { cv = document.createElement("canvas"); cv.className = "px-wave-cv"; w.appendChild(cv); }
            cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
            cv.style.width = W + "px"; cv.style.height = H + "px";
            const ctx = cv.getContext("2d");
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, cv.width, cv.height);
            const dir = top ? 1 : -1;                                   // ทิศที่ยื่นออกไปทางท้องฟ้า (ในพิกัดจอ)
            const baseY = (fe, x) => fe(Math.min(1000, Math.max(0, x / W * 1000))) / 100 * H;
            // ลอนพุ่มกว้าง 14–28px สุ่มคงที่ (เริ่มนับจากขอบซ้ายจอ) สูงราว 30% ของความกว้าง
            const bumpsFor = k => {
                const L = []; let x = -30, i = 0;
                while (x < W + 30) { const bw = 14 + hash(i, k, 91) * 14; L.push([x, bw]); x += bw; i++; }
                return L;
            };
            const edgeAt = (fe, L, x, amp) => {
                let lo = 0, hi = L.length - 1;
                while (lo < hi) { const m = (lo + hi + 1) >> 1; if (L[m][0] <= x) lo = m; else hi = m - 1; }
                const [x0, bw] = L[lo], u = (x - x0) / bw * 2 - 1;
                return baseY(fe, x) + dir * bw * amp * Math.sqrt(Math.max(0, 1 - u * u));
            };
            const trace = (f, close) => {
                ctx.beginPath();
                const yEnd = top ? -4 : H + 4;
                if (close) ctx.moveTo(-6, yEnd);
                for (let x = -6; x <= W + 6; x += 1) {
                    const y = f(x);
                    (!close && x === -6) ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                if (close) { ctx.lineTo(W + 6, yEnd); ctx.closePath(); }
            };
            [[HILL.back, fb, 1], [HILL.front, ff, 2]].forEach(([C, fe, k]) => {
                const L = bumpsFor(k), L2 = bumpsFor(k + 5);
                const edge = x => edgeAt(fe, L, x, 0.3);
                // ขอบล่างของแถบเงา: ลึกเข้าไป ~9px และเป็นลอนกลับด้าน
                const shadeEdge = x => baseY(fe, x) - dir * 9 - dir * (edgeAt(fe, L2, x, 0.22) - baseY(fe, x));
                ctx.save();
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                trace(edge, true);
                ctx.fillStyle = C.shade; ctx.fill();
                ctx.save(); ctx.clip();
                trace(shadeEdge, true);
                ctx.fillStyle = C.base; ctx.fill();
                // ขีดหญ้าสั้น ๆ เฉพาะ 3 แถวใกล้ขอบ เว้นช่วงห่างแบบสุ่ม (ดูเป็นกอหญ้าเล็ก ๆ ไม่ใช่เส้นประ)
                ctx.strokeStyle = DASH; ctx.lineWidth = 1.3; ctx.lineCap = "round";
                for (let row = 0; row < 3; row++) {
                    const depth = 17 + row * 9;
                    let x = -10 + hash(row, k, 7) * 30, j = 0;
                    ctx.beginPath();
                    while (x < W + 10) {
                        const len = 3 + hash(row, j, k + 30) * 4;
                        if (hash(j, row, k + 40) < 0.45) {
                            const jy = (hash(j, row, k + 45) - 0.5) * 4;
                            const y1 = baseY(fe, x) - dir * (depth + jy), y2 = baseY(fe, x + len) - dir * (depth + jy);
                            ctx.moveTo(x, y1); ctx.lineTo(x + len, y2);
                        }
                        x += len + 14 + hash(j, row, k + 50) * 40; j++;
                    }
                    ctx.stroke();
                }
                ctx.restore();
                // เส้นขอบเข้มตามพุ่มลอน
                trace(edge, false);
                ctx.strokeStyle = OUT; ctx.lineWidth = 2.2; ctx.lineJoin = "round"; ctx.stroke();
                ctx.restore();
            });
            w.classList.add("px-wave-cv-on");
            if (!top) w.__surf = { edge: x => fb(x / W * 1000) / 100 * H, front: x => ff(x / W * 1000) / 100 * H };
        });
        if (window.__lgPlaceCastle) window.__lgPlaceCastle();
    }

    let t = 0;
    const later = () => { clearTimeout(t); t = setTimeout(render, 60); };
    render();
    window.addEventListener("resize", later);
    window.addEventListener("orientationchange", later);
})();

/* ของตกแต่งบนเนินเขียวด้านล่าง (ทุกหน้า) — อยู่หลังการ์ด/กรอบเนื้อหา เป็นฉากหลัง
   ซ้าย: ต้นไม้ + กอหญ้า   ขวา: ปราสาทเล็ก ๆ อยู่หลังดอกเดซี่ */
(function () {
    const SCRIPT_SRC = document.currentScript && document.currentScript.src;
    if (!document.querySelector(".lg-wave.bottom") || document.querySelector(".lg-tree")) return;
    const mk = cls => { const d = document.createElement("div"); d.className = cls; d.setAttribute("aria-hidden", "true"); return d; };
    const wave = document.querySelector(".lg-wave.bottom");
    const daisies = document.querySelector(".lg-daisies");
    // วางต่อจากคลื่น (ทับคลื่น) แต่ก่อนดอกเดซี่ (ปราสาทอยู่หลังดอกเดซี่)
    const ref = daisies || wave.nextSibling;
    const castle = mk("lg-castle");
    [castle, mk("lg-tree"), mk("lg-grass")].forEach(el => wave.parentNode.insertBefore(el, ref));
    // ปราสาทตั้งอยู่บนขอบบนสุดของเนินเขียวด้านล่าง (อ่านความสูงจริงของเนินตรงตำแหน่งปราสาท)
    window.__lgPlaceCastle = function () {
        const sf = wave.__surf;
        if (!sf || !castle.isConnected) return;
        const cr = castle.getBoundingClientRect(), vr = wave.getBoundingClientRect();
        if (!cr.width) return;
        const ys = [];
        for (let i = 0; i <= 8; i++) ys.push(sf.edge(cr.left - vr.left + cr.width * (0.15 + 0.7 * i / 8)));
        ys.sort((a, b) => a - b);
        const surf = vr.top + ys[Math.floor(ys.length * 0.6)];              // ผิวเนินใต้ปราสาท (ค่อนต่ำเล็กน้อย ไม่ให้ลอย)
        castle.style.bottom = Math.max(0, innerHeight - surf - 4) + "px";
        castle.style.visibility = "visible";
    };
    window.__lgPlaceCastle();

    // ---------- หน้าแบบทดสอบ: ห่านเดินไป-กลับบนเนินหญ้าด้านล่าง (ตามโค้งเนิน) ----------
    // อยู่หลังต้นไม้และดอกเดซี่ แต่อยู่หน้าปราสาท / เดินหลุดขอบจอแล้วกลับตัวเดินเข้ามาใหม่ วนไปเรื่อย ๆ
    if (/\/(quiz\d+|[a-z]+play\d+)\.html$/i.test(location.pathname) &&
        !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) {
        const base = (SCRIPT_SRC || "").replace(/common\/theme\.js.*$/, "");
        const g = document.createElement("img");
        g.className = "lg-walker";
        g.alt = ""; g.setAttribute("aria-hidden", "true"); g.draggable = false;
        g.src = base + "pics/goose-walk.gif";   // ห่านเดินแบบไม่มีเงาใต้เท้า
        const tree = document.querySelector(".lg-tree");
        wave.parentNode.insertBefore(g, tree);                     // DOM: ปราสาท → ห่าน → ต้นไม้ → หญ้า → ดอกเดซี่
        let gw = 120;
        const size = () => {
            const dz = daisies && daisies.getBoundingClientRect();
            gw = Math.max(80, ((dz && dz.height) || 60) / 0.37 * 0.85);   // สูงประมาณดอกเดซี่
            g.style.width = gw + "px";
        };
        size(); addEventListener("resize", size);
        (function tick() {
            const sf = wave.__surf;
            if (sf && sf.front) {
                // ตำแหน่งคำนวณจากนาฬิกากลาง: เดินซ้าย→ขวาจนหลุดจอ แล้วกลับขวา→ซ้าย วนไปเรื่อย ๆ
                const vis = gw * 0.56, speed = vis * 0.36 / 0.68;       // ความเร็วเท่าจังหวะก้าวของภาพห่าน
                const x0 = -vis - 30, L = innerWidth + 30 - x0;
                const ph = (window.lgElapsed() * speed) % (2 * L);
                const dir = ph < L ? 1 : -1;
                const x = ph < L ? x0 + ph : innerWidth + 30 - (ph - L);
                const vr = wave.getBoundingClientRect();
                const cx = x + vis / 2 - vr.left;
                const ground = vr.top + sf.front(cx);
                const ang = Math.atan2(sf.front(cx + 12) - sf.front(cx - 12), 24);
                g.style.transform = `translate(${x - gw * 0.22}px, ${ground - gw * 0.655}px) rotate(${ang}rad) scaleX(${dir})`;
            }
            requestAnimationFrame(tick);
        })(0);
    }
})();

/* =====================================================
   กรอบเนื้อหาที่เลื่อนได้: ไล่จางขอบล่างเฉพาะตอนที่ยังมีเนื้อหาให้เลื่อนลงต่อ
   (ถ้าเนื้อหาพอดีจอ หรือเลื่อนถึงล่างสุดแล้ว ขอบล่างของกรอบจะเห็นชัดเต็ม ๆ)
===================================================== */
(function () {
    const els = [...document.querySelectorAll(".lesson-content")];
    if (!els.length) return;
    const upd = el => el.classList.toggle("lg-more", el.scrollTop + el.clientHeight < el.scrollHeight - 2);
    const all = () => els.forEach(upd);
    els.forEach(el => {
        el.addEventListener("scroll", () => upd(el), { passive: true });
        if (window.ResizeObserver) {
            const ro = new ResizeObserver(() => upd(el));
            ro.observe(el);
            [...el.children].forEach(c => ro.observe(c));
        }
    });
    addEventListener("resize", all);
    addEventListener("load", all);
    all();
})();


/* =====================================================
   การ์ดบทเรียนที่วางคู่กันในแถวเดียว (layout-pairs):
   ให้ส่วนหัวสี (ชมพู/เขียว/เหลือง/ฟ้า) สูงเท่ากันทั้งแถว แม้การ์ดหนึ่งมีปุ่มใต้หัวข้อแต่อีกการ์ดไม่มี
===================================================== */
(function () {
    const box = document.querySelector(".lesson-content.layout-pairs");
    if (!box) return;
    function eq() {
        const heads = [...box.querySelectorAll(":scope > .lesson-sec.card:not(.span-full) > .sec-head")];
        heads.forEach(h => { h.style.minHeight = ""; });
        const rows = {};
        heads.forEach(h => {
            const k = h.closest(".card").offsetTop;
            (rows[k] = rows[k] || []).push(h);
        });
        Object.values(rows).forEach(r => {
            if (r.length < 2) return;
            const m = Math.max(...r.map(h => h.offsetHeight));
            r.forEach(h => { h.style.minHeight = m + "px"; });
        });
    }
    let t = 0;
    const later = () => { clearTimeout(t); t = setTimeout(eq, 60); };
    eq();
    addEventListener("resize", later);
    addEventListener("load", eq);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(eq);
})();
