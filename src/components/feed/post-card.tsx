import { Image } from "expo-image";
import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from "expo-web-browser";
import { Pressable, View } from "react-native";

import { FeedActionButton } from "@/components/feed/feed-action-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { Post } from "@/types/post";
import { formatCount, formatRelativeTime } from "@/utils/format";

type PostCardProps = {
  post: Post;
};

function Avatar({ name, uri }: { name: string; uri?: string }) {
  const initial = name.charAt(0).toUpperCase();

  if (uri) {
    return (
      <Image
        source={{ uri }}
        className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800"
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

export function PostCard({ post }: PostCardProps) {
  const handleOpenPost = async () => {
    if (!post.url) {
      return;
    }

    await openBrowserAsync(post.url, {
      presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
    });
  };

  const engagementTotal =
    post.reactionsCount + post.commentsCount + post.sharesCount;

  return (
    <ThemedView className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <Pressable
        accessibilityRole="button"
        className="active:opacity-80"
        onPress={handleOpenPost}
      >
        <View className="flex-row gap-3">
          {/* <Avatar name={post.authorName} uri={post.authorAvatar} /> */}

          <View className="flex-1 gap-1">
            <View className="flex-row flex-wrap items-center gap-x-1.5">
              <ThemedText type="smallBold">{post.authorName}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                · {formatRelativeTime(post.publishedAt)}
              </ThemedText>
            </View>

            {post.message ? (
              <ThemedText className="leading-5">{post.message}</ThemedText>
            ) : null}
          </View>
        </View>

        {post.imageUrl ? (
          <Image
            source={{ uri: post.imageUrl }}
            className="mt-3 h-56 w-full rounded-2xl bg-neutral-100 dark:bg-neutral-900"
            contentFit="cover"
            transition={200}
          />
        ) : null}
      </Pressable>

      {engagementTotal > 0 ? (
        <View className="mt-2 flex-row items-center justify-between px-1">
          <ThemedText type="small" themeColor="textSecondary">
            {formatCount(post.reactionsCount)} likes
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {formatCount(post.commentsCount)} comments ·{" "}
            {formatCount(post.sharesCount)} shares
          </ThemedText>
        </View>
      ) : null}

      <View className="mt-1 flex-row border-t border-neutral-200 pt-1 dark:border-neutral-800">
        <FeedActionButton
          icon={{ ios: "hand.thumbsup", android: "thumb_up", web: "thumb_up" }}
          label="Like"
          count={post.reactionsCount}
        />
        <FeedActionButton
          icon={{
            ios: "bubble.left",
            android: "chat_bubble",
            web: "chat_bubble",
          }}
          label="Comment"
          count={post.commentsCount}
        />
        <FeedActionButton
          icon={{
            ios: "arrowshape.turn.up.right",
            android: "share",
            web: "share",
          }}
          label="Share"
          count={post.sharesCount}
          onPress={handleOpenPost}
        />
      </View>
    </ThemedView>
  );
}
