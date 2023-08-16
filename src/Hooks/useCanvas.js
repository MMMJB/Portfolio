import React, { useRef, useEffect } from "react";

export default function useCanvas(draw) {
  const canvasRef = useRef();

  const resizeCanvas = (canvas) => {
    const { width, height, left, right, top, bottom } =
      canvas.getBoundingClientRect();

    if (
      canvas.width !== Math.floor(width) ||
      canvas.height !== Math.floor(height)
    ) {
      const { devicePixelRatio: ratio = 1 } = window;
      const ctx = canvas.getContext("2d");

      canvas.width = width * ratio;
      canvas.height = height * ratio;

      ctx.scale(ratio, ratio);

      return { left: left, right: right, top: top, bottom: bottom };
    }

    return false;
  };

  useEffect(
    (_) => {
      const ctx = canvasRef.current.getContext("2d");

      let frameCount = 0;
      let animationFrameId;
      let state = {};

      const render = () => {
        state = { ...state, ...resizeCanvas(ctx.canvas) };

        const newState = draw(ctx, state, frameCount);
        state = newState;

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
