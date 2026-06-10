import { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";

import { FeedHeader } from "@/components/feed/feed-header";
import { StandardPostCard } from "@/components/feed/standard-post-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { usePosts } from "@/hooks/queries/use-posts";
import type { Post } from "@/types/post";

function FeedEmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-8 py-24">
      <ThemedText type="smallBold" className="mb-2 text-center text-lg">
        No posts yet
      </ThemedText>
      <ThemedText className="text-center" themeColor="textSecondary">
        Posts from accounts you follow will show up here once they are
        available.
      </ThemedText>
    </View>
  );
}

function FeedErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-24">
      <ThemedText type="smallBold" className="mb-2 text-center text-lg">
        Couldn&apos;t load feed
      </ThemedText>
      <ThemedText className="mb-4 text-center" themeColor="textSecondary">
        {message}
      </ThemedText>
      <ThemedText type="linkPrimary" className="text-center" onPress={onRetry}>
        Try again
      </ThemedText>
    </View>
  );
}

// 1. Hardcode your followers here
const FOLLOWING_ACCOUNTS = ["Adobe", "Apple", "Google"];

export default function FeedsScreen() {
  // 2. Call the hook for each hardcoded account
  // (React requires a fixed number of hook calls, so this is safe for a hardcoded list)
  const query1 = usePosts({ pageName: FOLLOWING_ACCOUNTS[0] });
  const query2 = usePosts({ pageName: FOLLOWING_ACCOUNTS[1] });
  const query3 = usePosts({ pageName: FOLLOWING_ACCOUNTS[2] });

  // Group queries to easily check states
  const queries = [query1, query2, query3];

  const isLoading = queries.some((q) => q.isLoading);
  const isRefetching = queries.some((q) => q.isRefetching);
  const error = queries.find((q) => q.error)?.error;

  const refetchAll = useCallback(() => {
    queries.forEach((q) => {
      void q.refetch();
    });
  }, [query1, query2, query3]);

  // 3. Combine and sort the posts
  const posts = useMemo(() => {
    // Extract posts from all successful queries
    const allPosts = queries.flatMap((q) => q.data?.posts ?? []);

    // Sort by publish time descending
    return allPosts.sort((a, b) => {
      const dateA = new Date(a?.values?.publish_time || 0).getTime();
      const dateB = new Date(b?.values?.publish_time || 0).getTime();
      return dateB - dateA;
    });
  }, [query1.data, query2.data, query3.data]);

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <StandardPostCard post={item} key={item.id} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  return (
    <ThemedView className="flex-1">
      <FeedHeader />

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <FeedErrorState
          message={
            error instanceof Error ? error.message : "Something went wrong"
          }
          onRetry={refetchAll}
        />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerClassName={posts.length === 0 ? "flex-1" : undefined}
          ListEmptyComponent={<FeedEmptyState />}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching && !isLoading}
              onRefresh={refetchAll}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}
