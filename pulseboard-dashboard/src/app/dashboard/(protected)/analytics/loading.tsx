export default function Loading() {
  return (
    <section className="px-4 py-4 sm:p-6 space-y-6">
      <div className="h-6 w-40 rounded bg-[rgb(var(--border))]/60 animate-pulse" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-56 rounded-xl bg-[rgb(var(--border))]/60 animate-pulse" />
        <div className="h-56 rounded-xl bg-[rgb(var(--border))]/60 animate-pulse" />
      </div>
    </section>
  );
}
