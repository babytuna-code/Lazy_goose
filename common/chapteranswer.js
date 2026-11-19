// =====================================================
// chapteranswer.js — หน้าเฉลยของเกมท้ายบทแต่ละบท (5 ข้อ)
// อ่านโจทย์ที่ผู้เรียนได้ทำจริงจาก localStorage "<บท>Review" (บันทึกโดย progress.js ตอนส่งคำตอบ)
// แสดง: โจทย์ / คำตอบของผู้เรียน / วิธีทำ / คำตอบที่ถูก  ใช้หน้าตาเดียวกับเฉลยแบบทดสอบรวมบท
// =====================================================
(function () {
    const ch = document.body.dataset.chapter;
    const list = document.getElementById("answerList");
    const label = document.getElementById("setLabel");
    const NAMES = { ratio: "อัตราส่วน", prop: "สัดส่วน", percent: "ร้อยละ" };
    if (label) label.textContent = "บท" + (NAMES[ch] || "");

    function read(key) {
        try { return JSON.parse(localStorage.getItem(key) || "{}") || {}; } catch (error) { return {}; }
    }
    const results = read(ch + "Results");
    const review = read(ch + "Review");

    function esc(text) {
        const d = document.createElement("div"); d.textContent = String(text == null ? "" : text); return d.innerHTML;
    }
    // {ตัวเศษ|ตัวส่วน} → เศษส่วน
    function rich(text) {
        return esc(text).replace(/\{([^|{}]+)\|([^{}]+)\}/g, '<span class="frac"><span>$1</span><span>$2</span></span>');
    }
    const ratio = text => String(text == null ? "" : text).replace(/\s*:\s*/g, " : ");

    let html = "";
    for (let no = 1; no <= 5; no++) {
        const answered = results[no] === true || results[no] === false;
        const r = answered ? review[no] : null;
        const isRight = results[no] === true;
        const badge = !answered ? '<span class="badge none">ยังไม่ได้ทำ</span>'
            : (isRight ? '<span class="badge right">1/1</span>' : '<span class="badge wrong">0/1</span>');
        let inner;
        if (!answered) {
            inner = '<p class="sol-question">ยังไม่ได้ทำข้อนี้ เฉลยจะแสดงเมื่อส่งคำตอบแล้ว</p>';
        } else if (!r) {
            inner = '<p class="sol-question">ไม่พบข้อมูลโจทย์ของข้อนี้ในเครื่องนี้ (อาจทำไว้ก่อนอัปเดตเว็บ) ลองทำแบบทดสอบท้ายบทอีกครั้งแล้วกลับมาดูเฉลยได้</p>';
        } else {
            // วิธีทำ: ใช้ฉบับล่าสุดจาก chapter-solutions.js (จับคู่ด้วยข้อความโจทย์) ถ้าไม่พบจึงใช้ที่บันทึกไว้ตอนทำ
            const latest = ((window.LG_CHAPTER_SOL || {})[ch] || {})[(r.q || []).join("\n")];
            const steps = [].concat(latest || r.expl || []).filter(Boolean).map(line => `<li>${rich(line)}</li>`).join("");
            inner = r.q.map(t => `<p class="sol-question">${esc(t)}</p>`).join("") +
                `<p class="sol-your">คำตอบของคุณ: <b>${esc(ratio(r.picked) || "-")}</b></p>` +
                (steps ? `<p class="sol-label">วิธีทำ</p><ol class="sol-steps">${steps}</ol>` : "") +
                `<p class="sol-answer">ตอบ&nbsp; ${esc(ratio(r.answer))}</p>`;
        }
        html += `
            <article class="sol-card">
                <header class="sol-head">
                    <span class="sol-no ${!answered ? "" : (isRight ? "right" : "wrong")}">ข้อ ${no}</span>
                    ${badge}
                </header>
                ${inner}
            </article>`;
    }
    list.innerHTML = html;
})();
