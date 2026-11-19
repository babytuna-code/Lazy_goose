// =====================================================
// goose.js — เกมห่านผจญภัย (แนวเดินกระโดดเก็บตัวเลข)
//  - พาห่านไปเก็บป้ายตัวเลขที่เป็นคำตอบของโจทย์ด้านบนให้ครบ ประตูจะเปิด แล้วเดินเข้าประตู
//  - ป้ายที่ไม่ใช่คำตอบ: ห่านจะเด้งกลับ / หนาม: กลับไปจุดเริ่ม
//  - เล่นได้ทั้งคีย์บอร์ด (← → / A D, กระโดด: ↑ / W / Space) และปุ่มบนจอ
//  ?ch=ratio | prop | percent
// =====================================================
(function () {
    const F = (a, b) => `<span class="gfrac"><span>${a}</span><span>${b}</span></span>`;
    const B = '<span class="gblank"></span>';
    const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    const pick = arr => arr[rnd(0, arr.length - 1)];
    const gcd = (a, b) => b ? gcd(b, a % b) : a;

    // สุ่มโจทย์ใหม่ทุกครั้งที่เริ่มด่าน (คำตอบเป็นจำนวนเต็ม 1-99)
    function base() {                      // อัตราส่วนอย่างต่ำ a : b กับตัวคูณ k
        let a, b;
        do { a = rnd(1, 9); b = rnd(2, 9); } while (a === b || gcd(a, b) !== 1);
        return [a, b, rnd(2, 5)];
    }
    const GEN = {
        ratio() {
            const [a, b, k] = base();
            return pick([
                [`${a} : ${b} = ${a * k} : ${B}`, b * k],
                [`${a} : ${b} = ${B} : ${b * k}`, a * k],
                [`${B} : ${b * k} = ${a} : ${b}`, a * k],
                [`${a * k} : ${b * k} = ${a} : ${B}`, b]
            ]);
        },
        prop() {
            const [a, b, k] = base();
            return pick([
                [`${F(B, b * k)} = ${F(a, b)}`, a * k],
                [`${F(a, b)} = ${F(a * k, B)}`, b * k],
                [`${F(a * k, B)} = ${F(a, b)}`, b * k],
                [`${F(a, b)} = ${F(B, b * k)}`, a * k]
            ]);
        },
        percent(lv) {
            if (lv === 2 && Math.random() < 0.5) {
                const [x, y, pc] = pick([[1, 2, 50], [1, 4, 25], [3, 4, 75], [1, 5, 20], [2, 5, 40], [3, 5, 60], [4, 5, 80], [1, 10, 10], [3, 10, 30]]);
                return [`${x} : ${y} = ${B}%`, pc];
            }
            const pc = pick(lv === 0 ? [10, 50] : [10, 20, 25, 50, 75]);
            const unit = { 10: 10, 20: 5, 25: 4, 50: 2, 75: 4 }[pc];
            const n = unit * rnd(2, lv === 0 ? 8 : 12);
            return [`${pc}% ของ ${n} = ${B}`, pc * n / 100];
        }
    };

    function makeLevel(chKey, lv, nTiles) {
        const nEq = lv === 0 ? 2 : 3;
        const eqs = [];
        let guard = 0;
        while (eqs.length < nEq && guard++ < 500) {
            const e = GEN[chKey](lv);
            if (e[1] >= 1 && e[1] <= 99 && Number.isInteger(e[1]) && !eqs.some(q => q[1] === e[1])) eqs.push(e);
        }
        const tiles = eqs.map(e => e[1]);
        guard = 0;
        while (tiles.length < nTiles && guard++ < 500) {            // ป้ายหลอก: ค่าใกล้เคียงคำตอบ
            const v = pick(eqs)[1] + pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
            if (v >= 1 && v <= 99 && !tiles.includes(v)) tiles.push(v);
        }
        for (let i = tiles.length - 1; i > 0; i--) { const j = rnd(0, i); [tiles[i], tiles[j]] = [tiles[j], tiles[i]]; }
        return { eqs, tiles };
    }

    const SETS = {
        ratio: { name: "อัตราส่วนที่เท่ากัน", back: "../ratio/ratioans.html" },
        prop: { name: "สัดส่วน", back: "../prop/propans.html" },
        percent: { name: "ร้อยละ", back: "../percent/percentans.html" }
    };
    const LEVELS = 3;

    // แผนที่ 20 x 11 ช่อง : # พื้น, = แท่นลอย, ^ หนาม, P จุดเริ่ม, D ประตู, a-d ป้ายตัวเลข
    const MAPS = [
        [
            "....................",
            "....................",
            "....................",
            "..............b.....",
            "......a.............",
            ".............===....",
            ".....===............",
            "..........===.......",
            ".P......c.......D...",
            "####################",
            "####################"
        ],
        [
            "....................",
            "...a............b...",
            "....................",
            "..===....c.....===..",
            "....................",
            "......=======.......",
            "....................",
            "...===........===...",
            ".P.......d.........D",
            "#######^^####^^#####",
            "####################"
        ],
        [
            "....................",
            ".a................b.",
            "....................",
            "===...c........d.===",
            "....................",
            ".....===......===...",
            "....................",
            ".........====.......",
            ".P.................D",
            "#############^^#####",
            "####################"
        ]
    ];

    const chQ = new URLSearchParams(location.search).get("ch");
    const ch = SETS[chQ] ? chQ : "ratio";
    const SET = SETS[ch];
    const T = 16, COLS = 20, ROWS = 11, W = COLS * T, H = ROWS * T;
    const LINE = "#3b2516";

    const cv = document.getElementById("game");
    const ctx = cv.getContext("2d");
    const eqBox = document.getElementById("eqs");
    const overlay = document.getElementById("gOverlay");
    const oTitle = document.getElementById("gTitle");
    const oText = document.getElementById("gText");
    const oBtn = document.getElementById("gNext");
    document.getElementById("gName").textContent = SET.name;
    document.getElementById("backBtn").addEventListener("click", () => { location.href = SET.back; });

    const sprite = new Image();
    sprite.src = "./goose.png?v=walk1";   // สไปรต์ 5 เฟรม (เดิน 4 + ยืน 1)

    let level = 0, map, tiles, eqs, door, start, p, keys = { l: false, r: false, j: false }, state = "play", shake = 0, mistakes = 0, lives = 3, hurtT = 0, tick = 0, jBuf = 0, jHeld = false, coyote = 0;

    function solid(c, r) {
        if (c < 0 || c >= COLS) return true;
        if (r < 0 || r >= ROWS) return false;
        const k = map[r][c];
        return k === "#" || k === "=";
    }

    function load(n) {
        level = n;
        map = MAPS[n].map(s => s.split(""));
        const L = makeLevel(ch, n, MAPS[n].join("").replace(/[^a-d]/g, "").length);
        tiles = [];
        eqs = L.eqs.map(([html, ans]) => ({ html, ans, done: false, shown: false }));
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
            const k = map[r][c];
            if (k === "P") { start = { x: c * T + 1, y: r * T - 2 }; map[r][c] = "."; }
            else if (k === "D") { door = { x: Math.min(c * T - 2, W - 21), y: r * T - 8, w: 20, h: 24 }; map[r][c] = "."; }
            else if (k >= "a" && k <= "d") { tiles.push({ x: c * T + 1, y: r * T + 1, v: L.tiles[k.charCodeAt(0) - 97], bad: 0, got: false }); map[r][c] = "."; }
        }
        p = { x: start.x, y: start.y + 3, w: 14, h: 15, vx: 0, vy: 0, on: false, dir: 1 };
        lives = MAX_LIVES; hurtT = 0;
        overlay.hidden = true;
        clearFlights();
        drawEqs();
        state = "intro";
        keys.l = keys.r = keys.j = false;
        startIntro(!introShown);
        introShown = true;
    }

    function drawEqs() {
        eqBox.innerHTML = "";
        eqs.forEach(e => {
            const d = document.createElement("div");
            d.className = "geq" + (e.shown ? " done" : "");
            d.innerHTML = e.shown ? e.html.replace('<span class="gblank"></span>', `<span class="gblank ok">${e.ans}</span>`) : e.html;
            eqBox.appendChild(d);
        });
    }

    const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

    // ---------- หัวใจ (ค่าชีวิต) 3 ดวง: ตอบผิด / โดนหนาม / ตกจอ เสีย 1 ดวง  หมดแล้วเริ่มด่านเดิมใหม่ ----------
    const MAX_LIVES = 3;
    function hurt() {
        if (state !== "play") return;
        lives = Math.max(0, lives - 1); hurtT = 40;
        if (lives === 0) gameOver();
    }
    function gameOver() {
        state = "over";
        keys.l = keys.r = keys.j = false;
        oTitle.textContent = "Game over";
        oText.textContent = "";
        oBtn.textContent = "Try again";
        oBtn.onclick = () => load(level);
        overlay.hidden = false;
        oBtn.focus();
    }
    function respawn() { p.x = start.x; p.y = start.y + 3; p.vx = p.vy = 0; shake = 10; hurt(); }

    function step() {
        tick++;
        if (state !== "play") return;
        const sp = 2;
        p.vx = (keys.r ? sp : 0) - (keys.l ? sp : 0);
        if (p.vx) p.dir = p.vx > 0 ? 1 : -1;
        if (keys.j && !jHeld) { jBuf = 8; }
        jHeld = keys.j;
        if (jBuf > 0) jBuf--;
        coyote = p.on ? 6 : Math.max(0, coyote - 1);
        if (jBuf > 0 && coyote > 0) { p.vy = -6.4; p.on = false; jBuf = 0; coyote = 0; }
        p.vy = Math.min(p.vy + 0.35, 7);

        // แกน x
        p.x += p.vx;
        let c0 = Math.floor(p.x / T), c1 = Math.floor((p.x + p.w - 1) / T), r0 = Math.floor(p.y / T), r1 = Math.floor((p.y + p.h - 1) / T);
        for (let r = r0; r <= r1; r++) {
            if (p.vx > 0 && solid(c1, r)) p.x = c1 * T - p.w;
            if (p.vx < 0 && solid(c0, r)) p.x = (c0 + 1) * T;
        }
        // แกน y
        p.y += p.vy;
        p.on = false;
        c0 = Math.floor(p.x / T); c1 = Math.floor((p.x + p.w - 1) / T); r0 = Math.floor(p.y / T); r1 = Math.floor((p.y + p.h - 1) / T);
        for (let c = c0; c <= c1; c++) {
            if (p.vy > 0 && solid(c, r1)) { p.y = r1 * T - p.h; p.vy = 0; p.on = true; }
            if (p.vy < 0 && solid(c, r0)) { p.y = (r0 + 1) * T; p.vy = 0; }
        }
        if (p.y > H + 40) respawn();

        // หนาม
        const fr = Math.floor((p.y + p.h - 3) / T);
        for (let c = Math.floor((p.x + 3) / T); c <= Math.floor((p.x + p.w - 4) / T); c++) {
            if (fr >= 0 && fr < ROWS && c >= 0 && c < COLS && map[fr][c] === "^") { respawn(); break; }
        }

        // ป้ายตัวเลข
        tiles.forEach(t => {
            if (t.got) return;
            if (t.bad > 0) { t.bad--; return; }
            if (!hit(p, { x: t.x, y: t.y, w: 14, h: 14 })) return;
            const e = eqs.find(q => !q.done && q.ans === t.v);
            if (e) { e.done = true; t.got = true; flyTo(t, e); }
            else { t.bad = 50; mistakes++; shake = 8; p.vy = -3.5; p.x -= p.dir * 10; hurt(); }
        });

        // ประตู
        if (eqs.every(e => e.done) && hit(p, { x: door.x + 6, y: door.y + 6, w: 8, h: 18 })) win();
    }

    function win() {
        state = "win";
        const last = level === LEVELS - 1;
        oTitle.textContent = last ? "เก่งมาก !" : "ผ่านด่าน !";
        oText.textContent = last ? "ผ่านครบทุกด่านแล้ว" : `ไปต่อด่าน ${level + 2}`;
        oBtn.textContent = last ? "เล่นอีกครั้ง" : "ด่านถัดไป";
        oBtn.onclick = () => load(last ? 0 : level + 1);
        overlay.hidden = false;
        oBtn.focus();
    }

    // ---------- วาด (พิกเซลอาร์ต) ----------
    // วาดทุกอย่างลงบัฟเฟอร์ความละเอียดต่ำ 320x176 ด้วยพิกัดจำนวนเต็ม (ไม่มีขอบเบลอ)
    // แล้วขยายขึ้นจอจริงแบบ nearest-neighbour → พิกเซลคมชัดทุกขนาดจอ ไม่แตก
    const buf = document.createElement("canvas");
    buf.width = W; buf.height = H;
    const g = buf.getContext("2d");
    function fit() {
        const dpr = Math.min(window.devicePixelRatio || 1, 3);
        const cssW = cv.clientWidth || W;
        const w = Math.max(W, Math.round(cssW * dpr));
        if (cv.width !== w) { cv.width = w; cv.height = Math.round(w * H / W); }
    }
    addEventListener("resize", fit);
    if (window.ResizeObserver) new ResizeObserver(fit).observe(cv);

    const px = (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(x | 0, y | 0, w, h); };
    const GRASS = "#01a662", GRASS_D = "#018c55";

    // ตัวเลขพิกเซล 3x5
    const DIGITS = ["111101101101111", "010110010010111", "111001111100111", "111001111001111", "101101111001001",
        "111100111001111", "111100111101111", "111001001001001", "111101111101111", "111101111001111"];
    function num(text, x, y, c) {
        g.fillStyle = c;
        for (const ch of String(text)) {
            const d = DIGITS[+ch];
            if (d) for (let i = 0; i < 15; i++) if (d[i] === "1") g.fillRect(x + (i % 3), y + ((i / 3) | 0), 1, 1);
            x += 4;
        }
    }
    const HEART = [".XX.XX.", "XXXXXXX", "XXXXXXX", ".XXXXX.", "..XXX..", "...X..."];
    function bitmap(rows, x, y, c) {
        g.fillStyle = c;
        rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] === "X") g.fillRect(x + i, y + j, 1, 1); });
    }
    function heart(x, y, full) {
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => bitmap(HEART, x + dx, y + dy, LINE));
        bitmap(HEART, x, y, full ? "#e5432f" : "#fff");
        if (full) px(x + 1, y + 1, 1, 1, "#ff9a8c");
    }

    function draw() {
        g.clearRect(0, 0, W, H);

        // พื้นและแท่นลอย
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
            const k = map[r][c], x = c * T, y = r * T;
            if (k !== "#" && k !== "=") continue;
            px(x, y, T, T, k === "=" ? "#f7c6cf" : "#e9a95c");
            if (k === "#") { px(x + 3, y + 10, 2, 2, "#d48a3e"); px(x + 10, y + 6, 2, 2, "#d48a3e"); px(x + 12, y + 12, 1, 1, "#d48a3e"); }
            else { px(x + 3, y + 10, 2, 2, "#fff"); px(x + 11, y + 10, 2, 2, "#fff"); }
            if (!solid(c, r - 1)) {                                    // หญ้าด้านบน ขอบหยักแบบพิกเซล
                px(x, y, T, 4, GRASS);
                for (let i = 0; i < T; i += 4) { px(x + i, y + 4, 2, 2, GRASS); px(x + i + 2, y + 4, 2, 1, GRASS); }
                px(x, y + 1, T, 1, GRASS_D);
            }
            // เส้นขอบ 1 พิกเซลรอบก้อนพื้น
            if (!solid(c, r - 1)) px(x, y, T, 1, LINE);
            if (r === ROWS - 1 || !solid(c, r + 1)) px(x, y + T - 1, T, 1, LINE);
            if (c === 0 || !solid(c - 1, r)) px(x, y, 1, T, LINE);
            if (c === COLS - 1 || !solid(c + 1, r)) px(x + T - 1, y, 1, T, LINE);
        }

        // หนาม (สามเหลี่ยมขั้นบันได)
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
            if (map[r][c] !== "^") continue;
            for (let i = 0; i < 2; i++) {
                const sx = c * T + i * 8, by = r * T + T;
                [8, 6, 4, 2].forEach((w, k) => {
                    const x = sx + k, y = by - 2 * (k + 1);
                    px(x, y, w, 2, LINE);
                    if (w > 2) px(x + 1, y, w - 2, 2, k === 2 ? "#e5432f" : "#fffdf7");
                });
            }
        }

        // ประตู (ซุ้มโค้งขั้นบันได)
        const open = eqs.every(e => e.done);
        const dx = door.x | 0, dy = door.y | 0;
        const arch = (inset, c) => {
            const rows = [[5, 10], [3, 14], [2, 16], [1, 18]];
            rows.forEach(([ox, w], j) => { if (w - inset * 2 > 0) px(dx + ox + inset, dy + j + inset, w - inset * 2, 1, c); });
            px(dx + 1 + inset, dy + 4 + inset, 18 - inset * 2, 20 - inset, c);
        };
        arch(0, LINE); arch(1, "#ffe08a"); arch(3, LINE); arch(4, open ? "#bfe4b0" : "#e5432f");
        if (open) {                                                    // ลูกศรชี้เข้า
            const ay = dy + 13 + (((tick / 16) | 0) % 2);
            px(dx + 6, ay, 7, 1, LINE); px(dx + 11, ay - 1, 1, 3, LINE); px(dx + 10, ay - 2, 1, 5, LINE);
        } else {                                                       // รูกุญแจ
            px(dx + 8, dy + 10, 4, 4, "#fff"); px(dx + 9, dy + 9, 2, 1, "#fff"); px(dx + 9, dy + 14, 2, 4, "#fff");
        }

        // ป้ายตัวเลข
        tiles.forEach((t, i) => {
            if (t.got) return;
            const txt = String(t.v), tw = txt.length * 4 - 1;
            const w = Math.max(14, tw + 6), x = (t.x + 7 - w / 2) | 0;
            const y = (t.y + Math.round(Math.sin((tick + i * 20) / 18) * 1.5)) | 0;
            const bad = t.bad > 0;
            px(x + 1, y + 2, w, 13, LINE);                              // เงา
            px(x + 1, y, w - 2, 14, LINE); px(x, y + 1, w, 12, LINE);    // ขอบ (ตัดมุม)
            px(x + 1, y + 1, w - 2, 12, bad ? "#f9b9b0" : "#fff");
            px(x + 1, y + 10, w - 2, 3, bad ? "#e5432f" : "#ffe08a");
            num(txt, x + ((w - tw) >> 1), y + 3, LINE);
        });

        // ห่าน: เดิน = วนเฟรมก้าวเท้า 4 เฟรม, ลอยกลางอากาศ = เฟรมก้าวยาว, ยืนนิ่ง = เฟรมยืน
        // ยืนบนพื้น: ใช้ค่า coyote กันสถานะ "ลอย/แตะพื้น" สลับกันระหว่างยืนนิ่ง (เท้าจะได้ไม่ขยับเอง)
        const grounded = p.on || coyote >= 4;
        const fr = !grounded ? 0 : (p.vx ? ((tick / 5) | 0) % 4 : 4);
        const gx = Math.round(p.x + p.w / 2), gy = Math.round(p.y + p.h - 22);
        g.save();
        g.translate(gx, gy);
        if (p.dir < 0) g.scale(-1, 1);
        if (sprite.complete && sprite.naturalWidth) g.drawImage(sprite, fr * 28, 0, 28, 22, -14, 0, 28, 22);
        else px(-7, 4, 14, 18, "#fff");
        g.restore();

        // หัวใจ 3 ดวงเหนือหัวห่าน: แดง = ยังเหลือ, ขาว = เสียไปแล้ว
        if (hurtT > 0) hurtT--;
        const hx = Math.max(14, Math.min(W - 14, gx));
        const hy = Math.max(2, gy - 9) + (hurtT > 0 && ((hurtT / 4) | 0) % 2 ? 1 : 0);
        for (let i = 0; i < MAX_LIVES; i++) heart(hx - 12 + i * 9, hy, i < lives);

        // ขยายขึ้นจอจริงแบบไม่เกลี่ยสี
        let ox = 0, oy = 0;
        if (shake > 0) { ox = Math.round((Math.random() - 0.5) * 3); oy = Math.round((Math.random() - 0.5) * 3); shake--; }
        const k = cv.width / W;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(buf, 0, 0, W, H, Math.round(ox * k), Math.round(oy * k), cv.width, cv.height);
    }

    // =====================================================
    // เริ่มด่าน: สอนเล่น (ครั้งแรกที่เปิดเกม) + วงกลมที่ตัวห่านขยายออกจนหายไป
    // =====================================================
    let introShown = false, tut = null, tutDone = null;
    const NS = "http://www.w3.org/2000/svg";
    const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia && matchMedia("(hover: none), (pointer: coarse)").matches;

    function scr() { const r = cv.getBoundingClientRect(); return { r, k: r.width / W }; }
    function gooseCircle() {
        const { r, k } = scr();
        return { x: r.left + (p.x + p.w / 2) * k, y: r.top + (p.y + p.h - 15) * k, rad: 19 * k + 10 };
    }
    function mk(tag, cls, parent) { const e = document.createElement(tag); if (cls) e.className = cls; if (parent) parent.appendChild(e); return e; }
    function svgEl(tag, attrs, parent) { const e = document.createElementNS(NS, tag); for (const a in attrs) e.setAttribute(a, attrs[a]); if (parent) parent.appendChild(e); return e; }

    function startIntro(withTips) {
        if (tut) { tut.remove(); tut = null; }
        const root = mk("div", "gg-tut" + (withTips ? " tips" : ""), document.body);
        const svg = svgEl("svg", { class: "gg-tut-svg", "aria-hidden": "true" }, root);
        const mask = svgEl("mask", { id: "ggTutMask", maskUnits: "userSpaceOnUse" }, svgEl("defs", {}, svg));
        const mBg = svgEl("rect", { fill: "#fff" }, mask);
        const holes = svgEl("g", { fill: "#000" }, mask);
        const hole = svgEl("circle", { fill: "#000" }, mask);
        const dim = svgEl("rect", { class: "gg-tut-dim", mask: "url(#ggTutMask)" }, svg);
        const lines = svgEl("g", { class: "gg-tut-lines" }, svg);
        const ring = svgEl("circle", { class: "gg-tut-ring" }, svg);
        const T = { root, svg, mBg, holes, hole, dim, lines, ring, tips: [], rad: 0, withTips };
        tut = T;

        if (withTips) {
            const add = (txt, target, shape) => { const d = mk("div", "gg-tip", root); d.innerHTML = txt; T.tips.push({ d, target, shape }); };
            add("<b>หัวใจ 3 ดวง</b> <i>เลือกคำตอบผิด</i><i>หรือชนสิ่งกีดขวาง</i> <i>จะเสียหัวใจ 1 ดวง</i>", () => { const c = gooseCircle(); return { left: c.x - c.rad, top: c.y - c.rad, right: c.x + c.rad, bottom: c.y + c.rad }; }, "circle");
            add("<b>โจทย์</b> <i>หาคำตอบ</i><i>ที่ต้องเติม</i><i>ในช่องว่าง</i>", () => { const rs = [...eqBox.children].map(e => e.getBoundingClientRect()); return { left: Math.min(...rs.map(r => r.left)), top: Math.min(...rs.map(r => r.top)), right: Math.max(...rs.map(r => r.right)), bottom: Math.max(...rs.map(r => r.bottom)) }; }, "rect");
            add("<b>คำตอบ</b> <i>เลือกเก็บตัวเลข</i><i>ที่เป็นคำตอบ</i>", () => { const t = tiles.slice().sort((a, b) => (b.y - a.y) || (Math.abs(a.x - W / 2) - Math.abs(b.x - W / 2)))[0], { r, k } = scr(); return { left: r.left + (t.x - 4) * k, top: r.top + (t.y - 3) * k, right: r.left + (t.x + 18) * k, bottom: r.top + (t.y + 17) * k }; }, "rect");
            add("<b>ประตู</b> <i>เก็บคำตอบครบ</i> <i>ประตูจะเปิด</i>", () => { const { r, k } = scr(); return { left: r.left + (door.x - 2) * k, top: r.top + (door.y - 2) * k, right: r.left + (door.x + door.w + 2) * k, bottom: r.top + (door.y + door.h + 1) * k }; }, "rect");
            add("<b>◀ ▶</b> เดิน &nbsp; <b>▲</b> กระโดด" + (isTouch ? "" : "<br><small>หรือใช้ปุ่มลูกศรบนคีย์บอร์ด</small>"), () => document.querySelector(".gg-move").getBoundingClientRect(), "keys");
            const go = mk("button", "gg-go", root);
            go.type = "button"; go.textContent = "เริ่มเล่น !";
            T.go = go;
            go.addEventListener("click", e => { e.stopPropagation(); reveal(); });
            root.addEventListener("pointerdown", e => { if (e.target !== go) { e.preventDefault(); reveal(); } });
            tutDone = reveal;
            layoutTut();
            setTimeout(() => { try { go.focus({ preventScroll: true }); } catch (_) {} }, 50);
        } else {
            layoutTut();
            T.rad = gooseCircle().rad * 0.75;
            setTimeout(reveal, 280);
        }
    }

    function rectOf(o) { return { left: o.left, top: o.top, right: o.right, bottom: o.bottom, width: o.right - o.left, height: o.bottom - o.top }; }
    function overlap(a, b, pad) { return a.left < b.right + pad && a.right > b.left - pad && a.top < b.bottom + pad && a.bottom > b.top - pad; }

    function layoutTut() {
        const T = tut; if (!T) return;
        const vw = innerWidth, vh = innerHeight;
        [T.svg, T.mBg, T.dim].forEach(e => { e.setAttribute("width", vw); e.setAttribute("height", vh); });
        T.svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);
        const c = gooseCircle();
        if (!T.rad || T.withTips) T.rad = c.rad;
        T.hole.setAttribute("cx", c.x); T.hole.setAttribute("cy", c.y); T.hole.setAttribute("r", T.rad);
        T.ring.setAttribute("cx", c.x); T.ring.setAttribute("cy", c.y); T.ring.setAttribute("r", T.rad);
        T.holes.textContent = ""; T.lines.textContent = "";
        if (!T.withTips) return;

        const placed = [];
        const targets = T.tips.map(t => rectOf(t.target()));
        // ปุ่มเริ่มเล่น: ใต้ปุ่มควบคุม ถ้าไม่มีที่ว่าง ใช้กลางฉากเกม
        const { r } = scr(), pr = rectOf(document.querySelector(".gg-pad").getBoundingClientRect());
        const gw = T.go.offsetWidth, gh = T.go.offsetHeight;
        const spots = [[vw / 2 - gw / 2, pr.bottom + 18], [r.left + r.width / 2 - gw / 2, r.top + r.height * 0.35 - gh / 2],
            [r.left + r.width / 2 - gw / 2, r.top + r.height * 0.15], [r.left + r.width * 0.3 - gw / 2, r.top + r.height * 0.35]];
        let gpos = spots[1];
        for (const [x, y] of spots) {
            const box = { left: x, top: y, right: x + gw, bottom: y + gh };
            if (y + gh > vh - 8 || targets.some(o => overlap(box, o, 4))) continue;
            gpos = [x, y]; break;
        }
        T.go.style.left = gpos[0] + "px"; T.go.style.top = gpos[1] + "px";
        placed.push({ left: gpos[0], top: gpos[1], right: gpos[0] + gw, bottom: gpos[1] + gh });
        T.tips.forEach((t, i) => {
            const tr = targets[i];
            if (t.shape === "rect") svgEl("rect", { x: tr.left - 4, y: tr.top - 4, width: tr.width + 8, height: tr.height + 8, rx: 14 }, T.holes);
            if (t.shape === "keys") document.querySelectorAll(".gg-key").forEach(k => { const q = k.getBoundingClientRect(); svgEl("circle", { cx: q.left + q.width / 2, cy: q.top + q.height / 2, r: q.width / 2 + 6 }, T.holes); });
            const w = t.d.offsetWidth, h = t.d.offsetHeight, cx = (tr.left + tr.right) / 2, cy = (tr.top + tr.bottom) / 2;
            let best = null, bestD = 1e9;
            for (const gap of [26, 16, 8]) {
                const cands = [
                    [cx - w / 2, tr.bottom + gap], [cx - w / 2, tr.top - gap - h],
                    [tr.right - w, tr.top - gap - h], [tr.left, tr.top - gap - h], [tr.right - w, tr.bottom + gap], [tr.left, tr.bottom + gap],
                    [cx - w + 18, tr.top - gap - h], [cx - 18, tr.top - gap - h],
                    [tr.right + gap, cy - h / 2], [tr.left - gap - w, cy - h / 2],
                    [tr.right + gap, tr.bottom + gap * 0.6], [tr.left - gap - w, tr.bottom + gap * 0.6],
                    [tr.right + gap, tr.top - gap * 0.6 - h], [tr.left - gap - w, tr.top - gap * 0.6 - h]
                ];
                for (let [x, y] of cands) {
                    x = Math.max(8, Math.min(vw - 8 - w, x));
                    if (y < 6 || y + h > vh - 6) continue;
                    const box = { left: x, top: y, right: x + w, bottom: y + h };
                    if (placed.some(b => overlap(box, b, 6))) continue;
                    if (targets.some(o => overlap(box, o, 2))) continue;
                    const d = Math.hypot(x + w / 2 - cx, y + h / 2 - cy) + gap;
                    if (d < bestD) { bestD = d; best = box; }
                }
            }
            if (!best) {   // หาที่ว่างไม่ได้: วางใต้เป้าหมาย ยอมทับเป้าหมายอื่นได้ (แต่ไม่ทับป้ายคำอธิบายอื่น)
                for (let y = 6; y + h < vh - 6 && !best; y += 8) {
                    const x = Math.max(8, Math.min(vw - 8 - w, cx - w / 2));
                    const box = { left: x, top: y, right: x + w, bottom: y + h };
                    if (!placed.some(b => overlap(box, b, 4))) best = box;
                }
                best = best || { left: 8, top: 8, right: 8 + w, bottom: 8 + h };
            }
            placed.push(best);
            t.d.style.left = best.left + "px"; t.d.style.top = best.top + "px";
            // เส้นโยงจากป้ายคำอธิบายไปยังเป้าหมาย
            const bx = Math.max(best.left, Math.min(cx, best.right)), by = Math.max(best.top, Math.min(cy, best.bottom));
            let ex = Math.max(tr.left, Math.min(bx, tr.right)), ey = Math.max(tr.top, Math.min(by, tr.bottom));
            if (t.shape === "circle") { const a = Math.atan2(by - cy, bx - cx), rr = tr.width / 2; ex = cx + Math.cos(a) * rr; ey = cy + Math.sin(a) * rr; }
            if (Math.hypot(ex - bx, ey - by) > 4) svgEl("line", { x1: bx, y1: by, x2: ex, y2: ey }, T.lines);
        });
    }
    addEventListener("resize", () => { if (tut && !tut.going) layoutTut(); });

    function reveal() {
        const T = tut; if (!T || T.going) return;
        T.going = true; tutDone = null;
        T.root.classList.add("going");
        T.holes.textContent = ""; T.lines.textContent = "";
        const c = gooseCircle();
        const far = Math.max(...[[0, 0], [innerWidth, 0], [0, innerHeight], [innerWidth, innerHeight]].map(([x, y]) => Math.hypot(x - c.x, y - c.y))) + 20;
        const r0 = T.rad, t0 = performance.now(), dur = reduceMotion ? 1 : 750;
        (function anim(now) {
            const u = Math.min(1, (now - t0) / dur), e = u * u * (3 - 2 * u);
            const rad = r0 + (far - r0) * (u < 0.18 ? -0.06 * Math.sin(u / 0.18 * Math.PI) : e);
            T.hole.setAttribute("r", Math.max(0, rad)); T.ring.setAttribute("r", Math.max(0, rad));
            if (u < 1) requestAnimationFrame(anim);
            else { T.root.remove(); if (tut === T) tut = null; state = "play"; }
        })(t0);
    }

    // =====================================================
    // เก็บคำตอบได้: ป้ายลอยไปเติมในช่องว่างของโจทย์ พร้อมหางแสง
    // =====================================================
    const flights = [];
    function clearFlights() { flights.splice(0).forEach(f => { f.dead = true; f.el.remove(); }); document.querySelectorAll(".gg-trail").forEach(e => e.remove()); }
    function flyTo(t, e) {
        const idx = eqs.indexOf(e);
        const blank = eqBox.children[idx] && eqBox.children[idx].querySelector(".gblank");
        const done = () => { e.shown = true; drawEqs(); const b = eqBox.children[idx] && eqBox.children[idx].querySelector(".gblank.ok"); if (b) b.classList.add("pop"); };
        if (!blank || reduceMotion) { done(); return; }
        const { r, k } = scr();
        const sx = r.left + (t.x + 7) * k, sy = r.top + (t.y + 7) * k;
        const br = blank.getBoundingClientRect(), ex = br.left + br.width / 2, ey = br.top + br.height / 2;
        const el = mk("div", "gg-fly", document.body);
        el.textContent = t.v;
        el.style.fontSize = Math.max(14, Math.min(24, 9 * k)) + "px";
        const f = { el, dead: false };
        flights.push(f);
        const t0 = performance.now(), dur = 560;
        let lx = sx, ly = sy;
        (function anim(now) {
            if (f.dead) return;
            const u = Math.min(1, (now - t0) / dur);
            const e2 = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
            const x = sx + (ex - sx) * e2, y = sy + (ey - sy) * e2 - Math.sin(u * Math.PI) * 40;
            el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${1 + Math.sin(u * Math.PI) * 0.25})`;
            // หางแสง: เส้นสีขาวจากตำแหน่งก่อนหน้า ค่อย ๆ จางหาย
            const len = Math.hypot(x - lx, y - ly);
            if (len > 1) {
                const tr = mk("div", "gg-trail", document.body);
                tr.style.width = (len + 10) + "px";
                tr.style.transform = `translate(${lx}px, ${ly}px) rotate(${Math.atan2(y - ly, x - lx)}rad) translateY(-50%)`;
                setTimeout(() => tr.remove(), 380);
            }
            lx = x; ly = y;
            if (u < 1) requestAnimationFrame(anim);
            else { el.remove(); const i = flights.indexOf(f); if (i >= 0) flights.splice(i, 1); done(); }
        })(t0);
    }

    // ---------- ควบคุม ----------
    const KEY = { ArrowLeft: "l", a: "l", A: "l", ArrowRight: "r", d: "r", D: "r", ArrowUp: "j", w: "j", W: "j", " ": "j" };
    addEventListener("keydown", e => { if (tutDone && state === "intro" && (KEY[e.key] || e.key === "Enter")) { e.preventDefault(); tutDone(); return; } const k = KEY[e.key]; if (k && state === "play") { keys[k] = true; if (k === "j" && !e.repeat) jBuf = 8; e.preventDefault(); } });
    addEventListener("keyup", e => { const k = KEY[e.key]; if (k) keys[k] = false; });
    document.querySelectorAll("[data-key]").forEach(b => {
        const k = b.dataset.key;
        const on = e => { e.preventDefault(); keys[k] = true; b.classList.add("down"); };
        const off = e => { e.preventDefault(); keys[k] = false; b.classList.remove("down"); };
        b.addEventListener("pointerdown", on);
        ["pointerup", "pointerleave", "pointercancel"].forEach(n => b.addEventListener(n, off));
        b.addEventListener("contextmenu", e => e.preventDefault());
    });
    document.getElementById("gRestart").addEventListener("click", () => load(level));
    addEventListener("blur", () => { keys.l = keys.r = keys.j = false; });

    // ---------- วนเกม (60 ครั้ง/วินาที) ----------
    let last = performance.now(), acc = 0;
    function loop(now) {
        acc += Math.min(now - last, 100); last = now;
        while (acc >= 1000 / 60) { step(); acc -= 1000 / 60; }
        draw();
        requestAnimationFrame(loop);
    }
    window.__goose = { get p() { return p; }, get eqs() { return eqs; }, get tiles() { return tiles; }, get door() { return door; }, get state() { return state; }, get lives() { return lives; }, get coyote() { return coyote; }, keys, load };

    // จอกว้างแนวนอน: ย้ายแถวปุ่มควบคุมเข้าไปในฉาก (CSS วางไว้ข้างซ้าย/ขวาของฉาก) / จออื่น: อยู่ใต้ฉากตามเดิม
    (function placePad() {
        const pad = document.querySelector(".gg-pad"), stage = document.querySelector(".gg-stage");
        if (!pad || !stage || !window.matchMedia) return;
        const mq = window.matchMedia("(min-width: 760px) and (min-aspect-ratio: 5/4)");
        const home = stage.parentNode;
        const apply = () => {
            if (mq.matches) { if (pad.parentNode !== stage) stage.appendChild(pad); }
            else if (pad.parentNode !== home) home.appendChild(pad);
            if (typeof fit === "function") fit();
        };
        apply();
        if (mq.addEventListener) mq.addEventListener("change", apply); else if (mq.addListener) mq.addListener(apply);
    })();
    load(0);
    fit();
    requestAnimationFrame(loop);
})();
