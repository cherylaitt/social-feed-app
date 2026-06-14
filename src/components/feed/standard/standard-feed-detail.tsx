import { ThemedText } from "@/components/themed-text";
import Avatar from "@/components/ui/avatar";
import { normalize } from "@/hooks/use-scaling";
import { Post } from "@/types/post";
import { formatRelativeTime } from "@/utils/format";
import { FlatList, Text, View } from "react-native";
import FeedActionButtonGroup from "../shared/feed-action-button-group";
import StandardPostContent from "./standard-post-content";

export default function StandardFeedDetail({
  post,
  isRefetching,
  refetch,
}: {
  post: Post;
  isRefetching: boolean;
  refetch: () => void;
}) {
  const renderHeader = () => (
    <View>
      <View className="p-4">
        <StandardPostContent post={post} />
      </View>

      <View className="mt-1 flex-row items-center border-t border-b border-neutral-200 py-1 mb-2 dark:border-neutral-800">
        <FeedActionButtonGroup
          likeNum={post?.engagement?.likes ?? 0}
          commentNum={post?.comments?.length ?? 0}
          shareNum={post?.engagement?.shares ?? 0}
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
    <FlatList
      data={post?.comments || []}
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
  );
}
