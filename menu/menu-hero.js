// ห่านเดินจากขอบซ้ายของปุ่มแดงไปทางขวา ตัวอักษร Lazy Goose ค่อย ๆ ปรากฏด้านหลังห่านทีละตัว
// ความเร็วเดิน = ระยะก้าว 1 รอบ (4 เฟรม x 170ms ของ goose.gif) → เท้าไม่ไถลบนพื้น
(function () {
    const hero = document.querySelector(".menu-hero");
    const title = hero && hero.querySelector(".menu-title");
    const goose = hero && hero.querySelector(".mh-goose");
    const btns = document.querySelector(".menu-buttons .menu-btn") || document.querySelector(".menu-buttons");
    if (!hero || !title || !goose || !btns) return;
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0, start = 0, end = 0, started = false, last = 0, done = false;

    function measure() {
        const br = btns.getBoundingClientRect();
        // กว้างพอให้ทั้งชื่อและห่านอยู่ในจอ เริ่มจากขอบซ้ายของปุ่มแดง
        const gw = goose.getBoundingClientRect().width || 300;
        const tw = title.scrollWidth;
        const visW = gw * 0.56;                                  // ส่วนที่มองเห็นของห่านใน GIF
        const gap = gw * 0.02;
        // ชื่อ + ห่าน อยู่กึ่งกลางจอ (สมดุลซ้ายขวา) ห่านเริ่มเดินจากขอบซ้ายของปุ่มแดง
        hero.style.setProperty("--hero-w", (tw + gap + visW) + "px");
        hero.style.marginLeft = hero.style.marginRight = "auto";
        const hl = hero.getBoundingClientRect().left;
        start = Math.min(0, br.left - hl);
        end = tw + gap;
        return { visW };
    }

    function set(px) {
        hero.style.setProperty("--gx", px + "px");
        hero.style.setProperty("--rev", Math.max(0, px - 2) + "px");     // ตัวอักษรปรากฏเท่าที่ห่านเดินผ่านมา
    }

    function run() {
        if (started) return;
        started = true;
        const { visW } = measure();
        if (reduce) { x = end; set(end); done = true; return; }
        const speed = (visW * 0.36) / 0.68;                      // px/วินาที: ก้าว 1 รอบเดินได้ ~36% ของลำตัว
        x = start; set(x);
        last = performance.now();
        (function tick(now) {
            x = Math.min(end, x + speed * (now - last) / 1000);
            last = now;
            set(x);
            if (x < end) requestAnimationFrame(tick); else done = true;
        })(last);
    }

    addEventListener("resize", () => { measure(); if (done) set(end); });
    const imgs = [...title.querySelectorAll("img"), goose];
    let left = imgs.length;
    const ready = () => { if (--left <= 0) run(); };
    imgs.forEach(im => (im.complete ? ready() : (im.addEventListener("load", ready), im.addEventListener("error", ready))));
    setTimeout(run, 1500);       // กันกรณีภาพโหลดช้า
})();
