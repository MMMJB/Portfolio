import React, { useState, useEffect } from "react";

import CodeMask from "./Components/CodeMask";

const numLines = 32;

export default function Landing() {
  const [maskText, setMaskText] = useState();

  useEffect((_) => {
    const fetchCodeMask = async (_) => {
      let maskText = await fetch("/code.txt").then((r) => r.text());
      maskText = maskText
        .substring(0, 120 * numLines)
        .match(/(.{120})/g)
        .join("\n");

      setMaskText(maskText);
    };

    fetchCodeMask();
  }, []);

  return (
    <div className="grid w-full place-items-center">
      <img
        id="background"
        src="/Images/background.svg"
        width="1600"
        className="hidden"
      />
      {maskText && (
        <CodeMask styles="w-1/2 h-[50vh]" img="background" text={maskText} />
      )}
    </div>
  );
}
