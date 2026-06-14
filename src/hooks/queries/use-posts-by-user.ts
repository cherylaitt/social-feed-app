import { fetchPostsByUser } from "@/api/posts";
import { useQuery } from "@tanstack/react-query";

export const usePostsByUser = (userId: string) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostsByUser(userId),
  });
};
