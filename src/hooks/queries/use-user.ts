import { fetchUser } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });
};
