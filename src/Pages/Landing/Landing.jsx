import React, { useState, useEffect } from "react";

import interpolateColors from "../../Utils/interpolateColors";

const numLines = 32;
const colors = ["rgb(224, 153, 50)", "rgb(239, 111, 163)"];

export default function Landing() {
  const [codeMask, setCodeMask] = useState();
  const [scrollPos, setScrollPos] = useState(0);

  useEffect((_) => {
    const fetchCodeMask = async (_) => {
      let codeMask = await fetch("/code.txt").then((r) => r.text());
      codeMask = codeMask.substring(0, 60 * numLines);

      setCodeMask(codeMask);
    };

    fetchCodeMask();
  }, []);

  return (
    <div className="grid h-screen w-full place-items-center">
      {codeMask && (
        <div
          style={{
            backgroundColor: interpolateColors(colors[0], colors[1], scrollPos),
          }}
          className="bg-h-max w-max whitespace-nowrap rounded-[5%] bg-[url('/Images/background.svg')] bg-clip-text bg-no-repeat font-monospace text-base/[1.15em] font-bold"
        >
          {codeMask.match(/(.{60})/g).map((v, i) => {
            return <p key={i}>{v}</p>;
          })}
        </div>
      )}
    </div>
  );
}
