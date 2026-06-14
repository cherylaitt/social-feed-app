import { CommentsBottomSheet } from "@/components/feed/creator/comments-bottom-sheet";
import { CreatorPostCard } from "@/components/feed/creator/creator-post-card";
import StandardFeedDetail from "@/components/feed/standard/standard-feed-detail";
import { ThemedView } from "@/components/themed-view";
import ScreenLayout from "@/components/ui/screen-layout";
import { usePost } from "@/hooks/queries/use-post";
import { useAppStore } from "@/stores/app-store";
import { Post } from "@/types/post";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

export default function FeedDetailsScreen() {
  const { id } = useLocalSearchParams();

  const { feedLayoutMode } = useAppStore();

  const { data, isLoading, isRefetching, refetch } = usePost(id as string);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (isLoading || !data) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </ThemedView>
    );
  }

  return (
    <ScreenLayout isBackButtonShown title="Feed">
      {feedLayoutMode === "standard" ? (
        <StandardFeedDetail
          post={data}
          isRefetching={isRefetching}
          refetch={refetch}
        />
      ) : (
        <>
          <CreatorPostCard
            post={data}
            onCommentPress={() => setSelectedPost(data)}
          />

          <CommentsBottomSheet
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        </>
      )}
    </ScreenLayout>
  );
}
