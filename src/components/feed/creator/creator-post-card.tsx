import { Pressable, Text, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { Post } from "@/types/post";
import { formatRelativeTime } from "@/utils/format";
import { useRouter } from "expo-router";
import Avatar from "../../ui/avatar";
import FeedActionButtonGroup from "../shared/feed-action-button-group";
import ImageCarousel from "./image-carousel";

type CreatorPostCardProps = {
  post: Post;
  onCommentPress: () => void;
};

export function CreatorPostCard({
  post,
  onCommentPress,
}: CreatorPostCardProps) {
  const router = useRouter();

  return (
    <ThemedView className="border-b border-neutral-200 pb-4 mb-4 dark:border-neutral-800">
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable
          onPress={() =>
            router.navigate({
              pathname: "/(profiles)/[id]",
              params: { id: post?.author?.id },
            })
          }
        >
          <View className="flex-row items-center gap-3">
            <Avatar uri={post?.author?.avatarUrl} />
            <View>
              <ThemedText type="smallBold">{post?.author?.username}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {formatRelativeTime(post?.timestamp)}
              </ThemedText>
            </View>
          </View>
        </Pressable>
        {/* <Pressable className="p-2">
          <ThemedText type="smallBold" className="text-neutral-500">
            •••
          </ThemedText>
        </Pressable> */}
      </View>

      {!!post?.media && post.media?.length > 0 && (
        <ImageCarousel images={post.media} />
      )}

      <View className="flex-row items-center justify-between px-2 pt-3 pb-1">
        <View className="flex-row items-center gap-2">
          <FeedActionButtonGroup
            likeNum={post?.engagement?.likes ?? 0}
            commentNum={post?.comments?.length ?? 0}
            shareNum={post?.engagement?.shares ?? 0}
            onCommentPress={onCommentPress}
          />
        </View>
      </View>

      <View className="px-4 mb-4">
        {!!post?.content && (
          <Text className="text-[15px] leading-5 text-neutral-900 dark:text-neutral-100">
            <Text className="font-bold">{post?.author?.username} </Text>
            {post.content}
          </Text>
        )}
      </View>
    </ThemedView>
  );
}
