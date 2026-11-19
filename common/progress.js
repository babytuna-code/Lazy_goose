/* =====================================================
   progress.js — จัดแถบด่าน 1-5 ใหม่
   ย้ายวงกลมและเส้นไปไว้ในแถบที่กว้างเต็มจอ เพิ่มเส้นหัว-ท้าย
   และวางรูปห่านไว้ใต้วงกลมของด่านปัจจุบัน
===================================================== */
(function () {
    const container = document.querySelector(".progress-container");
    const steps = [...document.querySelectorAll(".progress-step")];
    if (!container || !steps.length) return;

    const lines = [...document.querySelectorAll(".progress-line")];
    const track = document.createElement("div");
    track.className = "pb-track";

    const lead = document.createElement("div");
    lead.className = "pb-edge completed";
    const tail = document.createElement("div");
    tail.className = "pb-edge";

    track.appendChild(lead);
    steps.forEach((step, i) => {
        track.appendChild(step);
        if (lines[i]) track.appendChild(lines[i]);
    });
    track.appendChild(tail);

    const info = container.querySelector(".progress-info");
    if (info && info.nextSibling) container.insertBefore(track, info.nextSibling);
    else container.insertBefore(track, container.firstChild);

    // แถบกว้างเต็มจอ (ขอบซ้ายถึงขอบขวา)
    // วงกลมยังอยู่ในช่วงความกว้างเดิมของแถบ ส่วนเส้นหัว-ท้ายยืดออกไปถึงขอบจอ
    function stretch() {
        track.style.width = "";
        track.style.marginLeft = "0px";
        lead.style.flexBasis = tail.style.flexBasis = "0px";
        const c = container.getBoundingClientRect();
        const w = document.documentElement.clientWidth;
        const side = Math.max(8, c.left);
        track.style.width = w + "px";
        track.style.marginLeft = (-c.left) + "px";
        lead.style.flexBasis = side + "px";
        tail.style.flexBasis = Math.max(8, w - c.right) + "px";
    }

    // หน้าคะแนนมีรูปห่านใหญ่อยู่แล้ว จึงวางห่านเฉพาะหน้าเกม
    const showGoose = !/score\.html/i.test(location.pathname);
    const goose = document.createElement("img");
    goose.className = "pb-goose";
    goose.src = "../pics/goose.gif";
    goose.alt = "";

    function update() {
        const circles = steps.map(s => s.querySelector(".step-circle"));
        const last = circles[circles.length - 1];
        tail.classList.toggle("completed", !!last && ["completed", "pb-correct", "pb-wrong"].some(c => last.classList.contains(c)));
        if (!showGoose) return;
        let target = circles.findIndex(c => c && c.classList.contains("active"));
        if (target < 0) {
            const done = circles.findIndex(c => c && !c.classList.contains("pb-correct") && !c.classList.contains("pb-wrong") && !c.classList.contains("completed"));
            target = done < 0 ? circles.length - 1 : done;
        }
        if (goose.parentElement !== steps[target]) steps[target].appendChild(goose);
        // ด่านสุดท้าย: ขยับห่านไปทางซ้ายเล็กน้อย ไม่ให้ซ้อนกับปุ่มฟันเฟือง
        goose.classList.toggle("at-end", target === circles.length - 1);
    }

    // ---------- สีตามผลคำตอบ + กดวงกลมเพื่อไปด่านนั้น (ทำข้อไหนก่อนก็ได้) ----------
    // ถูก = เขียว ✓ / ผิด = แดง ✗ / ยังไม่ทำ = ขาว (ตัวเลข)
    const m = location.pathname.match(/\/(ratio|prop|percent)(play\d|score)\.html$/i);
    const prefix = m ? m[1].toLowerCase() : null;

    function readResults() {
        try { return JSON.parse(localStorage.getItem(prefix + "Results") || "{}"); }
        catch (e) { return {}; }
    }

    function paint() {
        if (!prefix) return;
        const res = readResults();
        steps.forEach((step, i) => {
            const c = step.querySelector(".step-circle");
            if (!c) return;
            const r = res[i + 1];
            c.classList.remove("completed", "pb-correct", "pb-wrong");
            if (/score/i.test(m[2])) c.classList.remove("active");   // หน้าคะแนน: ไม่มีด่านปัจจุบัน
            if (r === true) { c.classList.add("pb-correct"); c.textContent = "✓"; }
            else if (r === false) { c.classList.add("pb-wrong"); c.textContent = "✗"; }
            else { c.textContent = String(i + 1); }
            if (lines[i]) lines[i].classList.toggle("completed", r === true || r === false);
        });
        lead.classList.add("completed");
        const lastRes = res[steps.length];
        tail.classList.toggle("completed", lastRes === true || lastRes === false);
    }

    // ---------- เก็บโจทย์ที่ทำ + คำตอบ + วิธีทำ ไว้ให้หน้าเฉลยของบท (<บท>answer.html) ----------
    function saveReview(resultsJSON) {
        const q = window.__lgQuestion;
        const stage = Number(document.body.dataset.stage);
        if (!q || !stage || !/play/i.test(m[2])) return;
        try {
            let res = {}; try { res = JSON.parse(resultsJSON) || {}; } catch (e) { res = {}; }
            if (res[stage] !== true && res[stage] !== false) return;
            const boxes = [...document.querySelectorAll("input.number-box")].map(i => i.value);
            const ball = document.querySelector(".balloon.selected, .balloon[aria-pressed='true']");
            const picked = boxes.length ? boxes.join(" : ") : (ball ? (ball.dataset.answer || ball.textContent.trim()) : "");
            const answer = q.answerText || q.correctAnswer || (Array.isArray(q.answer) ? q.answer.join(" : ") : q.answer) || "";
            const review = JSON.parse(localStorage.getItem(prefix + "Review") || "{}") || {};
            review[stage] = {
                q: [q.statement1, q.statement2, q.question].filter(Boolean),
                answer: String(answer), picked, expl: q.explanation || "", ok: res[stage] === true
            };
            Storage.prototype.setItem.__orig.call(localStorage, prefix + "Review", JSON.stringify(review));
        } catch (error) { /* บันทึกไม่ได้ก็ข้ามไป ไม่กระทบเกม */ }
    }

    // ---------- ด่านที่ส่งคำตอบไปแล้ว: กลับมาดูได้ แต่ตอบซ้ำไม่ได้ ----------
    function lockIfAnswered() {
        if (!prefix || !/play/i.test(m[2])) return;
        const stage = Number(document.body.dataset.stage);
        const r = readResults()[stage];
        if (r !== true && r !== false) return;
        document.body.classList.add("stage-locked");
        document.querySelectorAll(".ratio-area, .balloon-area, .basket-area").forEach(a => {
            a.setAttribute("inert", "");
            a.querySelectorAll("button, input").forEach(b => { b.disabled = true; });
        });
        const submit = document.getElementById("submitButton");
        if (submit) { submit.disabled = true; submit.textContent = r ? "ตอบข้อนี้แล้ว (ถูก)" : "ตอบข้อนี้แล้ว (ผิด)"; }
        const next = document.getElementById("nextButton");
        if (next) {
            next.hidden = false;
            next.addEventListener("click", () => { location.href = document.body.dataset.next || `./${prefix}score.html`; });
        }
    }

    // ---------- ปุ่มย้อนกลับ (เกมท้ายบท ด่าน 1-5) → กลับหน้าบท ----------
    if (prefix && /play/i.test(m[2]) && !document.querySelector(".back-button")) {
        const back = document.createElement("button");
        back.type = "button";
        back.className = "back-button lg-back";
        back.textContent = "ย้อนกลับ";
        back.addEventListener("click", () => { location.href = `./${prefix}ans.html`; });
        document.body.appendChild(back);
    }

    if (prefix) {
        lockIfAnswered();
        steps.forEach((step, i) => {
            const c = step.querySelector(".step-circle");
            if (!c) return;
            const go = () => { location.href = `./${prefix}play${i + 1}.html`; };
            c.classList.add("pb-link");
            c.setAttribute("role", "button");
            c.setAttribute("tabindex", "0");
            c.setAttribute("aria-label", `ไปด่านที่ ${i + 1}`);
            c.addEventListener("click", go);
            c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
        });
        // หน้าเกมเขียนผลลง localStorage หลังกดส่งคำตอบ → ทาสีใหม่
        const origSet = Storage.prototype.setItem;
        Storage.prototype.setItem = function (k, v) {
            origSet.apply(this, arguments);
            if (k === prefix + "Results") { setTimeout(paint, 0); saveReview(v); }
        };
        Storage.prototype.setItem.__orig = origSet;
        paint();
        document.addEventListener("DOMContentLoaded", paint);
        window.addEventListener("load", paint);
        window.addEventListener("pageshow", paint);
    }

    update();
    stretch();
    container.classList.add("pb-ready");
    new MutationObserver(update).observe(track, { subtree: true, attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", stretch);
    window.addEventListener("load", stretch);
})();
