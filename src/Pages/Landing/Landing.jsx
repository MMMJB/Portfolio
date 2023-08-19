import React, { useState, useEffect } from "react";

import CodeMask from "./Components/CodeMask";

import images from "../../Utils/images";
import generateMaskText from "../../Utils/generateMaskText";

const numLines = 47;
const lineLength = 80;

export default function Landing() {
  const [maskText, setMaskText] = useState();

  useEffect((_) => {
    // const fetchCodeMask = async (_) => {
    //   let maskText = await fetch("/code.txt").then((r) => r.text());
    //   maskText = maskText
    //     .substring(0, 120 * numLines)
    //     .match(/(.{80})/g)
    //     .join("\n");

    //   setMaskText(maskText);
    // };

    // fetchCodeMask();
    setMaskText(generateMaskText(lineLength, numLines));
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
          styles="aspect-square w-[560px] z-10"
          img="background"
          hoverImg="backgroundHover"
          text={maskText}
        />
      )}
    </div>
  );
}
