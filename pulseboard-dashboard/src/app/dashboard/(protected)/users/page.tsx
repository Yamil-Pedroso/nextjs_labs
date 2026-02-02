"use client";

import { useEffect, useState } from "react";
import { UsersTable } from "@/components/users-table";
import { getUsers } from "@/lib/users-data";
import { User } from "@/lib/users-data";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-4 sm:p-6 space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold">Users</h2>

        <div className="h-64 rounded-xl bg-[rgb(var(--border))]/60 animate-pulse" />
      </section>
    );
  }

  return (
    <section className="px-4 py-4 sm:p-6 space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold text-[rgb(var(--text))]">
        Users
      </h2>

      <UsersTable users={users} />
    </section>
  );
}
