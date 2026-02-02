export default function WelcomePage() {
  return (
    <section className="px-6 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Welcome to PulseBoard</h1>

      <p className="text-[rgb(var(--muted))] max-w-xl">
        PulseBoard helps you track analytics, manage users, and gain insights
        into your business in real time.
      </p>

      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>📊 Real-time analytics</li>
        <li>👥 User management</li>
        <li>⚙️ Customizable dashboard</li>
      </ul>
    </section>
  );
}
