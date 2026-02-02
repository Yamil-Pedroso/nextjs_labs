import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/users-data";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}
