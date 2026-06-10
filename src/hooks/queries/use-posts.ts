import { fetchPosts } from "@/api/posts";
import { useQuery } from "@tanstack/react-query";

export const usePosts = ({
  pageName,
  timezone = "UTC",
}: {
  pageName: string;
  timezone?: string;
}) => {
  return useQuery({
    queryKey: ["posts", pageName],
    queryFn: () => fetchPosts({ pageName, timezone }),
    enabled: !!pageName,
  });
};
