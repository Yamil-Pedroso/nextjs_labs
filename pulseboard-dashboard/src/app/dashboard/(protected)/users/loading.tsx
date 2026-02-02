export default function Loading() {
  return (
    <section className="px-4 py-4 sm:p-6 space-y-6">
      <div className="h-6 w-32 rounded bg-[rgb(var(--border))]/60 animate-pulse" />
      <div className="h-64 rounded-xl bg-[rgb(var(--border))]/60 animate-pulse" />
    </section>
  );
}
