import { Pressable, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { Post } from "@/types/post";
import { formatCount } from "@/utils/format";
import { useRouter } from "expo-router";
import FeedActionButtonGroup from "../shared/feed-action-button-group";
import StandardPostContent from "./standard-post-content";

type StandardPostCardProps = {
  post: Post;
};

export function StandardPostCard({ post }: StandardPostCardProps) {
  const router = useRouter();

  const engagementTotal =
    post?.engagement?.likes + post?.engagement?.shares + post?.comments?.length;

  console.log("post", post);

  return (
    <ThemedView className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <Pressable
        accessibilityRole="button"
        className="active:opacity-80"
        onPress={() =>
          router.navigate({
            pathname: "/(feeds)/feed-details/[id]",
            params: { id: post?.id },
          })
        }
      >
        <StandardPostContent post={post} />

        {engagementTotal > 0 ? (
          <View className="mt-4 flex-row items-center justify-between px-1">
            <ThemedText type="small" themeColor="textSecondary">
              {formatCount(post?.engagement?.likes)} likes
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {formatCount(post?.comments?.length)} comments ·{" "}
              {formatCount(post?.engagement?.shares)} shares
            </ThemedText>
          </View>
        ) : null}
      </Pressable>

      <View className="mt-1 flex-row items-center border-t border-neutral-200 pt-1 dark:border-neutral-800">
        <FeedActionButtonGroup
          likeNum={post?.engagement?.likes ?? 0}
          commentNum={post?.comments?.length ?? 0}
          shareNum={post?.engagement?.shares ?? 0}
          onCommentPress={() =>
            router.navigate({
              pathname: "/(feeds)/feed-details/[id]",
              params: { id: post?.id },
            })
          }
        />
      </View>
    </ThemedView>
  );
}
