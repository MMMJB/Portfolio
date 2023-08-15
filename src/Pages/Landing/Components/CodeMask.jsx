import React, { useRef, useState, useEffect } from "react";

import useCanvas from "../../../Hooks/useCanvas";

import interpolateColors from "../../../Utils/interpolateColors";

const colors = ["rgb(224, 153, 50)", "rgb(239, 111, 163)"];

export default function CodeMask({ ...props }) {
  const { styles, text, img, ...rest } = props;

  const [scrollPos, setScrollPos] = useState(0);

  const image = document.getElementById(img);

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px monospace";
    text.split("\n").forEach((t, i) => ctx.fillText(t, 0, 16 * (i + 1)));

    ctx.globalCompositeOperation = "source-atop";

    ctx.fillStyle = interpolateColors(colors[0], colors[1], scrollPos);
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(
      image,
      0,
      0,
      (ctx.canvas.height * image.width) / image.height,
      ctx.canvas.height + 1,
    );

    ctx.globalCompositeOperation = "source-over";
  };

  const canvasRef = useCanvas(draw);

  return <canvas className={styles} ref={canvasRef}></canvas>;
}
