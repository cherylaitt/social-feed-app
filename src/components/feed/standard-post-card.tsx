import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { Post } from "@/types/post";
import { formatCount, formatRelativeTime } from "@/utils/format";
import { FeedActionButton } from "./feed-action-button";
import ImageGrid from "./image-grid";

type StandardPostCardProps = {
  post: Post;
};

function Avatar({ name, uri }: { name: string; uri: string }) {
  const initial = name.charAt(0).toUpperCase();

  if (uri) {
    return (
      <Image
        source={{ uri: uri }}
        style={{
          aspectRatio: 1,
          resizeMode: "cover",
        }}
        contentFit="cover"
      />
    );
  }

  return (
    <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-500">
      <ThemedText type="smallBold" style={{ color: "#ffffff" }}>
        {initial}
      </ThemedText>
    </View>
  );
}

export function StandardPostCard({ post }: StandardPostCardProps) {
  const engagementTotal =
    post?.engagement?.likes + post?.engagement?.shares + post?.comments?.length;

  return (
    <ThemedView className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <Pressable
        accessibilityRole="button"
        className="active:opacity-80"
        onPress={() => {}}
      >
        <View className="flex-row gap-3 mb-4">
          <Avatar name={post?.author?.username} uri={post?.author?.avatarUrl} />

          <View className="flex-1 gap-1">
            <View className="flex-row flex-wrap items-center gap-x-1.5">
              <ThemedText type="smallBold">
                {post?.author?.fullName || post?.author?.username}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {formatRelativeTime(post?.timestamp)}
              </ThemedText>
            </View>
          </View>
        </View>

        {!!post?.content && <Text className="mb-4">{post.content}</Text>}

        {!!post?.media && post.media?.length > 0 && (
          <ImageGrid images={post.media} onPressImage={() => {}} />
        )}
      </Pressable>

      {engagementTotal > 0 ? (
        <View className="mt-2 flex-row items-center justify-between px-1">
          <ThemedText type="small" themeColor="textSecondary">
            {formatCount(post?.engagement?.likes)} likes
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {formatCount(post?.comments?.length)} comments ·{" "}
            {formatCount(post?.engagement?.shares)} shares
          </ThemedText>
        </View>
      ) : null}

      <View className="mt-1 flex-row border-t border-neutral-200 pt-1 dark:border-neutral-800">
        <FeedActionButton
          icon={{ ios: "heart", android: "favorite", web: "favorite" }}
          label="Like"
          count={post?.engagement?.likes ?? 0}
        />
        <FeedActionButton
          icon={{
            ios: "bubble.left",
            android: "chat_bubble",
            web: "chat_bubble",
          }}
          label="Comment"
          count={post?.comments?.length ?? 0}
        />
        <FeedActionButton
          icon={{
            ios: "arrowshape.turn.up.right",
            android: "share",
            web: "share",
          }}
          label="Share"
          count={post?.engagement?.shares ?? 0}
        />
      </View>
    </ThemedView>
  );
}
