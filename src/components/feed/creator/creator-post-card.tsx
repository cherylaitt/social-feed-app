import { Pressable, Text, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { Post } from "@/types/post";
import { formatCount, formatRelativeTime } from "@/utils/format";
import Avatar from "../../ui/avatar";
import { FeedActionButton } from "../shared/feed-action-button";
import ImageCarousel from "./image-carousel";

type CreatorPostCardProps = {
  post: Post;
};

export function CreatorPostCard({ post }: CreatorPostCardProps) {
  return (
    <ThemedView className="border-b border-neutral-200 pb-4 mb-4 dark:border-neutral-800">
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Avatar uri={post?.author?.avatarUrl} />
          <View>
            <ThemedText type="smallBold">{post?.author?.username}</ThemedText>
            <Text className="text-gray-100 mt-1 text-sm">
              {formatRelativeTime(post?.timestamp).toUpperCase()}
            </Text>
          </View>
        </View>
        <Pressable className="p-2">
          <ThemedText type="smallBold" className="text-neutral-500">
            •••
          </ThemedText>
        </Pressable>
      </View>

      {!!post?.media && post.media?.length > 0 && (
        <ImageCarousel images={post.media} />
      )}

      <View className="flex-row items-center justify-between px-2 pt-3 pb-1">
        <View className="flex-row items-center gap-2">
          <FeedActionButton
            icon={{ ios: "heart", android: "favorite", web: "favorite" }}
            count={0}
            label=""
          />
          <FeedActionButton
            icon={{
              ios: "bubble.right",
              android: "chat_bubble_outline",
              web: "chat_bubble",
            }}
            count={0}
            label=""
          />
          <FeedActionButton
            icon={{ ios: "paperplane", android: "send", web: "send" }}
            count={0}
            label=""
          />
        </View>
      </View>

      <View className="px-4 gap-1.5">
        {/* Likes */}
        {post?.engagement?.likes > 0 && (
          <ThemedText type="smallBold">
            {formatCount(post.engagement.likes)} likes
          </ThemedText>
        )}

        {!!post?.content && (
          <Text className="text-[15px] leading-5 text-neutral-900 dark:text-neutral-100">
            <Text className="font-bold">{post?.author?.username} </Text>
            {post.content}
          </Text>
        )}

        {/* Comments Link */}
        {post?.comments?.length > 0 && (
          <Pressable className="mt-1">
            <ThemedText type="default" className="text-neutral-500">
              View all {formatCount(post.comments.length)} comments
            </ThemedText>
          </Pressable>
        )}
      </View>
    </ThemedView>
  );
}
