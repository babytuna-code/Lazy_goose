
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 3
    // =======================================

    const questionBank = [

        // ข้อ 1
        {
            statement1:
                "อัตราส่วนของอายุของนารีต่ออายุของโชติ เป็น 4 : 3",

            statement2:
                "อัตราส่วนของอายุของโชติต่ออายุของบุปผา เป็น 6 : 7",

            question:
                "จงหาอัตราส่วนของอายุของนารีต่ออายุของโชติต่ออายุของบุปผา",

            answer: [8, 6, 7],

            answerText: "8 : 6 : 7",

            explanation:
                [
                "ทำให้จำนวนที่แทนอายุของโชติเท่ากัน (ค.ร.น. ของ 3 และ 6 คือ 6)",
                "4 : 3 = (4 × 2) : (3 × 2) = 8 : 6",
                "อายุของโชติเป็น 6 เท่ากันทั้งสองอัตราส่วน จึงนำ 8 : 6 มาเทียบกับ 6 : 7 ได้",
                "ดังนั้น อัตราส่วนของอายุของนารีต่ออายุของโชติต่ออายุของบุปผา เป็น 8 : 6 : 7"
            ]
        },

        // ข้อ 2
        {
            statement1:
                "อัตราส่วนของลูกบอลสีแดงต่อสีน้ำเงิน เป็น 2 : 3",

            statement2:
                "อัตราส่วนของลูกบอลสีน้ำเงินต่อสีเขียว เป็น 6 : 5",

            question:
                "จงหาอัตราส่วนของลูกบอลสีแดงต่อสีน้ำเงินต่อสีเขียว",

            answer: [4, 6, 5],

            answerText: "4 : 6 : 5",

            explanation:
                [
                "ทำให้จำนวนที่แทนลูกบอลสีน้ำเงินเท่ากัน (ค.ร.น. ของ 3 และ 6 คือ 6)",
                "2 : 3 = (2 × 2) : (3 × 2) = 4 : 6",
                "ลูกบอลสีน้ำเงินเป็น 6 เท่ากันทั้งสองอัตราส่วน จึงนำ 4 : 6 มาเทียบกับ 6 : 5 ได้",
                "ดังนั้น อัตราส่วนของลูกบอลสีแดงต่อสีน้ำเงินต่อสีเขียว เป็น 4 : 6 : 5"
            ]
        },

        // ข้อ 3
        {
            statement1:
                "อัตราส่วนของจำนวนหนังสือของ A ต่อ B เป็น 3 : 4",

            statement2:
                "อัตราส่วนของจำนวนหนังสือของ B ต่อ C เป็น 2 : 5",

            question:
                "จงหาอัตราส่วนของจำนวนหนังสือของ A ต่อ B ต่อ C",

            answer: [3, 4, 10],

            answerText: "3 : 4 : 10",

            explanation:
                [
                "ทำให้จำนวนที่แทนหนังสือของ B เท่ากัน (ค.ร.น. ของ 4 และ 2 คือ 4)",
                "2 : 5 = (2 × 2) : (5 × 2) = 4 : 10",
                "หนังสือของ B เป็น 4 เท่ากันทั้งสองอัตราส่วน จึงนำ 3 : 4 มาเทียบกับ 4 : 10 ได้",
                "ดังนั้น อัตราส่วนของจำนวนหนังสือของ A ต่อ B ต่อ C เป็น 3 : 4 : 10"
            ]
        },

        // ข้อ 4
        {
            statement1:
                "อัตราส่วนของจำนวนมะม่วงต่อส้ม เป็น 5 : 2",

            statement2:
                "อัตราส่วนของจำนวนส้มต่อกล้วย เป็น 3 : 4",

            question:
                "จงหาอัตราส่วนของจำนวนมะม่วงต่อส้มต่อกล้วย",

            answer: [15, 6, 8],

            answerText: "15 : 6 : 8",

            explanation:
                [
                "ทำให้จำนวนที่แทนส้มเท่ากัน (ค.ร.น. ของ 2 และ 3 คือ 6)",
                "5 : 2 = (5 × 3) : (2 × 3) = 15 : 6",
                "3 : 4 = (3 × 2) : (4 × 2) = 6 : 8",
                "ส้มเป็น 6 เท่ากันทั้งสองอัตราส่วน จึงนำ 15 : 6 มาเทียบกับ 6 : 8 ได้",
                "ดังนั้น อัตราส่วนของจำนวนมะม่วงต่อส้มต่อกล้วย เป็น 15 : 6 : 8"
            ]
        },

        // ข้อ 5
        {
            statement1:
                "อัตราส่วนของอายุของนิดาต่ออายุของสุดา เป็น 7 : 5",

            statement2:
                "อัตราส่วนของอายุของสุดาต่ออายุของพลอย เป็น 10 : 3",

            question:
                "จงหาอัตราส่วนของอายุของนิดาต่อสุดาต่อพลอย",

            answer: [14, 10, 3],

            answerText: "14 : 10 : 3",

            explanation:
                [
                "ทำให้จำนวนที่แทนอายุของสุดาเท่ากัน (ค.ร.น. ของ 5 และ 10 คือ 10)",
                "7 : 5 = (7 × 2) : (5 × 2) = 14 : 10",
                "อายุของสุดาเป็น 10 เท่ากันทั้งสองอัตราส่วน จึงนำ 14 : 10 มาเทียบกับ 10 : 3 ได้",
                "ดังนั้น อัตราส่วนของอายุของนิดาต่ออายุของสุดาต่ออายุของพลอย เป็น 14 : 10 : 3"
            ]
        }

    ];


    // =======================================
    // 2. ตั้งค่าด่านปัจจุบัน
    // =======================================

    const currentStage = Number(document.body.dataset.stage);
    const nextPage = document.body.dataset.next;
    const backPage = document.body.dataset.back || "ratioplay2.html";

    const QUESTION_KEY = "ratioStage3Question";

    if (currentStage !== 3) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 3 เท่านั้น");
        return;
    }


    // =======================================
    // 3. เชื่อม HTML
    // =======================================

    const questionText1 = document.getElementById("questionText1");
    const questionText2 = document.getElementById("questionText2");

    const numberElements = [
        document.getElementById("number1"),
        document.getElementById("number2"),
        document.getElementById("number3")
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
        questionText1,
        questionText2,
        numberElements[0],
        numberElements[1],
        numberElements[2],
        submitButton,
        nextButton,
        feedbackOverlay,
        feedbackTitle,
        feedbackMessage,
        feedbackDone
    ];

    if (requiredElements.some(element => !element)) {
        console.error("ไม่พบ Element ที่จำเป็นใน HTML ด่าน 3");
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


    // =======================================
    // 5. แสดงโจทย์ที่สุ่มได้
    // =======================================

    // กรอบที่ 1: ข้อมูลที่โจทย์กำหนด / กรอบที่ 2: สิ่งที่โจทย์ถาม
    questionText1.innerHTML =
        currentQuestion.statement1 + "<br>" + currentQuestion.statement2;

    questionText2.textContent = currentQuestion.question;


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
        stageText.textContent = "ด่าน 3 / 5";
    }


    // =======================================
    // 7. ตั้งค่าตัวเลขเริ่มต้น
    // =======================================

    let numbers = [1, 1, 1];
    let hasSubmitted = false;

    nextButton.hidden = true;
    feedbackOverlay.hidden = true;

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

            if (index < 0 || index > 2) return;

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

        // บันทึกผลของด่านที่ 3
        results[3] = isCorrect;

        localStorage.setItem(
            "ratioResults",
            JSON.stringify(results)
        );

        // คำนวณคะแนนรวมของด่านที่บันทึกไว้
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
            `<span class="sol-head">` + `คำตอบของคุณคือ ${numbers[0]} : ${numbers[1]} : ${numbers[2]} ` +
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

        // ตรวจสอบอัตราส่วน 3 จำนวน
        // ยอมรับอัตราส่วนที่เท่ากันด้วย

        const isCorrect =
            numbers[0] * currentQuestion.answer[1] ===
            numbers[1] * currentQuestion.answer[0] &&

            numbers[1] * currentQuestion.answer[2] ===
            numbers[2] * currentQuestion.answer[1];


        // บันทึกคะแนนด่านที่ 3
        saveAnswer(isCorrect);


        // ปิดปุ่มลูกศร
        document.querySelectorAll(".arrow, .number-box").forEach(button => {
            button.disabled = true;
        });

        submitButton.disabled = true;


        // แสดง Popup
        showFeedback(isCorrect);

    });


    // =======================================
    // 12. ปิด Popup เมื่อกดตกลง
    // =======================================

    function closeFeedback() {

        if (!hasSubmitted) return;

        feedbackOverlay.hidden = true;

        // แสดงปุ่มถัดไป
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
    // 15. เริ่มต้นเกม
    // =======================================

    updateNumbers();

    console.log("Ratioplay stage 3 พร้อมใช้งาน");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion);

})();
