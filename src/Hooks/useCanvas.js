import React, { useRef, useEffect } from "react";

export default function useCanvas(draw) {
  const canvasRef = useRef();
  const stateRef = useRef();

  const resizeCanvas = (canvas) => {
    const { width, height, left, right, top, bottom } =
      canvas.getBoundingClientRect();

    const { devicePixelRatio: ratio = 1 } = window;
    const ctx = canvas.getContext("2d");

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.scale(ratio, ratio);

    return { left: left, right: right, top: top, bottom: bottom };
  };

  useEffect(
    (_) => {
      const ctx = canvasRef.current.getContext("2d");

      let frameCount = 0;
      let animationFrameId;
      let state = { ...resizeCanvas(ctx.canvas) };

      const render = () => {
        state = { ...state, ...stateRef.current };

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

  useEffect((_) => {
    const onResize = (_) =>
      (stateRef.current = { ...resizeCanvas(canvasRef.current) });
    window.addEventListener("resize", onResize);

    return (_) => window.removeEventListener("resize", onResize);
  }, []);

  return canvasRef;
}
