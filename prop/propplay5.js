
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 5
    // =======================================

    // ด่านที่ 5 — โจทย์ผสม: สัดส่วนตรงหรือสัดส่วนผกผัน
    const questionBank = [
        {
            question: "เครื่องพิมพ์พิมพ์งานได้ 80 แผ่น ในเวลา 4 นาที ถ้าพิมพ์ด้วยอัตราเร็วเท่าเดิมเป็นเวลา 10 นาที จะพิมพ์ได้กี่แผ่น",
            choices: ["200", "32", "160"],
            correctAnswer: "200",
            explanation: [
                "ให้พิมพ์ได้ a แผ่น",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {80|4} = {a|10}",
                "คูณไขว้ จะได้ 4 × a = 80 × 10",
                "4 × a = 800",
                "a = {800|4} = 200",
                "ดังนั้น พิมพ์ได้ 200 แผ่น"
            ]
        },
        {
            question: "คนงาน 9 คน สร้างกำแพงเสร็จใน 8 วัน ถ้าต้องการให้เสร็จใน 6 วัน และทุกคนทำงานได้เท่ากัน ต้องใช้คนงานกี่คน",
            choices: ["12", "7", "11"],
            correctAnswer: "12",
            explanation: [
                "ให้ต้องใช้คนงาน a คน",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางกลับกัน จึงเป็นสัดส่วนผกผัน",
                "เขียนเป็นสัดส่วนผกผันได้ {9|a} = {6|8}",
                "คูณไขว้ จะได้ a × 6 = 9 × 8",
                "a × 6 = 72",
                "a = {72|6} = 12",
                "ดังนั้น ต้องใช้คนงาน 12 คน"
            ]
        },
        {
            question: "น้ำมัน 5 ลิตร รถแล่นได้ระยะทาง 70 กิโลเมตร ถ้าต้องการแล่นให้ได้ระยะทาง 210 กิโลเมตร ต้องใช้น้ำมันกี่ลิตร",
            choices: ["15", "14", "42"],
            correctAnswer: "15",
            explanation: [
                "ให้ต้องใช้น้ำมัน a ลิตร",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {5|70} = {a|210}",
                "คูณไขว้ จะได้ 70 × a = 5 × 210",
                "70 × a = 1,050",
                "a = {1,050|70} = 15",
                "ดังนั้น ต้องใช้น้ำมัน 15 ลิตร"
            ]
        },
        {
            question: "แบ่งเงินจำนวนหนึ่งให้เด็ก 6 คน ได้คนละ 40 บาท ถ้าแบ่งเงินจำนวนเดิมให้เด็ก 8 คน เท่า ๆ กัน จะได้คนละกี่บาท",
            choices: ["30", "48", "32"],
            correctAnswer: "30",
            explanation: [
                "ให้ได้คนละ a บาท",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางกลับกัน จึงเป็นสัดส่วนผกผัน",
                "เขียนเป็นสัดส่วนผกผันได้ {6|8} = {a|40}",
                "คูณไขว้ จะได้ 8 × a = 6 × 40",
                "8 × a = 240",
                "a = {240|8} = 30",
                "ดังนั้น ได้คนละ 30 บาท"
            ]
        },
        {
            question: "รูปถ่ายกว้าง 4 เซนติเมตร ยาว 6 เซนติเมตร ถ้าขยายรูปให้กว้าง 10 เซนติเมตร โดยอัตราส่วนของความกว้างต่อความยาวเท่าเดิม รูปจะยาวกี่เซนติเมตร",
            choices: ["15", "12", "16"],
            correctAnswer: "15",
            explanation: [
                "ให้รูปยาว a เซนติเมตร",
                "ปริมาณทั้งสองเปลี่ยนแปลงไปในทางเดียวกัน จึงเป็นสัดส่วนตรง",
                "เขียนเป็นสัดส่วนตรงได้ {4|6} = {10|a}",
                "คูณไขว้ จะได้ 4 × a = 6 × 10",
                "4 × a = 60",
                "a = {60|4} = 15",
                "ดังนั้น รูปยาว 15 เซนติเมตร"
            ]
        }
    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 5
    // =======================================

    const body = document.body;

    const currentStage = Number(body.dataset.stage);
    const nextPage = body.dataset.next || "./propscore.html";
    const backPage = body.dataset.back || "./propplay4.html";

    const QUESTION_KEY = "propStage5Question";

    if (currentStage !== 5) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 5 เท่านั้น");
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

        // บันทึกผลด่านที่ 5
        results[5] = isCorrect;

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
