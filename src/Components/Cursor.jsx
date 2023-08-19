import React, { useRef, useState, useEffect } from "react";

export default function Cursor() {
  const posRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const cursorRef = useRef();

  const [scale, setScale] = useState(1);

  useEffect((_) => {
    const onMouseMove = (e) => {
      if (cursorRef.current === undefined) return;

      const maskHover = e.target.id === "maskImg";
      setScale(maskHover ? 24 : 1);

      posRef.current.x = e.pageX;
      posRef.current.y = e.pageY;

      // cursorRef.current.style.top = `${posRef.current.y}px`;
      // cursorRef.current.style.left = `${posRef.current.x}px`;
      document.body.style.setProperty("--mX", `${posRef.current.x}px`);
      document.body.style.setProperty("--mY", `${posRef.current.y}px`);
    };

    window.addEventListener("mousemove", onMouseMove);

    return (_) => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    !matchMedia("(pointer:none)").matches && (
      <div
        ref={cursorRef}
        style={{
          transform: `scale(${scale})`,
          left: "var(--mX)",
          top: "var(--mY)",
        }}
        className="pointer-events-none absolute aspect-square w-2 rounded-full bg-cursor transition-transform duration-200"
      ></div>
    )
  );
}
