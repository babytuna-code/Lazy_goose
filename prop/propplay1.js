
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 1
    // =======================================

    // ด่านที่ 1 — หาค่าตัวแปรในสัดส่วน
    const questionBank = [
        {
            question: "จงหาค่าของ a จากสัดส่วน a : 12 = 3 : 4",
            choices: ["9", "16", "8"],
            correctAnswer: "9",
            explanation: [
                "จาก a : 12 = 3 : 4 เขียนเป็นสัดส่วนได้ {a|12} = {3|4}",
                "คูณไขว้ จะได้ a × 4 = 12 × 3",
                "a × 4 = 36",
                "a = {36|4} = 9",
                "ดังนั้น a = 9"
            ]
        },
        {
            question: "จงหาค่าของ b จากสัดส่วน 5 : 8 = 15 : b",
            choices: ["24", "18", "40"],
            correctAnswer: "24",
            explanation: [
                "จาก 5 : 8 = 15 : b เขียนเป็นสัดส่วนได้ {5|8} = {15|b}",
                "คูณไขว้ จะได้ 5 × b = 8 × 15",
                "5 × b = 120",
                "b = {120|5} = 24",
                "ดังนั้น b = 24"
            ]
        },
        {
            question: "จงหาค่าของ m จากสัดส่วน 2 : m = 6 : 21",
            choices: ["7", "9", "63"],
            correctAnswer: "7",
            explanation: [
                "จาก 2 : m = 6 : 21 เขียนเป็นสัดส่วนได้ {2|m} = {6|21}",
                "คูณไขว้ จะได้ m × 6 = 2 × 21",
                "m × 6 = 42",
                "m = {42|6} = 7",
                "ดังนั้น m = 7"
            ]
        },
        {
            question: "จงหาค่าของ n จากสัดส่วน 9 : 4 = n : 20",
            choices: ["45", "36", "25"],
            correctAnswer: "45",
            explanation: [
                "จาก 9 : 4 = n : 20 เขียนเป็นสัดส่วนได้ {9|4} = {n|20}",
                "คูณไขว้ จะได้ 4 × n = 9 × 20",
                "4 × n = 180",
                "n = {180|4} = 45",
                "ดังนั้น n = 45"
            ]
        },
        {
            question: "จงหาค่าของ k จากสัดส่วน k : 6 = 10 : 15",
            choices: ["4", "9", "25"],
            correctAnswer: "4",
            explanation: [
                "จาก k : 6 = 10 : 15 เขียนเป็นสัดส่วนได้ {k|6} = {10|15}",
                "คูณไขว้ จะได้ k × 15 = 6 × 10",
                "k × 15 = 60",
                "k = {60|15} = 4",
                "ดังนั้น k = 4"
            ]
        }
    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 1
    // =======================================

    const body = document.body;

    const currentStage = Number(body.dataset.stage);
    const nextPage = body.dataset.next || "./propplay2.html";
    const backPage = body.dataset.back || "./propans.html";

    const QUESTION_KEY = "propStage1Question";

    if (currentStage !== 1) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 1 เท่านั้น");
        return;
    }


    // =======================================
    // 3. เชื่อม Element กับ HTML
    // =======================================

    const questionText = document.getElementById("questionText");

    const balls = [
        ...document.querySelectorAll(".ball-option")
    ];

    const submitButton = document.getElementById("submitButton");
    const nextButton = document.getElementById("nextButton");

    const feedback = document.getElementById("feedback");
    const feedbackTitle = document.getElementById("feedbackTitle");
    const feedbackMessage = document.getElementById("feedbackMessage");
    const feedbackDone = document.getElementById("feedbackDone");

    const circles = document.querySelectorAll(".step-circle");
    const lines = document.querySelectorAll(".progress-line");
    const stageText = document.getElementById("stageText");

    if (
        !questionText ||
        balls.length !== 3 ||
        !submitButton ||
        !nextButton ||
        !feedback ||
        !feedbackTitle ||
        !feedbackMessage ||
        !feedbackDone
    ) {
        console.error("ไม่พบ Element ที่จำเป็นใน HTML");
        return;
    }


    // =======================================
    // 4. ฟังก์ชันสุ่มตัวเลือก
    // =======================================

    function shuffleArray(array) {
        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] =
                [shuffled[j], shuffled[i]];
        }

        return shuffled;
    }


    // =======================================
    // 5. สุ่มโจทย์ 1 ข้อจาก 5 ข้อ
    // =======================================

    let savedQuestion = null;

    try {
        savedQuestion = JSON.parse(
            sessionStorage.getItem(QUESTION_KEY)
        );
    } catch (error) {
        savedQuestion = null;
    }

    function isValidSavedQuestion(data) {
        return (
            data &&
            Number.isInteger(data.index) &&
            data.index >= 0 &&
            data.index < questionBank.length &&
            Array.isArray(data.choices) &&
            data.choices.length === 3 &&
            new Set(data.choices).size === 3 &&
            data.choices.every(choice =>
                questionBank[data.index].choices.includes(choice)
            )
        );
    }

    // ถ้ายังไม่มีโจทย์ ให้สุ่มใหม่
    if (!isValidSavedQuestion(savedQuestion)) {

        const randomIndex = Math.floor(
            Math.random() * questionBank.length
        );

        const randomChoices = shuffleArray(
            questionBank[randomIndex].choices
        );

        savedQuestion = {
            index: randomIndex,
            choices: randomChoices
        };

        sessionStorage.setItem(
            QUESTION_KEY,
            JSON.stringify(savedQuestion)
        );
    }

    const currentQuestion =
        questionBank[savedQuestion.index];
    window.__lgQuestion = currentQuestion;   // ให้ progress.js บันทึกโจทย์ข้อนี้ไว้สำหรับหน้าเฉลย

    const currentChoices =
        savedQuestion.choices;


    // =======================================
    // 6. แสดงโจทย์และลูกบอลในตะกร้า
    // =======================================

    questionText.textContent = currentQuestion.question;

    balls.forEach((ball, index) => {

        const choice = currentChoices[index];

        ball.dataset.answer = choice;

        const label = ball.querySelector("span");

        if (label) {
            label.textContent = choice;
        }

        ball.setAttribute(
            "aria-label",
            `ลูกบอลตัวเลือกที่ ${index + 1}: ${choice}`
        );

        ball.setAttribute("aria-pressed", "false");

        ball.classList.remove("selected", "pop");

        ball.disabled = false;
    });


    // =======================================
    // 7. Progress Bar
    // =======================================

    circles.forEach((circle, index) => {

        const stage = index + 1;

        circle.classList.remove("active", "completed");

        if (stage < currentStage) {
            circle.classList.add("completed");
            circle.textContent = "✓";
        }

        else if (stage === currentStage) {
            circle.classList.add("active");
            circle.textContent = stage;
        }
    });

    lines.forEach((line, index) => {
        line.classList.toggle(
            "completed",
            index + 1 < currentStage
        );
    });

    if (stageText) {
        stageText.textContent = `ด่าน ${currentStage} / 5`;
    }


    // =======================================
    // 8. สถานะเริ่มต้น
    // =======================================

    let selectedAnswer = null;
    let answered = false;

    feedback.hidden = true;
    nextButton.hidden = true;

    submitButton.disabled = false;


    // =======================================
    // 9. เลือกลูกบอลในตะกร้า
    // =======================================

    balls.forEach(ball => {

        ball.addEventListener("click", () => {

            if (answered) return;

            // ยกเลิกการเลือกลูกบอลเดิม
            balls.forEach(item => {
                item.classList.remove("selected");
                item.setAttribute("aria-pressed", "false");
            });

            // เลือกลูกบอลใหม่
            ball.classList.add("selected");
            ball.setAttribute("aria-pressed", "true");

            selectedAnswer = ball.dataset.answer;
        });
    });


    // =======================================
    // 10. บันทึกคะแนน
    // =======================================

    function saveAnswer(isCorrect) {

        let results = {};

        try {
            results = JSON.parse(
                localStorage.getItem("propResults") || "{}"
            );

            if (
                !results ||
                typeof results !== "object" ||
                Array.isArray(results)
            ) {
                results = {};
            }

        } catch (error) {
            results = {};
        }

        // บันทึกผลด่านที่ 1
        results[1] = isCorrect;

        localStorage.setItem(
            "propResults",
            JSON.stringify(results)
        );

        // คำนวณคะแนนรวม
        const score = Object.values(results).filter(
            result => result === true
        ).length;

        localStorage.setItem("propScore", String(score));
    }


    // =======================================
    // 11. แสดง Popup เฉลย
    // =======================================

    function showFeedback(isCorrect) {

        if (isCorrect) {
            feedbackTitle.textContent = "เก่งมาก! ตอบถูกแล้ว ";
            feedbackTitle.className = "feedback-title correct";
        } else {
            feedbackTitle.textContent = "ยังไม่ถูกนะ ";
            feedbackTitle.className = "feedback-title wrong";
        }

        // แสดงคำตอบ + วิธีทำเป็นขั้น ๆ (แปลง {a|b} เป็นเศษส่วน) แบบเดียวกับเฉลยแบบทดสอบรวมบท
        const toFraction = text => text.replace(/\{([^|{}]+)\|([^{}]+)\}/g,
            '<span class="frac"><span>$1</span><span>$2</span></span>');

        feedbackMessage.innerHTML =
            `<span class="sol-head">` + `คุณเลือก ${selectedAnswer} ` +
            `เฉลยคือ ${currentQuestion.correctAnswer} ` + `</span>` +
            `<span class="sol-box"><span class="sol-label">วิธีทำ</span>` +
            currentQuestion.explanation.map(toFraction).join("<br>") +
            `</span>`;

        feedback.hidden = false;

        feedbackDone.focus();
    }


    // =======================================
    // 12. ปุ่มส่งคำตอบ
    // =======================================

    submitButton.addEventListener("click", () => {

        if (answered) return;

        // ตรวจสอบว่ามีการเลือกลูกบอลหรือยัง
        if (selectedAnswer === null) {

            feedbackTitle.textContent = "เลือกลูกบอลก่อนนะ!";
            feedbackTitle.className = "feedback-title wrong";

            feedbackMessage.textContent =
                "กรุณาเลือกลูกบอล 1 ลูกก่อนกดส่งคำตอบ";

            feedback.hidden = false;

            nextButton.hidden = true;

            return;
        }

        answered = true;

        const isCorrect =
            selectedAnswer === currentQuestion.correctAnswer;

        // บันทึกคะแนน
        saveAnswer(isCorrect);

        // ปิดการเลือกลูกบอล
        balls.forEach(ball => {
            ball.disabled = true;
        });

        // ปิดปุ่มส่งคำตอบ
        submitButton.disabled = true;

        // แสดง Popup
        showFeedback(isCorrect);
    });


    // =======================================
    // 13. ปิด Popup เมื่อกดตกลง
    // =======================================

    feedbackDone.addEventListener("click", () => {

        feedback.hidden = true;

        // แสดงปุ่มถัดไปหลังตอบคำถามแล้วเท่านั้น
        if (answered) {
            nextButton.hidden = false;
        }
    });


    // กด Escape เพื่อปิด Popup
    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            !feedback.hidden
        ) {

            feedback.hidden = true;

            if (answered) {
                nextButton.hidden = false;
            }
        }
    });


    // =======================================
    // 14. ปุ่มถัดไป
    // =======================================

    nextButton.addEventListener("click", () => {

        if (!answered) return;

        window.location.href = nextPage;
    });


    // =======================================
    // 15. เริ่มเกม
    // =======================================

    console.log("Propplay3 พร้อมใช้งาน");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion);
    console.log("ตัวเลือกลูกบอล:", currentChoices);

})();
