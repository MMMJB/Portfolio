export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid place-items-center w-[min(100%,36rem)] aspect-video rounded-2xl border border-dark/10 overflow-hidden">
      {children}
    </div>
  );
}
