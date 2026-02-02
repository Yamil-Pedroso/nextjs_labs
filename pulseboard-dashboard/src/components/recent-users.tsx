interface RecentUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedAt: string;
}

const users: RecentUser[] = [
  {
    id: "1",
    name: "Emma Wilson",
    email: "emma@pulseboard.io",
    avatarUrl:
      "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    joinedAt: "2 min ago",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@pulseboard.io",
    avatarUrl:
      "https://images.unsplash.com/photo-1554126807-6b10f6f6692a?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    joinedAt: "1 hour ago",
  },
  {
    id: "3",
    name: "Sarah Smith",
    email: "sarah@pulseboard.io",
    avatarUrl:
      "https://images.unsplash.com/photo-1613005798967-632017e477c8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    joinedAt: "Yesterday",
  },
];

export function RecentUsers() {
  interface UserListItemProps {
    user: RecentUser;
  }

  function UserListItem({ user }: UserListItemProps) {
    return (
      <li key={user.id} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-[rgb(var(--text))]">
              {user.name}
            </p>
            <p className="text-xs text-[rgb(var(--muted))]">{user.email}</p>
          </div>
        </div>

        <span className="text-xs text-[rgb(var(--muted))]">
          {user.joinedAt}
        </span>
      </li>
    );
  }

  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
      <h3 className="mb-4 text-sm font-semibold text-[rgb(var(--text))]">
        Recent Users
      </h3>

      <ul className="space-y-3">
        {users.map((user: RecentUser) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
