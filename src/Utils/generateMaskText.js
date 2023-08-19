export default function generateMaskText(lineLength, numLines) {
  const r = `(.{${lineLength}})`;
  const regex = new RegExp(r, "g");

  return Array.from(Array(lineLength * numLines), (_) =>
    Math.round(Math.random()),
  )
    .join("")
    .match(regex)
    .join("\n");
}
