import { FeedHeader } from "@/components/feed/feed-header";
import FeedList from "@/components/feed/feed-list";
import { ThemedView } from "@/components/themed-view";
import { usePosts } from "@/hooks/queries/use-posts";

export default function FeedsScreen() {
  const { data, isLoading, isRefetching, refetch, error } = usePosts();

  const posts = data?.posts || [];

  return (
    <ThemedView className="flex-1">
      <FeedHeader />

      <FeedList
        error={error}
        posts={posts}
        isLoading={isLoading}
        isRefetching={isRefetching}
        refetchAll={refetch}
      />
    </ThemedView>
  );
}
