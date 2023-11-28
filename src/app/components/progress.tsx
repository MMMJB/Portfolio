export default function Progress({
  correct,
  incorrect,
  total,
}: {
  correct: number;
  incorrect: number;
  total: number;
}) {
  const progress = (correct / total) * 100;

  return <div className="w-full rounded-full h-2 bg-gray-200"></div>;
}
