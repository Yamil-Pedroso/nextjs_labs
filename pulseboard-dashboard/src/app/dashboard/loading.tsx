export default function Loading() {
  return (
    <section className="px-4 py-4 sm:p-6 space-y-6">
      <div className="h-6 w-48 rounded bg-[rgb(var(--border))]/60 animate-pulse" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-[rgb(var(--border))]/60 animate-pulse"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 h-56 rounded-xl bg-[rgb(var(--border))]/60 animate-pulse" />
        <div className="h-56 rounded-xl bg-[rgb(var(--border))]/60 animate-pulse" />
      </div>
    </section>
  );
}
