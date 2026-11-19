
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 5
    // =======================================

    const questionBank = [

        // ข้อ 1
        {
            question:
                "มีลูกบอล 10 ลูก แบ่งเป็นสีแดง 6 ลูก และสีเขียว 4 ลูก จงหาอัตราส่วนของลูกบอลสีแดงต่อจำนวนลูกบอลทั้งหมด",

            answer1: 6,
            answer2: 10,

            answerText: "6 : 10 หรือ 3 : 5",

            explanation:
                [
                "อัตราส่วนเขียนเรียงตามลำดับของปริมาณที่นำมาเปรียบเทียบ",
                "ลูกบอลสีแดง 6 ลูก ต่อ ลูกบอลทั้งหมด 10 ลูก เขียนได้เป็น 6 : 10",
                "ใช้หลักการหาร นำ 2 หารทั้งสองจำนวนของอัตราส่วน",
                "6 : 10 = (6 ÷ 2) : (10 ÷ 2) = 3 : 5",
                "ดังนั้น อัตราส่วนของลูกบอลสีแดงต่อจำนวนลูกบอลทั้งหมด คือ 6 : 10 หรือ 3 : 5"
            ]
        },

        // ข้อ 2
        {
            question:
                "มีลูกแก้ว 15 ลูก เป็นสีน้ำเงิน 9 ลูก และสีแดง 6 ลูก จงหาอัตราส่วนของลูกแก้วสีน้ำเงินต่อจำนวนลูกแก้วทั้งหมด",

            answer1: 9,
            answer2: 15,

            answerText: "9 : 15 หรือ 3 : 5",

            explanation:
                [
                "อัตราส่วนเขียนเรียงตามลำดับของปริมาณที่นำมาเปรียบเทียบ",
                "ลูกแก้วสีน้ำเงิน 9 ลูก ต่อ ลูกแก้วทั้งหมด 15 ลูก เขียนได้เป็น 9 : 15",
                "ใช้หลักการหาร นำ 3 หารทั้งสองจำนวนของอัตราส่วน",
                "9 : 15 = (9 ÷ 3) : (15 ÷ 3) = 3 : 5",
                "ดังนั้น อัตราส่วนของลูกแก้วสีน้ำเงินต่อจำนวนลูกแก้วทั้งหมด คือ 9 : 15 หรือ 3 : 5"
            ]
        },

        // ข้อ 3
        {
            question:
                "ห้องเรียนมีนักเรียน 20 คน เป็นนักเรียนหญิง 12 คน และนักเรียนชาย 8 คน จงหาอัตราส่วนของนักเรียนหญิงต่อจำนวนนักเรียนทั้งหมด",

            answer1: 12,
            answer2: 20,

            answerText: "12 : 20 หรือ 3 : 5",

            explanation:
                [
                "อัตราส่วนเขียนเรียงตามลำดับของปริมาณที่นำมาเปรียบเทียบ",
                "นักเรียนหญิง 12 คน ต่อ นักเรียนทั้งหมด 20 คน เขียนได้เป็น 12 : 20",
                "ใช้หลักการหาร นำ 4 หารทั้งสองจำนวนของอัตราส่วน",
                "12 : 20 = (12 ÷ 4) : (20 ÷ 4) = 3 : 5",
                "ดังนั้น อัตราส่วนของนักเรียนหญิงต่อจำนวนนักเรียนทั้งหมด คือ 12 : 20 หรือ 3 : 5"
            ]
        },

        // ข้อ 4
        {
            question:
                "ในตะกร้ามีผลไม้ 18 ผล เป็นกล้วย 6 ผล และส้ม 12 ผล จงหาอัตราส่วนของกล้วยต่อจำนวนผลไม้ทั้งหมด",

            answer1: 6,
            answer2: 18,

            answerText: "6 : 18 หรือ 1 : 3",

            explanation:
                [
                "อัตราส่วนเขียนเรียงตามลำดับของปริมาณที่นำมาเปรียบเทียบ",
                "กล้วย 6 ผล ต่อ ผลไม้ทั้งหมด 18 ผล เขียนได้เป็น 6 : 18",
                "ใช้หลักการหาร นำ 6 หารทั้งสองจำนวนของอัตราส่วน",
                "6 : 18 = (6 ÷ 6) : (18 ÷ 6) = 1 : 3",
                "ดังนั้น อัตราส่วนของกล้วยต่อจำนวนผลไม้ทั้งหมด คือ 6 : 18 หรือ 1 : 3"
            ]
        },

        // ข้อ 5
        {
            question:
                "มีดอกไม้ทั้งหมด 25 ดอก เป็นดอกไม้สีเหลือง 10 ดอก และสีชมพู 15 ดอก จงหาอัตราส่วนของดอกไม้สีเหลืองต่อจำนวนดอกไม้ทั้งหมด",

            answer1: 10,
            answer2: 25,

            answerText: "10 : 25 หรือ 2 : 5",

            explanation:
                [
                "อัตราส่วนเขียนเรียงตามลำดับของปริมาณที่นำมาเปรียบเทียบ",
                "ดอกไม้สีเหลือง 10 ดอก ต่อ ดอกไม้ทั้งหมด 25 ดอก เขียนได้เป็น 10 : 25",
                "ใช้หลักการหาร นำ 5 หารทั้งสองจำนวนของอัตราส่วน",
                "10 : 25 = (10 ÷ 5) : (25 ÷ 5) = 2 : 5",
                "ดังนั้น อัตราส่วนของดอกไม้สีเหลืองต่อจำนวนดอกไม้ทั้งหมด คือ 10 : 25 หรือ 2 : 5"
            ]
        }

    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 5
    // =======================================

    const currentStage = Number(document.body.dataset.stage);
    const nextPage = document.body.dataset.next;
    const backPage = document.body.dataset.back || "ratioplay4.html";

    const QUESTION_KEY = "ratioStage5Question";


    if (currentStage !== 5) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 5 เท่านั้น");
        return;
    }


    // =======================================
    // 3. เชื่อม HTML
    // =======================================

    const questionText = document.getElementById("questionText");

    const numberElements = [
        document.getElementById("number1"),
        document.getElementById("number2")
    ];

    const submitButton = document.getElementById("submitButton");
    const nextButton = document.getElementById("nextButton");

    const feedbackOverlay = document.getElementById("feedbackOverlay");
    const feedbackTitle = document.getElementById("feedbackTitle");
    const feedbackMessage = document.getElementById("feedbackMessage");
    const feedbackDone = document.getElementById("feedbackDone");

    const backButton = document.getElementById("backButton");

    const circles = document.querySelectorAll(".step-circle");
    const lines = document.querySelectorAll(".progress-line");
    const stageText = document.getElementById("stageText");


    // ตรวจสอบ Element ใน HTML

    const requiredElements = [
        questionText,
        numberElements[0],
        numberElements[1],
        submitButton,
        nextButton,
        feedbackOverlay,
        feedbackTitle,
        feedbackMessage,
        feedbackDone
    ];

    if (requiredElements.some(element => !element)) {
        console.error("ไม่พบ Element ที่จำเป็นใน HTML ด่าน 5");
        return;
    }


    // =======================================
    // 4. สุ่มโจทย์ 1 ข้อจาก 5 ข้อ
    // =======================================

    let randomIndex = sessionStorage.getItem(QUESTION_KEY);

    if (
        randomIndex === null ||
        !Number.isInteger(Number(randomIndex)) ||
        Number(randomIndex) < 0 ||
        Number(randomIndex) >= questionBank.length
    ) {

        randomIndex = Math.floor(
            Math.random() * questionBank.length
        );

        sessionStorage.setItem(
            QUESTION_KEY,
            String(randomIndex)
        );

    } else {

        randomIndex = Number(randomIndex);
    }


    // เลือกโจทย์ที่สุ่มได้
    const currentQuestion = questionBank[randomIndex];
    window.__lgQuestion = currentQuestion;   // ให้ progress.js บันทึกโจทย์ข้อนี้ไว้สำหรับหน้าเฉลย


    // =======================================
    // 5. แสดงโจทย์
    // =======================================

    questionText.textContent = currentQuestion.question;


    // =======================================
    // 6. แสดง Progress Bar
    // =======================================

    circles.forEach((circle, index) => {

        const stage = index + 1;

        if (stage < currentStage) {

            circle.classList.add("completed");
            circle.textContent = "✓";

        } else if (stage === currentStage) {

            circle.classList.add("active");
        }
    });


    lines.forEach((line, index) => {

        if (index + 1 < currentStage) {
            line.classList.add("completed");
        }
    });


    if (stageText) {
        stageText.textContent = "ด่าน 5 / 5";
    }


    // =======================================
    // 7. ตั้งค่าตัวเลขเริ่มต้น
    // =======================================

    let numbers = [1, 1];
    let hasSubmitted = false;

    // ซ่อน Popup และปุ่มถัดไปตอนเริ่มเกม
    feedbackOverlay.hidden = true;
    nextButton.hidden = true;

    submitButton.disabled = false;

    document.querySelectorAll(".arrow, .number-box").forEach(button => {
        button.disabled = false;
    });


    function updateNumbers() {

        numberElements.forEach((element, index) => {
            element.value = numbers[index];
        });
    }


    // พิมพ์ตัวเลขลงในกล่องได้โดยตรง (1-99) นอกเหนือจากการกดลูกศรขึ้น-ลง
    numberElements.forEach((element, index) => {
        if (!element || element.tagName !== "INPUT") return;
        element.addEventListener("focus", () => element.select());
        element.addEventListener("input", () => {
            if (hasSubmitted) return;
            const digits = element.value.replace(/\D/g, "").slice(0, 2);
            element.value = digits;
            const value = Number(digits);
            if (value >= 1 && value <= 99) numbers[index] = value;
        });
        element.addEventListener("blur", () => { element.value = numbers[index]; });
        element.addEventListener("keydown", event => { if (event.key === "Enter") element.blur(); });
    });


    // =======================================
    // 8. ปุ่มลูกศรเพิ่มและลดตัวเลข
    // =======================================

    document.querySelectorAll(".arrow").forEach(button => {

        button.addEventListener("click", () => {

            if (hasSubmitted) return;

            const index = Number(button.dataset.index);
            const change = Number(button.dataset.change);

            if (index !== 0 && index !== 1) return;

            const newValue = numbers[index] + change;

            if (newValue < 1 || newValue > 99) return;

            numbers[index] = newValue;

            updateNumbers();

        });
    });


    // =======================================
    // 9. บันทึกคะแนน
    // =======================================

    function saveAnswer(isCorrect) {

        let results = {};

        try {

            results = JSON.parse(
                localStorage.getItem("ratioResults") || "{}"
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


        // บันทึกผลของด่านที่ 5
        results[5] = isCorrect;

        localStorage.setItem(
            "ratioResults",
            JSON.stringify(results)
        );


        // คำนวณคะแนนรวม
        const score = Object.values(results).filter(
            result => result === true
        ).length;

        localStorage.setItem("ratioScore", String(score));
    }


    // =======================================
    // 10. แสดง Popup
    // =======================================

    function showFeedback(isCorrect) {

        if (isCorrect) {

            feedbackTitle.textContent =
                "เก่งมาก! ตอบถูกแล้ว";

            feedbackTitle.className =
                "feedback-title correct";

        } else {

            feedbackTitle.textContent =
                "ยังไม่ถูกนะ";

            feedbackTitle.className =
                "feedback-title wrong";
        }


        // แสดงคำตอบ + วิธีทำเป็นขั้น ๆ (แปลง {a|b} เป็นเศษส่วน) แบบเดียวกับเฉลยแบบทดสอบรวมบท
        const toFraction = text => text.replace(/\{([^|{}]+)\|([^{}]+)\}/g,
            '<span class="frac"><span>$1</span><span>$2</span></span>');

        feedbackMessage.innerHTML =
            `<span class="sol-head">` + `คำตอบของคุณคือ ${numbers[0]} : ${numbers[1]} ` +
            `เฉลยคือ ${currentQuestion.answerText} ` + `</span>` +
            `<span class="sol-box"><span class="sol-label">วิธีทำ</span>` +
            currentQuestion.explanation.map(toFraction).join("<br>") +
            `</span>`;


        feedbackOverlay.hidden = false;

        feedbackDone.focus();
    }


    // =======================================
    // 11. ส่งคำตอบและตรวจคำตอบ
    // =======================================

    submitButton.addEventListener("click", () => {

        if (hasSubmitted) return;

        hasSubmitted = true;


        // ตรวจสอบอัตราส่วนที่เท่ากัน
        const isCorrect =
            numbers[0] * currentQuestion.answer2 ===
            numbers[1] * currentQuestion.answer1;


        // บันทึกผลด่านที่ 5
        saveAnswer(isCorrect);


        // ปิดปุ่มลูกศร
        document.querySelectorAll(".arrow, .number-box").forEach(button => {
            button.disabled = true;
        });

        submitButton.disabled = true;


        // แสดง Popup เฉลย
        showFeedback(isCorrect);

    });


    // =======================================
    // 12. ปิด Popup เมื่อกดตกลง
    // =======================================

    function closeFeedback() {

        if (!hasSubmitted) return;

        feedbackOverlay.hidden = true;

        // แสดงปุ่มไปหน้าสรุปคะแนน
        nextButton.hidden = false;
    }

    feedbackDone.addEventListener("click", closeFeedback);


    // กด Escape เพื่อปิด Popup
    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            !feedbackOverlay.hidden &&
            hasSubmitted
        ) {
            closeFeedback();
        }
    });


    // =======================================
    // 13. ปุ่มถัดไป
    // =======================================

    nextButton.addEventListener("click", () => {

        if (!hasSubmitted) return;

        if (nextPage) {
            window.location.href = nextPage;
        }
    });


    // =======================================
    // 14. ปุ่มย้อนกลับ (ถ้ามี)
    // =======================================

    if (backButton) {

        backButton.addEventListener("click", () => {
            window.location.href = backPage;
        });
    }


    // =======================================
    // 15. เริ่มต้นเกม
    // =======================================

    updateNumbers();

    console.log("Ratioplay stage 5 พร้อมใช้งาน");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion.question);

})();
