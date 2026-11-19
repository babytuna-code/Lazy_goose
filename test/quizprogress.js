// =====================================================
// quizprogress.js — แถบข้อ 1-10 ของแบบทดสอบรวมบท (แบบเดียวกับแถบด่านของเกมท้ายบท)
//  - ถูก = เขียว ✓ / ผิด = แดง ✗ / ยังไม่ทำ = ขาว (ตัวเลข) / ข้อปัจจุบัน = ขอบเหลือง
//  - กดวงกลมเพื่อไปข้อนั้น ทำข้อไหนก่อนก็ได้
//  อ่านผลจาก localStorage "testResults" (quiz.js เป็นคนบันทึก)
// =====================================================
(function () {
    const current = Number(document.body.dataset.q);
    if (!current) return;
    const TOTAL = 10;
    const KEY = "testResults";

    const bar = document.createElement("nav");
    bar.className = "qp-bar";
    bar.setAttribute("aria-label", "ข้อสอบ 10 ข้อ");
    const circles = [];
    const lines = [];

    const edge = cls => { const e = document.createElement("span"); e.className = "qp-line qp-edge " + cls; return e; };
    bar.appendChild(edge("done"));
    for (let i = 1; i <= TOTAL; i++) {
        const a = document.createElement("a");
        a.className = "qp-dot" + (i === current ? " active" : "");
        a.href = `./quiz${i}.html`;
        a.setAttribute("aria-label", `ไปข้อ ${i}`);
        if (i === current) a.setAttribute("aria-current", "step");
        bar.appendChild(a);
        circles.push(a);
        if (i < TOTAL) {
            const l = document.createElement("span");
            l.className = "qp-line";
            bar.appendChild(l);
            lines.push(l);
        }
    }
    const tail = edge("");
    bar.appendChild(tail);
    document.body.appendChild(bar);
    document.body.classList.add("has-qp");

    function read() {
        try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
        catch (e) { return {}; }
    }

    function paint() {
        const res = read();
        circles.forEach((c, i) => {
            const r = res[i + 1];
            c.classList.toggle("ok", r === true);
            c.classList.toggle("bad", r === false);
            c.textContent = r === true ? "✓" : r === false ? "✗" : String(i + 1);
            if (lines[i]) lines[i].classList.toggle("done", r === true || r === false);
        });
        const last = res[TOTAL];
        tail.classList.toggle("done", last === true || last === false);
    }

    const origSet = Storage.prototype.setItem;
    Storage.prototype.setItem = function (k) {
        origSet.apply(this, arguments);
        if (k === KEY) setTimeout(paint, 0);
    };
    paint();
    window.addEventListener("pageshow", paint);
})();
