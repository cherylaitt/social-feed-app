import { StandardPostCard } from "@/components/feed/standard/standard-post-card";
import { ThemedText } from "@/components/themed-text";
import { useAppStore } from "@/stores/app-store";
import type { Post } from "@/types/post";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { CommentsBottomSheet } from "./creator/comments-bottom-sheet";
import { CreatorPostCard } from "./creator/creator-post-card";

export default function FeedList({
  posts,
  isRefetching,
  isLoading,
  error,
  refetchAll,
}: {
  posts: Post[];
  isRefetching: boolean;
  isLoading: boolean;
  error?: any;
  refetchAll: () => void;
}) {
  const { feedLayoutMode } = useAppStore();

  // for creator-first mode
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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
        <ThemedText
          type="linkPrimary"
          className="text-center"
          onPress={onRetry}
        >
          Try again
        </ThemedText>
      </View>
    );
  }

  return (
    <>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : !!error ? (
        <FeedErrorState message={error.message} onRetry={refetchAll} />
      ) : (
        <>
          <FlatList
            data={posts}
            keyExtractor={(post) => post.id}
            renderItem={({ item }: { item: Post }) => (
              <>
                {feedLayoutMode === "standard" ? (
                  <StandardPostCard post={item} />
                ) : feedLayoutMode === "creatorFirst" ? (
                  <CreatorPostCard
                    post={item}
                    onCommentPress={() => setSelectedPost(item)}
                  />
                ) : null}
              </>
            )}
            contentContainerClassName={
              posts.length === 0 ? "flex-1" : undefined
            }
            ListEmptyComponent={<FeedEmptyState />}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching && !isLoading}
                onRefresh={refetchAll}
              />
            }
            showsVerticalScrollIndicator={false}
          />

          <CommentsBottomSheet
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        </>
      )}
    </>
  );
}
