
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 2
    // =======================================

    // ด่านที่ 2 — สัดส่วนตรง: ราคาสินค้า
    const questionBank = [
        {
            question: "ส้ม 3 กิโลกรัม ราคา 90 บาท ถ้าซื้อส้ม 5 กิโลกรัม ต้องจ่ายเงินกี่บาท",
            choices: ["150", "120", "54"],
            correctAnswer: "150",
            explanation: [
                "ให้ต้องจ่ายเงิน a บาท",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {3|90} = {5|a}",
                "คูณไขว้ จะได้ 3 × a = 90 × 5",
                "3 × a = 450",
                "a = {450|3} = 150",
                "ดังนั้น ต้องจ่ายเงิน 150 บาท"
            ]
        },
        {
            question: "ดินสอ 4 แท่ง ราคา 28 บาท ถ้าซื้อดินสอ 10 แท่ง ต้องจ่ายเงินกี่บาท",
            choices: ["70", "56", "112"],
            correctAnswer: "70",
            explanation: [
                "ให้ต้องจ่ายเงิน a บาท",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {4|28} = {10|a}",
                "คูณไขว้ จะได้ 4 × a = 28 × 10",
                "4 × a = 280",
                "a = {280|4} = 70",
                "ดังนั้น ต้องจ่ายเงิน 70 บาท"
            ]
        },
        {
            question: "นม 6 กล่อง ราคา 72 บาท ถ้ามีเงิน 120 บาท จะซื้อนมได้กี่กล่อง",
            choices: ["10", "12", "8"],
            correctAnswer: "10",
            explanation: [
                "ให้ซื้อนมได้ a กล่อง",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {6|72} = {a|120}",
                "คูณไขว้ จะได้ 72 × a = 6 × 120",
                "72 × a = 720",
                "a = {720|72} = 10",
                "ดังนั้น ซื้อนมได้ 10 กล่อง"
            ]
        },
        {
            question: "ไข่ไก่ 10 ฟอง ราคา 45 บาท ถ้าซื้อไข่ไก่ 30 ฟอง ต้องจ่ายเงินกี่บาท",
            choices: ["135", "90", "150"],
            correctAnswer: "135",
            explanation: [
                "ให้ต้องจ่ายเงิน a บาท",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {10|45} = {30|a}",
                "คูณไขว้ จะได้ 10 × a = 45 × 30",
                "10 × a = 1,350",
                "a = {1,350|10} = 135",
                "ดังนั้น ต้องจ่ายเงิน 135 บาท"
            ]
        },
        {
            question: "สมุด 5 เล่ม ราคา 60 บาท ถ้ามีเงิน 96 บาท จะซื้อสมุดได้กี่เล่ม",
            choices: ["8", "9", "12"],
            correctAnswer: "8",
            explanation: [
                "ให้ซื้อสมุดได้ a เล่ม",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {5|60} = {a|96}",
                "คูณไขว้ จะได้ 60 × a = 5 × 96",
                "60 × a = 480",
                "a = {480|60} = 8",
                "ดังนั้น ซื้อสมุดได้ 8 เล่ม"
            ]
        }
    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 2
    // =======================================

    const body = document.body;

    const currentStage = Number(body.dataset.stage);
    const nextPage = body.dataset.next || "./propplay3.html";
    const backPage = body.dataset.back || "./propplay1.html";

    const QUESTION_KEY = "propStage2Question";

    if (currentStage !== 2) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 2 เท่านั้น");
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

        // บันทึกผลด่านที่ 2
        results[2] = isCorrect;

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

    console.log("Propplay2 พร้อมใช้งาน");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion);
    console.log("ตัวเลือกลูกบอล:", currentChoices);

})();
