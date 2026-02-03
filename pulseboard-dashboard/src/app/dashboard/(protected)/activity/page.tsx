import {
  UserIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
}

const ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    title: "New user registered",
    description: "John Doe created a new account.",
    time: "2 minutes ago",
    icon: UserIcon,
  },
  {
    id: "2",
    title: "Payment completed",
    description: "Monthly subscription payment received.",
    time: "1 hour ago",
    icon: CreditCardIcon,
  },
  {
    id: "3",
    title: "Report generated",
    description: "Revenue report exported as PDF.",
    time: "Yesterday",
    icon: DocumentChartBarIcon,
  },
  {
    id: "4",
    title: "Settings updated",
    description: "Security preferences were changed.",
    time: "2 days ago",
    icon: Cog6ToothIcon,
  },
];

export default function ActivityPage() {
  return (
    <section className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Activity</h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Recent actions and system events.
        </p>
      </div>

      {/* Activity list */}
      <div className="space-y-4">
        {ACTIVITY.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="
                flex items-start gap-4
                rounded-xl border border-[rgb(var(--border))]
                bg-[rgb(var(--card))]
                p-4
              "
            >
              <div
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-lg bg-[rgb(var(--primary))]/10
                  text-[rgb(var(--primary))]
                "
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{item.title}</h3>
                  <span className="text-xs text-[rgb(var(--muted))]">
                    {item.time}
                  </span>
                </div>

                <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
