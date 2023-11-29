import React, { useState, useEffect } from "react";

import { IonIcon } from "@ionic/react";
import { returnDownBackOutline } from "ionicons/icons";

import Emitter from "../utils/emitter";

function Cursor() {
  return (
    <span className="inline-block border-r-2 border-black h-[1em] top-1/2 -translate-y-1/2 animate-blink absolute"></span>
  );
}

export default function TextField({
  prompt,
  focused = true,
  className,
  style,
}: {
  prompt: string;
  focused?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const letters = prompt.split("");

  const [typed, setTyped] = useState("");

  function evaluateLetters() {
    const evaluated = letters.map((letter, i) => {
      const typedLetter = typed[i];

      if (typedLetter === undefined) return "untyped";
      if (typedLetter === letter) return "correct";
      return "incorrect";
    });

    Emitter.emit("typed", evaluated);
  }

  function onKeyPress(key: string) {
    if (!focused) return;

    switch (key) {
      case "Backspace":
        setTyped((p) => p.slice(0, -1));
        break;
      case "Enter":
        if (typed.length !== letters.length) return;

        Emitter.emit("complete", true);

        break;
      default:
        if (typed.length < letters.length) setTyped((p) => p + key);
        break;
    }
  }

  useEffect(() => {
    Emitter.on("keyPress", onKeyPress);

    return () => {
      Emitter.off("keyPress", onKeyPress);
    };
  }, [onKeyPress]);

  useEffect(() => {
    evaluateLetters();
  }, [typed]);

  return (
    <p
      className={`${focused ? "" : "opacity-10"} relative font-light ${
        className || ""
      }`}
      style={style}
    >
      {letters.map((letter, i) => {
        const typedLetter = typed[i];

        return (
          <React.Fragment key={letter + i}>
            {i === typed.length && focused && <Cursor />}
            <span
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
            {i === letters.length - 1 &&
              typed.length - 1 === letters.length - 1 && (
                <IonIcon
                  icon={returnDownBackOutline}
                  className="inline-block ml-2 translate-y-[.25em] text-gray-600 absolute animate-pulse"
                />
              )}
          </React.Fragment>
        );
      })}
    </p>
  );
}
