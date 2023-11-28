"use client";

import { useState, useEffect } from "react";

import Emitter from "./utils/emitter";

import TextField from "./components/textField";

export default function Landing() {
  return (
    <div className="py-16">
      <TextField
        prompt="My name is Michael Beck."
        className="text-2xl text-center w-full"
      />
    </div>
  );
}
