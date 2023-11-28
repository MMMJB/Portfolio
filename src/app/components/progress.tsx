"use client";

import React, { useRef, useState, useEffect } from "react";

import Emitter from "../utils/emitter";

type CharState = "untyped" | "correct" | "incorrect";

function Bar({
  width,
  type,
  rounded,
}: {
  width: number;
  type: CharState;
  rounded: boolean;
}) {
  return (
    <div
      className={`${rounded ? "rounded-r-full" : ""} ${
        type === "correct"
          ? "bg-black"
          : type === "incorrect"
          ? "bg-red-500"
          : ""
      } h-full transition-[width] duration-200 ease-out`}
      style={{ width: `${width}%` }}
    />
  );
}

export default function Progress() {
  const charsRef = useRef<CharState[]>([]);

  const [bars, setBars] = useState<{ state: CharState; width: number }[]>([]);
  const [complete, setComplete] = useState(false);

  function onTyped(chars: CharState[]) {
    const typedChars = chars.filter((char) => char !== "untyped");

    if (typedChars.length > charsRef.current.length) {
      const newest = typedChars[typedChars.length - 1];

      if (bars.length === 0) {
        setBars([
          {
            state: newest,
            width: 100 / chars.length,
          },
        ]);

        return;
      }

      if (newest === bars[bars.length - 1].state) {
        setBars((p) => [
          ...p.slice(0, -1),
          {
            state: newest,
            width: p[p.length - 1].width + 100 / chars.length,
          },
        ]);
      } else {
        setBars((p) => [
          ...p,
          {
            state: newest,
            width: 100 / chars.length,
          },
        ]);
      }
    } else {
      if (
        Math.floor(bars[bars.length - 1].width) ===
        Math.floor(100 / chars.length)
      ) {
        setBars((p) => p.slice(0, -1));
      } else {
        setBars((p) => [
          ...p.slice(0, -1),
          {
            state: p[p.length - 1].state,
            width: p[p.length - 1].width - 100 / chars.length,
          },
        ]);
      }
    }

    charsRef.current = typedChars;
    setComplete(typedChars.length === chars.length);
  }

  useEffect(() => {
    Emitter.on("typed", onTyped);

    return () => {
      Emitter.off("typed", onTyped);
    };
  }, [onTyped]);

  return (
    <div
      className={`${
        complete && "opacity-50"
      } w-full flex rounded-full h-2 bg-gray-200 transition-all duration-200 ease-out overflow-hidden`}
    >
      {bars.map((bar, i) => (
        <Bar
          key={i}
          width={bar.width}
          type={bar.state}
          rounded={i === bars.length - 1}
        />
      ))}
    </div>
  );
}
