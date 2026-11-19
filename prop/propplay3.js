
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 3
    // =======================================

    // ด่านที่ 3 — สัดส่วนตรง: สถานการณ์อื่น ๆ
    const questionBank = [
        {
            question: "ทำขนมใช้แป้ง 2 ถ้วย ต่อน้ำตาล 3 ถ้วย ถ้าใช้แป้ง 8 ถ้วย ต้องใช้น้ำตาลกี่ถ้วย",
            choices: ["12", "9", "16"],
            correctAnswer: "12",
            explanation: [
                "ให้ต้องใช้น้ำตาล a ถ้วย",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {2|3} = {8|a}",
                "คูณไขว้ จะได้ 2 × a = 3 × 8",
                "2 × a = 24",
                "a = {24|2} = 12",
                "ดังนั้น ต้องใช้น้ำตาล 12 ถ้วย"
            ]
        },
        {
            question: "รถยนต์แล่นด้วยอัตราเร็วคงที่ได้ระยะทาง 120 กิโลเมตร ในเวลา 2 ชั่วโมง ถ้าแล่นด้วยอัตราเร็วเท่าเดิมเป็นเวลา 5 ชั่วโมง จะได้ระยะทางกี่กิโลเมตร",
            choices: ["300", "240", "48"],
            correctAnswer: "300",
            explanation: [
                "ให้ได้ระยะทาง a กิโลเมตร",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {120|2} = {a|5}",
                "คูณไขว้ จะได้ 2 × a = 120 × 5",
                "2 × a = 600",
                "a = {600|2} = 300",
                "ดังนั้น ได้ระยะทาง 300 กิโลเมตร"
            ]
        },
        {
            question: "แผนที่ฉบับหนึ่งใช้ระยะ 1 เซนติเมตร แทนระยะทางจริง 5 กิโลเมตร ถ้าวัดระยะในแผนที่ได้ 7 เซนติเมตร ระยะทางจริงเป็นกี่กิโลเมตร",
            choices: ["35", "12", "30"],
            correctAnswer: "35",
            explanation: [
                "ให้ระยะทางจริงเป็น a กิโลเมตร",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {1|5} = {7|a}",
                "คูณไขว้ จะได้ 1 × a = 5 × 7",
                "1 × a = 35",
                "a = {35|1} = 35",
                "ดังนั้น ระยะทางจริงเป็น 35 กิโลเมตร"
            ]
        },
        {
            question: "อัตราส่วนของจำนวนครูต่อจำนวนนักเรียนเป็น 1 : 25 ถ้ามีนักเรียน 200 คน จะมีครูกี่คน",
            choices: ["8", "5", "10"],
            correctAnswer: "8",
            explanation: [
                "ให้มีครู a คน",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {1|25} = {a|200}",
                "คูณไขว้ จะได้ 25 × a = 1 × 200",
                "25 × a = 200",
                "a = {200|25} = 8",
                "ดังนั้น มีครู 8 คน"
            ]
        },
        {
            question: "ผสมสีแดงกับสีขาวด้วยอัตราส่วน 3 : 5 ถ้าใช้สีขาว 20 กระป๋อง ต้องใช้สีแดงกี่กระป๋อง",
            choices: ["12", "15", "18"],
            correctAnswer: "12",
            explanation: [
                "ให้ต้องใช้สีแดง a กระป๋อง",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {3|5} = {a|20}",
                "คูณไขว้ จะได้ 5 × a = 3 × 20",
                "5 × a = 60",
                "a = {60|5} = 12",
                "ดังนั้น ต้องใช้สีแดง 12 กระป๋อง"
            ]
        }
    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 3
    // =======================================

    const body = document.body;

    const currentStage = Number(body.dataset.stage);
    const nextPage = body.dataset.next || "./propplay4.html";
    const backPage = body.dataset.back || "./propplay2.html";

    const QUESTION_KEY = "propStage3Question";

    if (currentStage !== 3) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 3 เท่านั้น");
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

        // บันทึกผลด่านที่ 3
        results[3] = isCorrect;

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
