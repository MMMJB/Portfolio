import React, { useState, useEffect } from "react";

import CodeMask from "./Components/CodeMask";

import images from "../../Utils/images";

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
      {images.map((img, i) => {
        return (
          <img
            key={i}
            id={img.name}
            src={img.src}
            width={img.width}
            height={img.height}
            className="hidden"
          />
        );
      })}
      {maskText && (
        <CodeMask
          styles="w-1/2"
          img="background"
          hoverImg="backgroundHover"
          text={maskText}
        />
      )}
    </div>
  );
}
