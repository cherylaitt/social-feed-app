import FeedActionButtonGroup from "@/components/feed/shared/feed-action-button-group";
import StandardPostContent from "@/components/feed/standard/standard-post-content";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Avatar from "@/components/ui/avatar";
import ScreenLayout from "@/components/ui/screen-layout";
import { usePost } from "@/hooks/queries/use-post";
import { normalize } from "@/hooks/use-scaling";
import { Post } from "@/types/post";
import { formatRelativeTime } from "@/utils/format";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FeedDetailsScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const { data, isLoading, isRefetching, refetch } = usePost(id as string);

  if (isLoading || !data) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </ThemedView>
    );
  }

  // The Post Content and Action Buttons become the "Header" of the scrolling list
  const renderHeader = () => (
    <View>
      <View className="p-4">
        <StandardPostContent post={data as Post} />
      </View>

      <View className="mt-1 flex-row items-center border-t border-b border-neutral-200 py-1 mb-2 dark:border-neutral-800">
        <FeedActionButtonGroup
          likeNum={data?.engagement?.likes ?? 0}
          commentNum={data?.comments?.length ?? 0}
          shareNum={data?.engagement?.shares ?? 0}
        />
      </View>
    </View>
  );

  // Individual Comment Item (Twitter/Facebook style)
  const renderComment = ({ item }: { item: any }) => (
    <View className="flex-row gap-3 px-4 py-3 border-b border-gray-100 dark:border-neutral-900">
      <Avatar uri={item.author?.avatarUrl} />

      <View className="flex-1">
        <View className="flex-row items-center gap-2 mb-2">
          <ThemedText type="smallBold">{item.author?.username}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {formatRelativeTime(item.timestamp)}
          </ThemedText>
        </View>

        {/* Comment Text */}
        <Text className="leading-5" style={{ fontSize: normalize(14) }}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <ScreenLayout isBackButtonShown title="Feed">
      <FlatList
        data={data?.comments || []}
        keyExtractor={(item) => item.id}
        renderItem={renderComment}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-8 items-center">
            <ThemedText themeColor="textSecondary">
              No comments yet. Be the first to reply!
            </ThemedText>
          </View>
        }
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </ScreenLayout>
  );
}
