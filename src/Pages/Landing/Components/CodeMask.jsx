import React from "react";

import useCanvas from "../../../Hooks/useCanvas";

import chars from "../../../Utils/chars";

const hoverSize = 96;
const threshold = 1.5;

export default function CodeMask({ ...props }) {
  const { styles, text, img, hoverImg, ...rest } = props;

  const image = document.getElementById(img);
  const hoverImage = document.getElementById(hoverImg) || image;

  const maskText = Array.from(text.split("\n"), (e) => e.split(""));
  const hoverText = Array.from(
    text,
    (e) => (e === "\n" && e) || chars[Math.floor(Math.random() * chars.length)],
  )
    .join("")
    .split("\n");

  const getStyle = (property) => document.body.style.getPropertyValue(property);

  const withinBox = (x, y, box) => {
    return x > box.left && y > box.top && x < box.right && y < box.bottom;
  };

  const distFromCircle = (x, y, cx, cy, r) => {
    return Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2)) - r;
  };

  const easeOutQuat = (t) => t * (2 - t);
  const clamp = (min, v, max) => Math.min(max, Math.max(min, v));

  const drawMaskImage = (ctx, hover = false) => {
    const img = hover ? hoverImage : image;

    ctx.drawImage(
      img,
      0,
      0,
      (img.width / img.height) * ctx.canvas.height,
      ctx.canvas.height + 1,
    );
  };

  const drawBackground = (ctx, mX, mY, mS, s) => {
    const start = Date.now();

    ctx.globalCompositeOperation = "destination-over";

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px monospace";

    const distFromMouse = (x, y) => distFromCircle(x, y, mX, mY, mS);

    // text.split("\n").forEach((t, i) => ctx.fillText(t, 0, 16 * (i + 1)));
    maskText.forEach((l, li) => {
      let line = "";

      l.forEach((t, ci) => {
        const cX = 7 * ci - 12;
        const cY = 12 * (li + 1) - 3;

        const d = clamp(0, distFromMouse(cX, cY) / 10, threshold);

        const scroll = (l.length - ci + Math.floor(s / 2)) % l.length;
        // const scroll = ci;
        const text = (d !== threshold && hoverText[li][scroll]) || l[scroll];

        line += text;
        // ctx.fillText(text, cX, cY);
      });

      ctx.fillText(line, 0, 12 * (li + 1));
    });

    ctx.globalCompositeOperation = "source-in";

    drawMaskImage(ctx);

    ctx.globalCompositeOperation = "source-over";
  };

  const drawMouseMask = (ctx, x, y, size) => {
    drawMaskImage(ctx, true);

    ctx.globalCompositeOperation = "source-in";

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = "source-over";
  };

  const draw = (ctx, state, f) => {
    const { left, right, top, bottom } = state;

    const ox = parseInt(getStyle("--mX") || 0);
    const oy = parseInt(getStyle("--mY") || 0);
    const x = /*clamp(left, ox, right)*/ ox - left + 4;
    const y = /*clamp(top, oy, bottom)*/ oy - top + 4;

    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    if (state["en_f"] === undefined && withinBox(ox, oy, state)) {
      state["ex_f"] = undefined;
      state["en_f"] = f;
    } else if (state["en_f"] !== undefined && !withinBox(ox, oy, state)) {
      state["en_f"] = undefined;
      state["ex_f"] = f;
    }

    ctx.clearRect(0, 0, w, h);

    const elapsed = state["en_f"] ? f - state["en_f"] : f - state["ex_f"] || 0;
    const frames = 10;

    const maskScale = state["en_f"]
      ? elapsed <= frames
        ? easeOutQuat(elapsed / frames) * hoverSize
        : hoverSize
      : state["ex_f"]
      ? elapsed <= frames
        ? hoverSize - easeOutQuat(elapsed / frames) * hoverSize
        : 0
      : 0;

    drawMouseMask(ctx, x, y, maskScale);
    drawBackground(ctx, x, y, maskScale, f);

    // ctx.strokeStyle = "#1D2731";
    // ctx.lineWidth = 2;
    // ctx.stroke();

    return state;
  };

  const canvasRef = useCanvas(draw);

  return <canvas id="maskImg" className={styles} ref={canvasRef}></canvas>;
}
