import React, { useRef, useEffect } from "react";

export default function useCanvas(draw) {
  const canvasRef = useRef();

  const resizeCanvas = (canvas) => {
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      const ctx = canvas.getContext("2d");

      canvas.width = width * ratio;
      canvas.height = height * ratio;

      ctx.scale(ratio, ratio);

      return true;
    }

    return false;
  };

  useEffect(
    (_) => {
      const ctx = canvasRef.current.getContext("2d");

      let frameCount = 0;
      let animationFrameId;

      const render = () => {
        resizeCanvas(ctx.canvas);

        draw(ctx, frameCount);

        frameCount++;
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();

      return () => window.cancelAnimationFrame(animationFrameId);
    },
    [draw],
  );

  return canvasRef;
}
