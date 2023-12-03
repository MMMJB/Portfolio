"use client";

import { useState, useEffect } from "react";

import Emitter from "./utils/emitter";

import TextField from "./components/textField";

const prompts = [
  "My name is Michael Beck.",
  "I'm a junior in high school.",
  "This is my portfolio.",
];

export default function Landing() {
  const [promptIndex, setPromptIndex] = useState(0);

  function onComplete() {
    if (promptIndex === prompts.length - 1) return;

    setPromptIndex((p) => p + 1);
  }

  useEffect(() => {
    Emitter.on("complete", onComplete);

    return () => {
      Emitter.off("complete", onComplete);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {prompts.map((prompt, i) => (
        <TextField
          key={i}
          prompt={prompt}
          focused={i === promptIndex}
          style={{
            transform: `translateY(${
              (promptIndex * 3 - prompts.length) * -0.5
            }em)`,
          }}
          className="text-2xl text-center w-full transition-transform ease-out duration-500"
        />
      ))}
    </div>
  );
}
