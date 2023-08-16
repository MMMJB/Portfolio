import React, { useRef, useState, useEffect } from "react";

import useCanvas from "../../../Hooks/useCanvas";

import interpolateColors from "../../../Utils/interpolateColors";

const colors = ["rgb(224, 153, 50)", "rgb(239, 111, 163)"];

export default function CodeMask({ ...props }) {
  const { styles, text, img, ...rest } = props;

  const [scrollPos, setScrollPos] = useState(0);

  const image = document.getElementById(img);

  const getStyle = (property) => document.body.style.getPropertyValue(property);

  const withinBox = (x, y, box) => {
    return x > box.left && y > box.top && x < box.right && y < box.bottom;
  };

  const easeOutQuat = (t) => t * (2 - t);
  const clamp = (min, v, max) => Math.min(max, Math.max(min, v));

  const drawMaskImage = (ctx) => {
    ctx.fillStyle = interpolateColors(colors[0], colors[1], scrollPos);
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(
      image,
      0,
      0,
      (image.width / image.height) * ctx.canvas.height,
      ctx.canvas.height + 1,
    );
  };

  const drawBackground = (ctx) => {
    ctx.globalCompositeOperation = "destination-over";

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px monospace";
    text.split("\n").forEach((t, i) => ctx.fillText(t, 0, 16 * (i + 1)));

    ctx.globalCompositeOperation = "source-atop";

    drawMaskImage(ctx);

    ctx.globalCompositeOperation = "source-over";
  };

  const drawMouseMask = (ctx, x, y, size) => {
    drawMaskImage(ctx);

    ctx.globalCompositeOperation = "destination-in";

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  };

  const draw = (ctx, state, f) => {
    const { left, right, top, bottom } = state;

    const ox = parseInt(getStyle("--mX") || 0);
    const oy = parseInt(getStyle("--mY") || 0);

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
        ? easeOutQuat(elapsed / frames) * 64
        : 64
      : state["ex_f"]
      ? elapsed <= frames
        ? 64 - easeOutQuat(elapsed / frames) * 64
        : 0
      : 0;

    drawMouseMask(
      ctx,
      clamp(left, ox, right) - left,
      clamp(top, oy, bottom) - top,
      maskScale,
    );
    drawBackground(ctx);

    ctx.strokeStyle = "#1D2731";
    ctx.lineWidth = 2;
    ctx.stroke();

    return state;
  };

  const canvasRef = useCanvas(draw);

  return <canvas className={styles} ref={canvasRef}></canvas>;
}
