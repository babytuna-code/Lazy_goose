// =====================================================
// scroll.js — ลูกเล่นของหน้าเนื้อหาแบบเลื่อน (ใช้คู่กับ scroll.css)
//  1. การ์ดเด้งขึ้นเมื่อเลื่อนถึง + เนื้อหาในการ์ดค่อย ๆ ขึ้นทีละชิ้น
//  2. ชื่อเรื่อง / หัวข้อการ์ด ตัวอักษรเด้งทีละตัว
//  3. ป๊อปอัปเคล็ดลับ (ปุ่ม "จำง่าย ๆ" / "ลองคิดดู" / "ขั้นตอนทำโจทย์")
//  4. การ์ดเอียงตามเมาส์ (คอม)
//  (ก้อนเมฆ / ดอกเดซี่กระจาย อยู่ใน theme.js ใช้ทุกหน้า)
//  ปิดลูกเล่นการเคลื่อนไหวทั้งหมดเมื่อเครื่องตั้ง "ลดการเคลื่อนไหว"
// =====================================================

(function () {
    const box = document.querySelector(".lesson-content.scroll-all");
    if (!box) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = [...box.querySelectorAll(".lesson-sec.card")];

    // ---------- 2. แยกตัวอักษร (เก็บสระ/วรรณยุกต์ไทยไว้กับพยัญชนะ) ----------
    function splitLetters(el) {
        if (!el || el.children.length) return;          // มีเศษส่วน/แท็กอื่นข้างใน → ไม่แยก
        const text = el.textContent.replace(/\s+/g, " ").trim();
        if (!text) return;
        // หัวข้อยาว (เช่น โจทย์ทั้งประโยค) ไม่ต้องเด้งทีละตัว จะได้อ่านได้ทันที
        if (text.length > 26) return;
        const seg = (str, g) => (window.Intl && Intl.Segmenter)
            ? [...new Intl.Segmenter("th", { granularity: g }).segment(str)].map(x => x.segment)
            : (g === "word" ? str.split(/(\s+)/) : (str.match(/[\s\S][\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]*/g) || [str]));
        el.setAttribute("aria-label", text);
        el.textContent = "";
        // ห่อทั้งหมดไว้ในกล่องเดียว (หัวข้อแบบ pill เป็น flex จะได้ไม่ตัดช่องว่าง/ไม่ล้น)
        const box = document.createElement("span");
        box.className = "lg-t";
        el.appendChild(box);
        let c = 0;
        // แยกเป็นคำก่อน (ตัดบรรทัดได้เฉพาะระหว่างคำ) แล้วแยกตัวอักษรในคำ (สระ/วรรณยุกต์ติดกับพยัญชนะ)
        seg(text, "word").forEach(word => {
            if (/^\s+$/.test(word)) { box.appendChild(document.createTextNode(" ")); return; }
            const w = document.createElement("span");
            w.className = "lg-w";
            w.setAttribute("aria-hidden", "true");
            seg(word, "grapheme").forEach(p => {
                const s = document.createElement("span");
                s.className = "lg-ch";
                s.style.setProperty("--c", c++);
                s.textContent = p;
                w.appendChild(s);
            });
            box.appendChild(w);
        });
    }

    if (!reduce) {
        // ไม่ใส่แอนิเมชันตอนเปิดหน้า (ทำให้หน้ากะพริบ) — การ์ดแสดงทันที
        splitLetters(box.querySelector(".hero-title"));
        cards.forEach(c => splitLetters(c.querySelector(".sec-title")));

        box.querySelectorAll(".topic-card").forEach((c, i) => c.style.setProperty("--i", i));

        // ลำดับเนื้อหาในการ์ด
        cards.forEach(c => {
            [...c.querySelectorAll(".sec-body .stack > *")].forEach((el, i) => el.style.setProperty("--i", Math.min(i, 8)));
        });

        // ---------- 1. เด้งขึ้นเมื่อเลื่อนถึง ----------
        if ("IntersectionObserver" in window) {
            const io = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add("in");
                        io.unobserve(e.target);
                    }
                });
            }, { root: box, threshold: 0.12 });
            cards.forEach(c => io.observe(c));
        } else {
            cards.forEach(c => c.classList.add("in"));
        }
    }

    // ---------- 3. ป๊อปอัปเคล็ดลับ ----------
    // สีหัวป๊อปอัป = สีของกรอบการ์ดที่ปุ่มนั้นอยู่
    function lgToneOf(el) {
        const host = el && el.closest('[class*="tone-"]');
        const m = host && host.className.match(/tone-(pink|green|blue|yellow)/);
        return m ? m[1] : "yellow";
    }
    window.lgToneOf = lgToneOf;
    const overlay = document.createElement("div");
    overlay.className = "tip-overlay";
    overlay.hidden = true;
    overlay.innerHTML =
        '<section class="tip-card" role="dialog" aria-modal="true" aria-labelledby="tipTitle">' +
        '<div class="tip-head"><h3 class="tip-title" id="tipTitle"></h3>' +
        '<button type="button" class="tip-close-x" aria-label="ปิด">✕</button></div>' +
        '<div class="tip-body"></div>' +
        '<button type="button" class="tip-ok">เข้าใจแล้ว</button></section>';
    document.body.appendChild(overlay);

    const tipTitle = overlay.querySelector(".tip-title");
    const tipBody = overlay.querySelector(".tip-body");
    const tipCard = overlay.querySelector(".tip-card");
    let lastBtn = null;

    function openTip(btn) {
        const tpl = document.getElementById(btn.dataset.tip);
        if (!tpl) return;
        const frag = tpl.content.cloneNode(true);
        tipTitle.textContent = frag.querySelector(".tip-title").textContent;
        tipBody.innerHTML = "";
        const srcBody = frag.querySelector(".tip-body");
        tipBody.className = srcBody.className;
        tipBody.append(...srcBody.childNodes);
        lastBtn = btn;
        overlay.dataset.tone = lgToneOf(btn);
        overlay.hidden = false;
        // เล่นแอนิเมชันเปิดใหม่ทุกครั้ง
        tipCard.style.animation = "none";
        void tipCard.offsetWidth;
        tipCard.style.animation = "";
        overlay.querySelector(".tip-ok").focus({ preventScroll: true });
    }

    function closeTip() {
        overlay.hidden = true;
        if (lastBtn) lastBtn.focus({ preventScroll: true });
    }

    box.querySelectorAll(".sec-tip").forEach(btn => btn.addEventListener("click", () => openTip(btn)));
    overlay.querySelector(".tip-ok").addEventListener("click", closeTip);
    overlay.querySelector(".tip-close-x").addEventListener("click", closeTip);
    overlay.addEventListener("click", e => { if (e.target === overlay) closeTip(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) closeTip(); });

    if (reduce) return;

    // ---------- 4. การ์ดเอียงตามเมาส์ (เฉพาะคอมที่มีเมาส์) ----------
    if (window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 760px)").matches) {
        cards.forEach(card => {
            card.addEventListener("pointermove", e => {
                // เมาส์อยู่บนปุ่ม/ช่องกรอก/รูปที่คลิกได้: หยุดเอียงไว้ที่เดิม ปุ่มจะไม่เลื่อนหนีเมาส์ตอนกด
                if (e.target.closest("button, a, input, select, textarea, [role=button], .pr-shape, .flashcard, .balloon")) return;
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `perspective(1100px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-3px)`;
                card.style.boxShadow = "0 11px 0 var(--line)";
            });
            card.addEventListener("pointerleave", () => {
                card.style.transform = "";
                card.style.boxShadow = "";
            });
        });
    }


    // ---------- ของตกแต่งในช่องว่าง: การ์ดคู่ที่สูงไม่เท่ากัน เติมห่าน/ดอกเดซี่ใต้ใบที่สั้นกว่า ----------
    function fillGaps() {
        box.querySelectorAll(".gap-deco").forEach(e => e.remove());
        if (window.innerWidth < 1000) return;
        const rows = {};
        cards.forEach(c => { if (!c.classList.contains("span-full")) (rows[c.offsetTop] = rows[c.offsetTop] || []).push(c); });
        let k = 0;
        Object.values(rows).forEach(row => {
            if (row.length !== 2) return;
            const [a, b] = row;
            const diff = Math.abs(a.offsetHeight - b.offsetHeight);
            if (diff < 110) return;
            const short = a.offsetHeight < b.offsetHeight ? a : b;
            const h = Math.min(diff - 44, 190);
            const daisies = document.querySelector(".lg-daisies");
            let el;
            if (k++ % 2 === 1 && daisies) {
                el = daisies.cloneNode(true);
                el.setAttribute("class", "gap-deco daisies");
            } else {
                el = document.createElement("img");
                el.src = "../pics/goose.gif";
                el.alt = "";
                el.className = "gap-deco goose";
            }
            el.setAttribute("aria-hidden", "true");
            el.style.setProperty("--h", h + "px");
            short.appendChild(el);
        });
    }
    fillGaps();
    window.addEventListener("load", fillGaps);
    let gapT;
    window.addEventListener("resize", () => { clearTimeout(gapT); gapT = setTimeout(fillGaps, 150); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fillGaps);

})();
