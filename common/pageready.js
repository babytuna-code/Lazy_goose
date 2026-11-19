// pageready.js — อยู่ใน <head> ทุกหน้า: ช่วยให้เปลี่ยนหน้าแล้วไม่กะพริบ
// หน้าเว็บใช้ <link rel="expect" href="#lg-ready" blocking="render"> ให้เบราว์เซอร์รอจนสคริปต์วาดคลื่น/ต้นไม้/เมฆเสร็จก่อนแสดงหน้า
// แต่ Chrome จะเลิกรอทันทีถ้าระหว่างโหลดหน้ามีสคริปต์ใส่ HTML (เช่น <svg>) ด้วย innerHTML / insertAdjacentHTML
// จึงให้ข้อความ HTML ถูกแปลงผ่าน <template> แทน (ผลลัพธ์บนหน้าเหมือนเดิมทุกอย่าง) เฉพาะช่วงที่หน้ากำลังโหลด
(function () {
    if (document.readyState !== "loading" || !window.HTMLTemplateElement) return;
    const HTML_NS = "http://www.w3.org/1999/xhtml";
    const desc = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
    const insAdj = Element.prototype.insertAdjacentHTML;
    if (!desc || !desc.set || !insAdj) return;
    const RAW = /^(SCRIPT|STYLE|TEXTAREA|TITLE|XMP|NOSCRIPT|IFRAME|NOEMBED|NOFRAMES|PLAINTEXT|TEMPLATE)$/;
    const SVG_NS = "http://www.w3.org/2000/svg";
    const needs = (el, v) => typeof v === "string" && v.indexOf("<") >= 0 &&
        ((el.namespaceURI === HTML_NS && !RAW.test(el.tagName)) || el.namespaceURI === SVG_NS);
    // แปลง HTML ผ่าน <template>; ถ้าใส่ในกล่อง SVG ห่อด้วย <svg> เพื่อให้ได้รูปทรง SVG ที่ถูกต้อง
    const frag = (v, inSvg) => {
        const t = document.createElement("template");
        if (!inSvg) { desc.set.call(t, v); return t.content; }
        desc.set.call(t, "<svg>" + v + "</svg>");
        const f = document.createDocumentFragment(), w = t.content.firstChild;
        while (w && w.firstChild) f.appendChild(w.firstChild);
        return f;
    };
    Object.defineProperty(Element.prototype, "innerHTML", {
        configurable: true,
        get() { return desc.get.call(this); },
        set(v) { if (needs(this, v)) this.replaceChildren(frag(v, this.namespaceURI === SVG_NS)); else desc.set.call(this, v); }
    });
    Element.prototype.insertAdjacentHTML = function (pos, v) {
        if (!needs(this, v)) return insAdj.call(this, pos, v);
        const p = String(pos).toLowerCase();
        const inSvg = (p === "afterbegin" || p === "beforeend") ? this.namespaceURI === SVG_NS : !!(this.parentNode && this.parentNode.namespaceURI === SVG_NS);
        const f = frag(v, inSvg);
        if (p === "beforebegin") this.before(f);
        else if (p === "afterbegin") this.prepend(f);
        else if (p === "beforeend") this.append(f);
        else if (p === "afterend") this.after(f);
        else insAdj.call(this, pos, v);
    };
    const outer = Object.getOwnPropertyDescriptor(Element.prototype, "outerHTML");
    if (outer && outer.set) Object.defineProperty(Element.prototype, "outerHTML", {
        configurable: true,
        get() { return outer.get.call(this); },
        set(v) { if (needs(this, v) && this.parentNode) this.replaceWith(frag(v, this.parentNode.namespaceURI === SVG_NS)); else outer.set.call(this, v); }
    });
    // หน้าโหลดเสร็จแล้ว คืนค่าการทำงานปกติของเบราว์เซอร์
    document.addEventListener("DOMContentLoaded", () => {
        Object.defineProperty(Element.prototype, "innerHTML", desc);
        if (outer) Object.defineProperty(Element.prototype, "outerHTML", outer);
        Element.prototype.insertAdjacentHTML = insAdj;
    }, { once: true });
})();
