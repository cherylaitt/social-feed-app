import { fetchPost } from "@/api/posts";
import { useQuery } from "@tanstack/react-query";

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });
};
