import React, { useRef, useState, useEffect } from "react";

export default function Cursor() {
  const posRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const sizeRef = useRef(16);
  const cursorRef = useRef();

  const moveMouse = (x, y) => {
    posRef.current.x = x - sizeRef.current / 2;
    posRef.current.y = y - sizeRef.current / 2;
  };

  useEffect((_) => {
    const onMouseMove = (e) => {
      if (cursorRef.current === undefined) return;

      moveMouse(e.pageX, e.pageY);

      cursorRef.current.style.top = `${posRef.current.y}px`;
      cursorRef.current.style.left = `${posRef.current.x}px`;
    };

    window.addEventListener("mousemove", onMouseMove);

    return (_) => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    !matchMedia("(pointer:none)").matches && (
      <div
        ref={cursorRef}
        className="pointer-events-none absolute h-4 w-4 rounded-full border-2 border-cursor bg-cursor/10"
      ></div>
    )
  );
}
