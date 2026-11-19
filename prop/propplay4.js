
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 4
    // =======================================

    // ด่านที่ 4 — สัดส่วนผกผัน
    const questionBank = [
        {
            question: "คนงาน 4 คน ทาสีรั้วเสร็จใน 6 วัน ถ้ามีคนงาน 8 คน และทุกคนทำงานได้เท่ากัน จะทาสีรั้วเดิมเสร็จในกี่วัน",
            choices: ["3", "12", "5"],
            correctAnswer: "3",
            explanation: [
                "ให้ทาสีเสร็จใน a วัน",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางกลับกัน จึงเป็นสัดส่วนผกผัน",
                "เขียนเป็นสัดส่วนผกผันได้ {4|8} = {a|6}",
                "คูณไขว้ จะได้ 8 × a = 4 × 6",
                "8 × a = 24",
                "a = {24|8} = 3",
                "ดังนั้น ทาสีเสร็จใน 3 วัน"
            ]
        },
        {
            question: "เครื่องจักรชนิดเดียวกัน 3 เครื่อง ผลิตสินค้าเสร็จใน 10 วัน ถ้าต้องการให้เสร็จใน 5 วัน ต้องใช้เครื่องจักรกี่เครื่อง",
            choices: ["6", "2", "15"],
            correctAnswer: "6",
            explanation: [
                "ให้ต้องใช้เครื่องจักร a เครื่อง",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางกลับกัน จึงเป็นสัดส่วนผกผัน",
                "เขียนเป็นสัดส่วนผกผันได้ {3|a} = {5|10}",
                "คูณไขว้ จะได้ a × 5 = 3 × 10",
                "a × 5 = 30",
                "a = {30|5} = 6",
                "ดังนั้น ต้องใช้เครื่องจักร 6 เครื่อง"
            ]
        },
        {
            question: "ขับรถด้วยอัตราเร็ว 60 กิโลเมตรต่อชั่วโมง ใช้เวลา 4 ชั่วโมง ถ้าขับด้วยอัตราเร็ว 80 กิโลเมตรต่อชั่วโมง ในระยะทางเท่าเดิม จะใช้เวลากี่ชั่วโมง",
            choices: ["3", "5", "2"],
            correctAnswer: "3",
            explanation: [
                "ให้ใช้เวลา a ชั่วโมง",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางกลับกัน จึงเป็นสัดส่วนผกผัน",
                "เขียนเป็นสัดส่วนผกผันได้ {60|80} = {a|4}",
                "คูณไขว้ จะได้ 80 × a = 60 × 4",
                "80 × a = 240",
                "a = {240|80} = 3",
                "ดังนั้น ใช้เวลา 3 ชั่วโมง"
            ]
        },
        {
            question: "อาหารถุงหนึ่งเลี้ยงแมว 6 ตัว ได้ 10 วัน ถ้าเลี้ยงแมว 4 ตัว อาหารถุงเดิมจะเลี้ยงได้กี่วัน",
            choices: ["15", "8", "12"],
            correctAnswer: "15",
            explanation: [
                "ให้เลี้ยงได้ a วัน",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางกลับกัน จึงเป็นสัดส่วนผกผัน",
                "เขียนเป็นสัดส่วนผกผันได้ {6|4} = {a|10}",
                "คูณไขว้ จะได้ 4 × a = 6 × 10",
                "4 × a = 60",
                "a = {60|4} = 15",
                "ดังนั้น เลี้ยงได้ 15 วัน"
            ]
        },
        {
            question: "เปิดก๊อกน้ำขนาดเท่ากัน 2 ก๊อก น้ำเต็มถังใน 15 นาที ถ้าเปิด 6 ก๊อก น้ำจะเต็มถังเดิมในกี่นาที",
            choices: ["5", "45", "10"],
            correctAnswer: "5",
            explanation: [
                "ให้น้ำเต็มถังใน a นาที",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางกลับกัน จึงเป็นสัดส่วนผกผัน",
                "เขียนเป็นสัดส่วนผกผันได้ {2|6} = {a|15}",
                "คูณไขว้ จะได้ 6 × a = 2 × 15",
                "6 × a = 30",
                "a = {30|6} = 5",
                "ดังนั้น น้ำเต็มถังใน 5 นาที"
            ]
        }
    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 4
    // =======================================

    const body = document.body;

    const currentStage = Number(body.dataset.stage);
    const nextPage = body.dataset.next || "./propplay5.html";
    const backPage = body.dataset.back || "./propplay3.html";

    const QUESTION_KEY = "propStage4Question";

    if (currentStage !== 4) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 4 เท่านั้น");
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

        // บันทึกผลด่านที่ 4
        results[4] = isCorrect;

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

    console.log("Propplay4 พร้อมใช้งาน");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion);
    console.log("ตัวเลือกลูกบอล:", currentChoices);

})();
