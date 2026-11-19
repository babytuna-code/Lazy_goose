// =====================================================
// lesson.js — สคริปต์กลางของหน้าเนื้อหาและหน้าแบบทดสอบรวมบท
//  - ปุ่มย้อนกลับ / ถัดไป (อ่านปลายทางจาก data-prev, data-next ของ <body>)
//  (ปุ่มตั้งค่า/คู่มือ อยู่ใน settings.js)
//  - Flashcard คลิกเพื่อพลิก
//  - ปุ่ม "แบบทดสอบท้ายบท" ล้างคะแนนรอบก่อนแล้วเริ่มเกม
// =====================================================

(function () {

    const body = document.body;

    function goTo(url) {
        if (url) {
            window.location.href = url;
        }
    }

    // ---------- 1. ปุ่มย้อนกลับ / ถัดไป ----------

    const backBtn = document.getElementById("backBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (backBtn) {
        backBtn.addEventListener("click", () => goTo(body.dataset.prev));
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => goTo(body.dataset.next));
    }


    // ---------- 4. Flashcard ----------

    document.querySelectorAll(".flashcard").forEach(card => {
        if (card.closest("[data-deck]")) return;   // การ์ดในกอง จัดการแยกด้านล่าง
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
            card.setAttribute("aria-pressed", String(card.classList.contains("flipped")));
        });
    });


    // ---------- 4b. กองแฟลชการ์ด: พลิกดูคำตอบก่อน แล้วปัด/กดถัดไปเพื่อดูใบต่อไป ----------

    document.querySelectorAll("[data-deck]").forEach(deck => {
        const cards = [...deck.querySelectorAll(".fc-stack .flashcard")];
        const count = deck.querySelector(".fc-count");
        const next = deck.querySelector(".fc-next");
        const hint = deck.querySelector(".fc-hint");
        const hintText = hint ? hint.textContent : "";
        let i = 0;

        function layout() {
            cards.forEach((c, k) => {
                const pos = k - i;
                c.classList.remove("dragging");
                c.style.transform = "";
                if (pos < 0) return;                       // ใบที่ปัดออกไปแล้ว
                c.classList.remove("gone-l", "gone-r");
                c.dataset.pos = pos <= 2 ? String(pos) : "hide";
                c.tabIndex = pos === 0 ? 0 : -1;
                c.setAttribute("aria-hidden", pos === 0 ? "false" : "true");
            });
            const done = i >= cards.length;
            count.textContent = done ? `${cards.length} / ${cards.length}` : `${i + 1} / ${cards.length}`;
            next.textContent = done ? "↻ ดูอีกครั้ง" : "ถัดไป ›";
            next.disabled = !done && !cards[i].classList.contains("flipped");
        }

        function warn() {
            const c = cards[i];
            c.classList.remove("nudge");
            void c.offsetWidth;
            c.classList.add("nudge");
            if (hint) {
                hint.textContent = "( พลิกดูคำตอบก่อนนะ )";
                hint.classList.add("warn");
                clearTimeout(warn.t);
                warn.t = setTimeout(() => { hint.textContent = hintText; hint.classList.remove("warn"); }, 1600);
            }
        }

        function fling(dir) {
            const c = cards[i];
            if (!c) return;
            if (!c.classList.contains("flipped")) { warn(); return; }
            c.style.transform = "";
            c.classList.add(dir < 0 ? "gone-l" : "gone-r");
            c.dataset.pos = "out";
            i++;
            layout();
        }

        function restart() {
            cards.forEach(c => {
                c.classList.remove("flipped", "gone-l", "gone-r");
                c.setAttribute("aria-pressed", "false");
            });
            i = 0;
            layout();
        }

        next.addEventListener("click", () => (i >= cards.length ? restart() : fling(1)));

        cards.forEach(c => {
            let x0 = null, y0 = 0, dx = 0, moved = false;

            c.addEventListener("click", () => {
                if (moved) { moved = false; return; }      // เพิ่งลาก ไม่นับเป็นคลิก
                if (cards[i] !== c) return;
                c.classList.toggle("flipped");
                c.setAttribute("aria-pressed", String(c.classList.contains("flipped")));
                layout();
            });

            c.addEventListener("pointerdown", e => {
                if (cards[i] !== c) return;
                x0 = e.clientX; y0 = e.clientY; dx = 0; moved = false;
            });

            c.addEventListener("pointermove", e => {
                if (x0 === null) return;
                dx = e.clientX - x0;
                if (!moved && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(e.clientY - y0)) {
                    moved = true;
                    try { c.setPointerCapture(e.pointerId); } catch (_) {}
                    c.classList.add("dragging");
                }
                if (moved) {
                    const d = c.classList.contains("flipped") ? dx : dx * 0.25;   // ยังไม่พลิก ลากได้นิดเดียว
                    c.style.transform = `translateX(${d}px) rotate(${d / 20}deg)`;
                }
            });

            const up = () => {
                if (x0 === null) return;
                x0 = null;
                if (!moved) return;
                c.classList.remove("dragging");
                if (Math.abs(dx) > 70 && c.classList.contains("flipped")) {
                    fling(dx < 0 ? -1 : 1);
                } else {
                    c.style.transform = "";
                    if (Math.abs(dx) > 70) warn();
                }
            };
            c.addEventListener("pointerup", up);
            c.addEventListener("pointercancel", up);
        });

        deck.addEventListener("keydown", e => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                if (i < cards.length) fling(e.key === "ArrowLeft" ? -1 : 1);
            }
        });

        layout();
    });


    // ---------- 5. ปุ่มเริ่มแบบทดสอบท้ายบท ----------
    // <button data-start-quiz="ratioplay1.html" data-prefix="ratio">

    document.querySelectorAll("[data-start-quiz]").forEach(button => {

        button.addEventListener("click", () => {

            const prefix = button.dataset.prefix;

            if (prefix) {
                for (let stage = 1; stage <= 5; stage++) {
                    sessionStorage.removeItem(`${prefix}Stage${stage}Question`);
                }
                localStorage.removeItem(`${prefix}Results`);
                localStorage.removeItem(`${prefix}Score`);
            }

            goTo(button.dataset.startQuiz);
        });
    });


})();
