import React, { useRef, useState, useEffect } from "react";

export default function Cursor() {
  const posRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const cursorRef = useRef();

  const [expanded, setExpanded] = useState(false);

  const moveMask = (x, y) => {
    document.documentElement.style.setProperty("--maskX", `${x}px`);
    document.documentElement.style.setProperty("--maskY", `${y}px`);
  };

  useEffect((_) => {
    const onMouseMove = (e) => {
      if (cursorRef.current === undefined) return;

      const validHover = "maskImg" in e.target.dataset;
      setExpanded(validHover);

      posRef.current.x = e.pageX;
      posRef.current.y = e.pageY;

      const x = posRef.current.x,
        y = posRef.current.y;

      cursorRef.current.style.top = `${y}px`;
      cursorRef.current.style.left = `${x}px`;

      moveMask(validHover ? x : -64, validHover ? y : -64);
    };

    window.addEventListener("mousemove", onMouseMove);

    return (_) => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    !matchMedia("(pointer:none)").matches && (
      <div
        ref={cursorRef}
        style={{
          transform: `scale(${expanded ? 16 : 1})`,
        }}
        className="pointer-events-none absolute z-50 aspect-square w-2 rounded-full bg-cursor transition-transform duration-200"
      ></div>
    )
  );
}
