"use client";

import { useState, useEffect } from "react";

import Progress from "./progress";

import Emitter from "../utils/emitter";

import { shifted, unshifted } from "../utils/keyboardLayout";
import { KeyReplay, playReplay } from "../utils/keyboardReplay";

export function Key({
  letter,
  onPress,
}: {
  letter: string;
  onPress: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  function keyDownHandler(e: KeyboardEvent) {
    if (e.key !== letter || e.ctrlKey) return;

    onPress();
    setPressed(true);
  }

  function keyUpHandler(e: KeyboardEvent) {
    if (e.key !== letter) return;

    setPressed(false);
  }

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [keyDownHandler, keyUpHandler]);

  return (
    <button
      className={`${pressed ? "bg-dark text-light" : "bg-light text-dark"} ${
        letter === " " ? "w-64" : "w-8"
      } text-base h-8 font-mono rounded-lg border border-dark/10 transition-all duration-100 cursor-default focus:outline-none`}
      tabIndex={-1}
    >
      {letter}
    </button>
  );
}

export default function Keyboard() {
  const [replay, setReplay] = useState<KeyReplay>([]);
  const [shifting, setShifting] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);

  function recordKeyPress(event: KeyboardEvent) {
    event.preventDefault();

    if (event.key === "r" && event.ctrlKey) {
      setRecording(false);
      setPlaying(true);

      playReplay(replay, {
        onComplete: () => {
          setPlaying(false);
        },
      });

      window.removeEventListener("keydown", recordKeyPress);
      window.removeEventListener("keyup", recordKeyPress);

      return;
    }

    const shift = event.shiftKey;
    const caps = event.getModifierState("CapsLock");

    setReplay((p) => [
      ...p,
      {
        key: event.key,
        modifiers: { shift, caps },
        time: Date.now(),
        type: event.type as "keydown" | "keyup",
      },
    ]);
  }

  function checkKeyboardState(e: KeyboardEvent) {
    if (e.shiftKey !== shifting) setShifting(e.shiftKey);
    if (e.getModifierState("CapsLock") !== capsLock)
      setCapsLock(e.getModifierState("CapsLock"));
  }

  function genericKeyHandler(e: KeyboardEvent) {
    const whitelist = ["Backspace", "Enter"];

    if (whitelist.includes(e.key)) Emitter.emit("keyPress", e.key);

    // if (e.key === "r" && e.ctrlKey) {
    //   e.preventDefault();

    //   if (recording) return;

    //   setRecording(true);
    //   setReplay([]);

    //   window.addEventListener("keydown", recordKeyPress);
    //   window.addEventListener("keyup", recordKeyPress);
    // }
  }

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      checkKeyboardState(e);
      genericKeyHandler(e);
    }

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", checkKeyboardState);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", checkKeyboardState);
    };
  }, [checkKeyboardState]);

  return (
    <div className="w-full sm:flex hidden justify-center sticky mb-16 bottom-0">
      <div
        className={`${
          playing ? "opacity-50" : ""
        } flex flex-col gap-1 items-center transition-opacity w-max`}
      >
        <Progress />
        {(shifting ? shifted : unshifted).map((row, i) => (
          <div className="flex gap-1" key={i}>
            {row.map((key) => (
              <Key
                key={key}
                letter={!capsLock ? key : key.toUpperCase()}
                onPress={() =>
                  Emitter.emit("keyPress", !capsLock ? key : key.toUpperCase())
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
