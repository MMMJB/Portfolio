import { useState, useEffect } from "react";

import Emitter from "../utils/emitter";

export default function TextField({
  prompt,
  focused = true,
  className,
}: {
  prompt: string;
  focused?: boolean;
  className?: string;
}) {
  const letters = prompt.split("");

  const [typed, setTyped] = useState("");

  function onKeyPress(key: string) {
    if (!focused) return;

    switch (key) {
      case "Backspace":
        setTyped((p) => p.slice(0, -1));
        break;
      default:
        setTyped((p) => p + key);
        break;
    }
  }

  useEffect(() => {
    Emitter.on("keyPress", onKeyPress);

    return () => {
      Emitter.off("keyPress", onKeyPress);
    };
  }, []);

  return (
    <p className={`relative ${className || ""}`}>
      {letters.map((letter, i) => {
        const typedLetter = typed[i];

        return (
          <>
            {i === typed.length && (
              <span className="inline-block border-r-2 border-black h-[1em] top-1/2 -translate-y-1/2 animate-blink absolute"></span>
            )}
            <span
              key={i}
              className={
                typedLetter === undefined
                  ? "text-gray-400"
                  : typedLetter === letter
                  ? "text-black"
                  : "text-red-400 underline"
              }
            >
              {letter}
            </span>
          </>
        );
      })}
    </p>
  );
}
