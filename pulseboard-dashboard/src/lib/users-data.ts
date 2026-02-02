export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Member";
  status: "Active" | "Inactive";
}

export async function getUsers(): Promise<User[]> {
  await new Promise((r) => setTimeout(r, 900));

  return [
    {
      id: "1",
      name: "John Doe",
      email: "john@pulseboard.io",
      role: "Admin",
      status: "Active",
    },
    {
      id: "2",
      name: "Sarah Smith",
      email: "sarah@pulseboard.io",
      role: "Member",
      status: "Active",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@pulseboard.io",
      role: "Member",
      status: "Inactive",
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma@pulseboard.io",
      role: "Member",
      status: "Active",
    },
  ];
}
