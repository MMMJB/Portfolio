const extractColorParts = (rgb) =>
  Array.from(rgb.slice(4, -1).replaceAll(" ", "").split(","), (v) =>
    parseInt(v),
  );

export default function interpolateColors(c1, c2, v) {
  const [r1, g1, b1] = extractColorParts(c1);
  const [r2, g2, b2] = extractColorParts(c2);

  const r = Math.round(r1 + (r2 - r1) * v);
  const g = Math.round(g1 + (g2 - g1) * v);
  const b = Math.round(b1 + (b2 - b1) * v);

  return `rgb(${[r, g, b].join(", ")})`;
}
