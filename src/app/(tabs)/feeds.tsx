import { useCallback } from "react";
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

function FeedEmptyState({ pageName }: { pageName: string }) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-24">
      <ThemedText type="smallBold" className="mb-2 text-center text-lg">
        No posts yet
      </ThemedText>
      <ThemedText className="text-center" themeColor="textSecondary">
        Posts from @{pageName} will show up here once they are available.
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

export default function FeedsScreen() {
  const pageName = "Adobe";
  const { data, error, isLoading, isRefetching, refetch } = usePosts({
    pageName,
  });

  console.log(data);

  const posts = data?.posts ?? [];

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <StandardPostCard post={item} key={item.id} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  return (
    <ThemedView className="flex-1">
      <FeedHeader pageName={pageName} />

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <FeedErrorState
          message={
            error instanceof Error ? error.message : "Something went wrong"
          }
          onRetry={() => {
            void refetch();
          }}
        />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerClassName={posts.length === 0 ? "flex-1" : undefined}
          ListEmptyComponent={<FeedEmptyState pageName={pageName} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching && !isLoading}
              onRefresh={() => {
                void refetch();
              }}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}
