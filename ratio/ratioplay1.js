
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 1
    // =======================================

    const questionBank = [
        {
            question: "ในตะกร้ามีส้ม 6 ผล และแตงโม 3 ผล อัตราส่วนแตงโมต่อส้มคือเท่าใด",
            answer1: 3,
            answer2: 6,
            answerText: "3 : 6 หรือ 1 : 2",
            explanation: [
                "อัตราส่วนเขียนเรียงตามลำดับของปริมาณที่นำมาเปรียบเทียบ",
                "แตงโม 3 ผล ต่อ ส้ม 6 ผล เขียนได้เป็น 3 : 6",
                "ใช้หลักการหาร นำ 3 หารทั้งสองจำนวนของอัตราส่วน",
                "3 : 6 = (3 ÷ 3) : (6 ÷ 3) = 1 : 2",
                "ดังนั้น อัตราส่วนแตงโมต่อส้ม คือ 3 : 6 หรือ 1 : 2"
            ]
        },
        {
            question: "มีแมว 4 ตัว และสุนัข 8 ตัว อัตราส่วนแมวต่อสุนัขคือเท่าใด",
            answer1: 4,
            answer2: 8,
            answerText: "4 : 8 หรือ 1 : 2",
            explanation: [
                "อัตราส่วนเขียนเรียงตามลำดับของปริมาณที่นำมาเปรียบเทียบ",
                "แมว 4 ตัว ต่อ สุนัข 8 ตัว เขียนได้เป็น 4 : 8",
                "ใช้หลักการหาร นำ 4 หารทั้งสองจำนวนของอัตราส่วน",
                "4 : 8 = (4 ÷ 4) : (8 ÷ 4) = 1 : 2",
                "ดังนั้น อัตราส่วนแมวต่อสุนัข คือ 4 : 8 หรือ 1 : 2"
            ]
        },
        {
            question: "มีดินสอ 10 แท่ง และปากกา 5 ด้าม อัตราส่วนปากกาต่อดินสอคือเท่าใด",
            answer1: 5,
            answer2: 10,
            answerText: "5 : 10 หรือ 1 : 2",
            explanation: [
                "อัตราส่วนเขียนเรียงตามลำดับของปริมาณที่นำมาเปรียบเทียบ",
                "ปากกา 5 ด้าม ต่อ ดินสอ 10 แท่ง เขียนได้เป็น 5 : 10",
                "ใช้หลักการหาร นำ 5 หารทั้งสองจำนวนของอัตราส่วน",
                "5 : 10 = (5 ÷ 5) : (10 ÷ 5) = 1 : 2",
                "ดังนั้น อัตราส่วนปากกาต่อดินสอ คือ 5 : 10 หรือ 1 : 2"
            ]
        },
        {
            question: "มีลูกบอลสีแดง 9 ลูก และสีน้ำเงิน 6 ลูก อัตราส่วนสีแดงต่อสีน้ำเงินคือเท่าใด",
            answer1: 9,
            answer2: 6,
            answerText: "9 : 6 หรือ 3 : 2",
            explanation: [
                "อัตราส่วนเขียนเรียงตามลำดับของปริมาณที่นำมาเปรียบเทียบ",
                "ลูกบอลสีแดง 9 ลูก ต่อ ลูกบอลสีน้ำเงิน 6 ลูก เขียนได้เป็น 9 : 6",
                "ใช้หลักการหาร นำ 3 หารทั้งสองจำนวนของอัตราส่วน",
                "9 : 6 = (9 ÷ 3) : (6 ÷ 3) = 3 : 2",
                "ดังนั้น อัตราส่วนสีแดงต่อสีน้ำเงิน คือ 9 : 6 หรือ 3 : 2"
            ]
        },
        {
            question: "มีนักเรียนชาย 12 คน และนักเรียนหญิง 8 คน อัตราส่วนนักเรียนชายต่อหญิงคือเท่าใด",
            answer1: 12,
            answer2: 8,
            answerText: "12 : 8 หรือ 3 : 2",
            explanation: [
                "อัตราส่วนเขียนเรียงตามลำดับของปริมาณที่นำมาเปรียบเทียบ",
                "นักเรียนชาย 12 คน ต่อ นักเรียนหญิง 8 คน เขียนได้เป็น 12 : 8",
                "ใช้หลักการหาร นำ 4 หารทั้งสองจำนวนของอัตราส่วน",
                "12 : 8 = (12 ÷ 4) : (8 ÷ 4) = 3 : 2",
                "ดังนั้น อัตราส่วนนักเรียนชายต่อหญิง คือ 12 : 8 หรือ 3 : 2"
            ]
        }
    ];


    // =======================================
    // 2. ตั้งค่าด่าน
    // =======================================

    const currentStage = Number(document.body.dataset.stage);
    const nextPage = document.body.dataset.next;

    const QUESTION_KEY = "ratioStage1Question";


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

    const circles = document.querySelectorAll(".step-circle");
    const lines = document.querySelectorAll(".progress-line");
    const stageText = document.getElementById("stageText");


    // ตรวจสอบ HTML
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
        console.error("ไม่พบ Element ใน HTML กรุณาตรวจสอบ ID");
        return;
    }

    if (currentStage !== 1) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 1 เท่านั้น");
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

    const currentQuestion = questionBank[randomIndex];
    window.__lgQuestion = currentQuestion;   // ให้ progress.js บันทึกโจทย์ข้อนี้ไว้สำหรับหน้าเฉลย

    // แสดงโจทย์
    questionText.textContent = currentQuestion.question;


    // =======================================
    // 5. ตั้งค่าสถานะเริ่มต้น
    // =======================================

    let numbers = [1, 1];
    let hasSubmitted = false;

    // ซ่อน Popup และปุ่มถัดไปตั้งแต่เริ่มเกม
    feedbackOverlay.hidden = true;
    nextButton.hidden = true;

    // เปิดใช้งานปุ่มทั้งหมดตอนเริ่มเกม
    submitButton.disabled = false;

    document.querySelectorAll(".arrow, .number-box").forEach(button => {
        button.disabled = false;
    });


    // =======================================
    // 6. Progress Bar
    // =======================================

    circles.forEach((circle, index) => {

        const stage = index + 1;

        if (stage < currentStage) {
            circle.classList.add("completed");
            circle.textContent = "✓";
        }

        else if (stage === currentStage) {
            circle.classList.add("active");
        }
    });

    lines.forEach((line, index) => {
        if (index + 1 < currentStage) {
            line.classList.add("completed");
        }
    });

    if (stageText) {
        stageText.textContent = "ด่าน 1 / 5";
    }


    // =======================================
    // 7. อัปเดตตัวเลข
    // =======================================

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

            console.log("ตัวเลขปัจจุบัน:", numbers);
        });
    });


    // =======================================
    // 9. กดส่งคำตอบ
    // =======================================

    submitButton.addEventListener("click", () => {

        if (hasSubmitted) return;

        hasSubmitted = true;

        // ตรวจสอบคำตอบ
        const isCorrect =
            numbers[0] * currentQuestion.answer2 ===
            numbers[1] * currentQuestion.answer1;


        // บันทึกผลคำตอบ
        let results = {};

        try {
            results = JSON.parse(
                localStorage.getItem("ratioResults") || "{}"
            );
        } catch (error) {
            results = {};
        }

        results[1] = isCorrect;

        localStorage.setItem(
            "ratioResults",
            JSON.stringify(results)
        );


        // บันทึกคะแนน
        const score = Object.values(results)
            .filter(result => result === true).length;

        localStorage.setItem("ratioScore", String(score));


        // แสดงผล Popup
        if (isCorrect) {

            feedbackTitle.textContent = "เก่งมาก! ตอบถูกแล้ว";
            feedbackTitle.className = "feedback-title correct";

        } else {

            feedbackTitle.textContent = "ยังไม่ถูกนะ";
            feedbackTitle.className = "feedback-title wrong";
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


        // ปิดการใช้งานปุ่มลูกศรและปุ่มส่งคำตอบ
        document.querySelectorAll(".arrow, .number-box").forEach(button => {
            button.disabled = true;
        });

        submitButton.disabled = true;


        // แสดง Popup หลังจากกดส่งคำตอบเท่านั้น
        feedbackOverlay.hidden = false;

        feedbackDone.focus();

        console.log("ตรวจคำตอบเรียบร้อย:", isCorrect);

    });


    // =======================================
    // 10. กดตกลงเพื่อปิด Popup
    // =======================================

    feedbackDone.addEventListener("click", () => {

        feedbackOverlay.hidden = true;

        // แสดงปุ่มถัดไปหลังปิด Popup
        nextButton.hidden = false;

        console.log("แสดงปุ่มถัดไปแล้ว");

    });


    // กด Escape เพื่อปิด Popup
    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            feedbackOverlay.hidden === false &&
            hasSubmitted
        ) {
            feedbackOverlay.hidden = true;
            nextButton.hidden = false;
        }
    });


    // =======================================
    // 11. ปุ่มถัดไป
    // =======================================

    nextButton.addEventListener("click", () => {

        if (!hasSubmitted) return;

        if (nextPage) {
            window.location.href = nextPage;
        }
    });


    // =======================================
    // 12. เริ่มต้นเกม
    // =======================================

    updateNumbers();

    console.log("เริ่มเกมด่านที่ 1");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion.question);

})();
