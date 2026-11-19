// =====================================================
// testscore.js — รวมคะแนนแบบทดสอบรวมบท 10 ข้อ
// (รูปแบบเดียวกับ ratioscore / propscore / percentscore)
// + บันทึกผลเข้าระบบหลังบ้าน (scorebook.js)
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const TOTAL = 10;
    const scoreElement = document.getElementById("player-score");
    const messageElement = document.getElementById("result-message");
    const nameElement = document.getElementById("scoreName");
    const statusElement = document.getElementById("saveStatus");
    const dotsElement = document.getElementById("scoreDots");
    const retryButton = document.getElementById("retry-button");
    const homeButton = document.getElementById("home-button");

    // อ่านผลคำตอบทั้ง 10 ข้อ
    let results = {};

    try {
        results = JSON.parse(localStorage.getItem("testResults") || "{}");
    } catch (error) {
        results = {};
    }

    // นับจำนวนข้อที่ตอบถูก
    const score = Object.values(results).filter(result => result === true).length;

    scoreElement.textContent = score;

    // แสดงผลรายข้อ ✓ / ✗
    for (let q = 1; q <= TOTAL; q++) {
        const dot = document.createElement("span");
        dot.className = "score-dot";
        if (results[q] === true) {
            dot.classList.add("right");
            dot.textContent = "✓";
        } else if (results[q] === false) {
            dot.classList.add("wrong");
            dot.textContent = "✗";
        } else {
            dot.textContent = q;
        }
        dot.title = `ข้อ ${q}`;
        dotsElement.appendChild(dot);
    }

    // วงแหวนคะแนน: ระบายสีเขียวตามร้อยละของคะแนนที่ได้ (เริ่มจากด้านบน วนตามเข็มนาฬิกา) ส่วนที่เหลือเป็นสีครีม
    const ring = document.getElementById("scoreRing");
    if (ring) {
        const R = 44, C = 2 * Math.PI * R;
        const part = Math.max(0, Math.min(1, score / TOTAL)) * C;
        ring.innerHTML =
            `<circle cx="60" cy="60" r="${R}" fill="none" stroke="#3b2516" stroke-width="21"/>` +
            `<circle cx="60" cy="60" r="${R}" fill="none" stroke="#f1e7d3" stroke-width="16.5"/>` +
            (part > 0 ? `<circle cx="60" cy="60" r="${R}" fill="none" stroke="#2fb457" stroke-width="16.5" stroke-dasharray="${part.toFixed(2)} ${(C - part).toFixed(2)}" transform="rotate(-90 60 60)"/>` : "") +
            (part > 0 && part < C ? `<g stroke="#3b2516" stroke-width="2" stroke-linecap="round"><line x1="60" y1="7.5" x2="60" y2="24.5"/><line x1="60" y1="7.5" x2="60" y2="24.5" transform="rotate(${(score / TOTAL * 360).toFixed(2)} 60 60)"/></g>` : "");
    }

    // ตัวเลขสรุป: ตอบถูก / ตอบผิด / ร้อยละ
    const answered = Object.values(results).filter(r => r === true || r === false).length;
    const stats = document.getElementById("dashStats");
    if (stats) {
        const tile = (cls, mark, label, value) => `<div class="stat ${cls}"><span class="stat-icon">${mark}</span><span class="stat-label">${label}</span><span class="stat-value">${value}</span></div>`;
        stats.innerHTML =
            tile("right", "✓", "ตอบถูก", `${score} ข้อ`) +
            tile("wrong", "✗", "ตอบผิด", `${answered - score} ข้อ`) +
            tile("pct", "%", "คิดเป็นร้อยละ", `${Math.round((score / TOTAL) * 100)}%`);
    }

    // ข้อความตามคะแนน
    if (score === TOTAL) {
        messageElement.textContent = "เก่งมาก !";
    } else if (score >= 6) {
        messageElement.textContent = "ทำได้ดีมาก !";
    } else if (score >= 1) {
        messageElement.textContent = "พยายามอีกนิดนะ !";
    } else {
        messageElement.textContent = "ลองใหม่อีกครั้งนะ !";
    }

    // ---------- คะแนนแยกรายบท และคำแนะนำ ----------

    const studentInfo = Scorebook.getStudent();
    const perChapter = Scorebook.chapterScores(studentInfo, results);

    // เกณฑ์รายบท (แต่ละบทมีแค่ 3-4 ข้อ จึงนับจำนวนข้อที่ผิดแทนร้อยละ)
    //  - ผิดไม่เกิน 1 ข้อ (เช่น 2/3, 3/4) = ทำได้ดี
    //  - ผิดตั้งแต่ 2 ข้อขึ้นไป (เช่น 1/3, 2/4) = ควรฝึกเพิ่มเติม
    // (ถ้าใช้ 80% จะต้องถูกทุกข้อในบทที่มี 3-4 ข้อ ซึ่งเข้มเกินไป)
    const MAX_WRONG_OK = 1;
    const good = [];
    const practice = [];
    let allPerfect = true;

    document.getElementById("chapterScores").innerHTML = Scorebook.CHAPTERS.map(c => {
        const s = perChapter[c.key];
        if (!s.total) return "";
        const percent = Math.round((s.right / s.total) * 100);
        const wrong = s.total - s.right;
        const ok = wrong <= MAX_WRONG_OK;
        if (wrong) allPerfect = false;
        (ok ? good : practice).push({ ...c, ...s, percent });
        return `<div class="cbar ${ok ? "ok" : "low"}"><span class="cbar-name">${c.name}</span><span class="cbar-track"><span class="cbar-fill" style="width:${percent}%"></span></span><span class="cbar-val">${s.right}/${s.total}</span></div>`;
    }).join("");

    // บทที่ตอบผิดมากที่สุดขึ้นก่อน
    practice.sort((a, b) => a.percent - b.percent);

    const advice = document.getElementById("advice");

    if (!practice.length && allPerfect) {
        advice.innerHTML = `<p class="advice-title">ยอดเยี่ยม!</p>
            <p>ทำได้ดีทุกบทเลย เข้าใจเรื่องอัตราส่วน สัดส่วน และร้อยละแล้ว</p>`;
    } else if (!practice.length) {
        advice.innerHTML = `<p class="advice-title">ทำได้ดีทุกบท!</p>
            <p>ลองกดดูเฉลยข้อที่ตอบผิด เพื่อดูวิธีคิดที่ถูกต้องนะ</p>`;
    } else {
        advice.innerHTML =
            (good.length ? `<p><span class="advice-label ok">บทที่ทำได้ดี :</span> ${good.map(c => c.name).join(", ")}</p>` : "") +
            `<p><span class="advice-label low">บทที่ควรฝึกเพิ่มเติม :</span> ${practice.map(c => c.name).join(", ")}</p>
            <p class="advice-hint">ลองกลับไปทบทวนเนื้อหาและเล่นเกมบทนี้อีกครั้งนะ</p>
            <div class="advice-buttons">
                ${practice.map(c => `<a class="menu-btn" href="${c.url}">${c.name}</a>`).join("")}
            </div>`;
    }

    // ---------- บันทึกคะแนนเข้าระบบหลังบ้าน ----------

    const student = Scorebook.getStudent();

    if (student) {
        nameElement.textContent = `${student.name} ทำแบบทดสอบได้`;
    }

    const { record, isNew } = Scorebook.saveCurrentAttempt();

    if (!record) {
        statusElement.textContent = "ไม่ได้บันทึกคะแนน (ไม่พบข้อมูลชื่อผู้สอบ)";
    } else if (Scorebook.hasSheet()) {
        if (isNew || !record.sentToSheet) {
            statusElement.textContent = "กำลังส่งคะแนนให้ครู...";
            Scorebook.sendToSheet(record).then(ok => {
                statusElement.textContent = ok
                    ? "ส่งคะแนนให้ครูเรียบร้อยแล้ว"
                    : "บันทึกคะแนนในเครื่องแล้ว (ส่งออนไลน์ไม่สำเร็จ)";
            });
        } else {
            statusElement.textContent = "ส่งคะแนนให้ครูเรียบร้อยแล้ว";
        }
    } else {
        statusElement.textContent = "บันทึกคะแนนเรียบร้อยแล้ว";
    }

    // ทำแบบทดสอบอีกครั้ง → กลับไปหน้ากรอกชื่อ (ข้อมูลเดิมเติมไว้ให้)
    retryButton.addEventListener("click", () => {
        localStorage.removeItem("testResults");
        localStorage.removeItem("testAnswers");
        window.location.href = "./student.html";
    });

    // ดูเฉลยพร้อมวิธีทำ ตามชุดข้อสอบที่ทำ
    document.getElementById("answer-button").addEventListener("click", () => {
        window.location.href = "./testanswer.html";
    });

    // กลับสู่หน้าแรก
    homeButton.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
});
