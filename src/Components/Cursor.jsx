import React, { useRef, useState, useEffect } from "react";

export default function Cursor() {
  const posRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const cursorRef = useRef();

  const [expanded, setExpanded] = useState(false);

  useEffect((_) => {
    const onMouseMove = (e) => {
      if (cursorRef.current === undefined) return;

      const validHover = "maskImg" in e.target.dataset;
      setExpanded(validHover);

      posRef.current.x = e.pageX;
      posRef.current.y = e.pageY;

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
        style={{
          transform: `scale(${expanded ? 16 : 1})`,
        }}
        className="pointer-events-none absolute z-50 aspect-square w-2 rounded-full bg-cursor transition-transform duration-200"
      ></div>
    )
  );
}
