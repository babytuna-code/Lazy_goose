/* =====================================================
   stage.js — จัดหน้าเกมท้ายบท (ด่าน 1-5) ใหม่ทั้งหน้า
   ซ้าย: โจทย์ → ตัวเลือก → ปุ่มส่งคำตอบ/ถัดไป   ขวา: ภาพประกอบสถานการณ์ (ถ้ามี)
   จอแคบ/แนวตั้ง: เรียงลงมาเป็นคอลัมน์เดียว ภาพอยู่ใต้โจทย์
   ขยายตัวอักษรโจทย์และตัวเลือกให้พอดีกับพื้นที่ของแต่ละจอ
   (ต้องโหลดหลังไฟล์เกมของด่าน และก่อน gamebuttons.js)
===================================================== */
(function () {
    const submit = document.getElementById("submitButton");
    const next = document.getElementById("nextButton");
    const q = document.querySelector(".ask-container") || document.querySelector(".ask-btn, .ask-btn1");
    const area = document.querySelector(".ratio-area, .balloon-area, .basket-area");
    if (!submit || !q || !area || !document.querySelector(".progress-container")) return;

    window.__stage = true;
    const root = document.documentElement;
    root.classList.add("stage-on");

    const el = (cls) => { const d = document.createElement("div"); d.className = cls; return d; };
    const stage = el("stage"), main = el("stage-main"), side = el("stage-side");
    const wrap = el("stage-area"), actions = el("stage-actions");
    wrap.appendChild(area);
    actions.appendChild(submit);
    if (next) actions.appendChild(next);
    main.append(q, wrap, actions);
    stage.append(main, side);
    document.body.appendChild(stage);

    const kind = area.classList.contains("ratio-area") ? "ratio" : area.classList.contains("balloon-area") ? "balloon" : "basket";
    stage.classList.add("kind-" + kind);

    // ภาพประกอบตามสถานการณ์ของโจทย์
    const text = q.textContent.replace(/\s+/g, " ").trim();
    if (text.length > 100) stage.classList.add("q-long");
    let illus = null;
    const art = null;   // ไม่ใช้ภาพประกอบสถานการณ์แล้ว (เอาออกตามที่ขอ) — โจทย์/ตัวเลือกจัดกึ่งกลางจอ
    if (art) {
        illus = el("q-illus");
        illus.innerHTML = art;
        stage.classList.add("has-illus");
    }

    function layout() {
        const vw = root.clientWidth, vh = window.innerHeight;
        const tops = [...document.querySelectorAll(".pb-track, .pb-goose, .progress-info")]
            .map(e => e.getBoundingClientRect()).filter(r => r.width).map(r => r.bottom);
        const top = (tops.length ? Math.max(...tops) : 90) + Math.round(Math.min(30, vh * 0.03));   // โจทย์อยู่ชิดใต้ห่าน/แถบความคืบหน้า
        const wave = document.querySelector(".lg-wave.bottom");
        const waveTop = wave ? wave.getBoundingClientRect().top : vh - 60;
        stage.style.top = top + "px";
        stage.style.bottom = Math.max(8, vh - waveTop + 2) + "px";

        const wide = !!illus && vw >= 700 && vw > vh * 1.05;   // จอแนวนอน (รวมหน้าต่างโน้ตบุ๊กขนาดเล็ก): ภาพซ้าย โจทย์ขวา
        stage.classList.toggle("wide", wide);
        if (illus) {
            if (wide) side.appendChild(illus);
            else main.insertBefore(illus, wrap);
        }

        // แบ่งพื้นที่: โจทย์ต้องอ่านง่ายก่อน → ย่อภาพประกอบ → ย่อตัวเลือก → จึงค่อยลดตัวอักษรโจทย์
        const narrowIllus = !!illus && !wide;
        const big = vw >= 600;
        const ihMax = narrowIllus ? Math.min(vh * (big ? 0.36 : 0.24), big ? 460 : 220) : 0;
        const ihMin = big ? 150 : 92;
        const cap = kind === "ratio" ? (big && !wide ? 1.6 : 1.25) : 3;   // ช่องตัวเลข+ลูกศร ไม่ใหญ่เกินไป
        let scale = 1;
        area.style.setProperty("transform", "none", "important");
        wrap.style.width = wrap.style.height = "";
        const aw = area.offsetWidth, ah = area.offsetHeight;
        const setIllus = h => { if (narrowIllus) { illus.style.setProperty("--ih", h + "px"); return illus.offsetHeight; } return 0; };
        if (illus) illus.style.removeProperty("--ih");

        for (const fit of [1, 0.94, 0.88, 0.82, 0.76, 0.7]) {
            stage.style.setProperty("--fit", fit.toFixed(2));
            const gap = parseFloat(getComputedStyle(main).rowGap) || 0;
            const colW = main.clientWidth;
            // ลูกบอล/ลูกโป่ง: จำกัดความกว้างไม่ให้ใหญ่เกินไป ทั้งบนคอมและโทรศัพท์
            const maxW = kind === "ratio" ? colW : Math.min(colW * 0.85, kind === "basket" ? (big ? 300 : 250) : (big ? 330 : 270));
            const want = Math.min(cap, maxW / aw);
            let room = stage.clientHeight - q.offsetHeight - actions.offsetHeight - gap * 2 - (narrowIllus ? gap : 0);
            if (!narrowIllus) {
                if (ah * want <= room) { scale = want; break; }
                if (ah * want * 0.8 <= room || fit <= 0.7) { scale = room / ah; break; }
                continue;
            }
            let ih = setIllus(ihMax);
            if (ah * want + ih <= room) { scale = want; break; }
            const shrink = Math.max(ihMin, room - ah * want);
            ih = setIllus(shrink);
            if (ah * want + ih <= room) { scale = want; break; }
            if (ah * want * 0.75 + ih <= room || fit <= 0.7) { scale = (room - ih) / ah; break; }
        }
        scale = Math.max(0.5, Math.min(cap, scale));
        wrap.style.width = aw * scale + "px";
        wrap.style.height = ah * scale + "px";
        area.style.setProperty("transform", `scale(${scale.toFixed(4)})`, "important");
    }

    layout();
    window.addEventListener("resize", layout);
    window.addEventListener("load", layout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    setTimeout(layout, 350);
    // ปุ่มถัดไปโผล่/ซ่อน → จัดใหม่
    if (next) new MutationObserver(layout).observe(next, { attributes: true, attributeFilter: ["hidden"] });
    window.__stageLayout = layout;
})();
