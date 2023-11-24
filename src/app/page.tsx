"use client";

import { useState, useEffect } from "react";

import Emitter from "./utils/emitter";

import TextField from "./components/textField";

export default function Landing() {
  const [text, setText] = useState("");

  return (
    <TextField
      prompt="My name is Michael Beck."
      className="text-2xl text-center w-full my-8"
    />
  );
}
