import { User } from "@/lib/users-data";
import { Badge } from "@/components/badge";

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))]">
      <table className="w-full text-sm">
        <thead className="text-left text-[rgb(var(--muted))]">
          <tr>
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Email</th>
            <th className="px-6 py-3 font-medium">Role</th>
            <th className="px-6 py-3 font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t border-[rgb(var(--border))]
                         hover:bg-[rgb(var(--border))]/30"
            >
              <td className="px-6 py-4 font-medium">{user.name}</td>
              <td className="px-6 py-4 text-[rgb(var(--muted))]">
                {user.email}
              </td>
              <td className="px-6 py-4 text-[rgb(var(--muted))]">
                {user.role}
              </td>
              <td className="px-6 py-4">
                <Badge variant={user.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
