import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { Post } from "@/types/post";
import { formatCount, formatRelativeTime } from "@/utils/format";
import { FeedActionButton } from "./feed-action-button";

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
  console.log(post);

  const userDetails = post?.user_details;

  const engagementTotal =
    post?.reactions?.total_reaction_count +
    parseInt(post?.details?.comments_count) +
    parseInt(post?.details?.share_count);

  return (
    <ThemedView className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <Pressable
        accessibilityRole="button"
        className="active:opacity-80"
        onPress={() => {}}
      >
        <View className="flex-row gap-3 mb-4">
          <Avatar
            name={userDetails?.name}
            uri={userDetails?.profile_picture_url}
          />

          <View className="flex-1 gap-1">
            <View className="flex-row flex-wrap items-center gap-x-1.5">
              <ThemedText type="smallBold">{userDetails?.name}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {formatRelativeTime(post.values.publish_time)}
              </ThemedText>
            </View>
          </View>
        </View>

        {!!post?.values &&
          (() => {
            let parsedImage = null;

            try {
              if (post?.values?.photo_image) {
                parsedImage = JSON.parse(post.values.photo_image);
              }
            } catch (error) {
              console.error("Failed to parse image JSON:", error);
            }

            return (
              <>
                {!!post?.values?.text && (
                  <Text className="mb-4">{post?.values?.text}</Text>
                )}

                {post?.values?.is_media === "Photo" && parsedImage?.uri && (
                  <Image
                    source={{ uri: parsedImage.uri }}
                    style={{
                      aspectRatio: 1,
                      resizeMode: "contain",
                    }}
                  />
                )}
              </>
            );
          })()}
      </Pressable>

      {engagementTotal > 0 ? (
        <View className="mt-2 flex-row items-center justify-between px-1">
          <ThemedText type="small" themeColor="textSecondary">
            {formatCount(post?.reactions?.total_reaction_count)} likes
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {formatCount(parseInt(post?.details?.comments_count))} comments ·{" "}
            {formatCount(parseInt(post?.details?.share_count))} shares
          </ThemedText>
        </View>
      ) : null}

      <View className="mt-1 flex-row border-t border-neutral-200 pt-1 dark:border-neutral-800">
        <FeedActionButton
          icon={{ ios: "hand.thumbsup", android: "thumb_up", web: "thumb_up" }}
          label="Like"
          count={post?.reactions?.total_reaction_count ?? 0}
        />
        <FeedActionButton
          icon={{
            ios: "bubble.left",
            android: "chat_bubble",
            web: "chat_bubble",
          }}
          label="Comment"
          count={parseInt(post?.details?.comments_count) ?? 0}
        />
        <FeedActionButton
          icon={{
            ios: "arrowshape.turn.up.right",
            android: "share",
            web: "share",
          }}
          label="Share"
          count={parseInt(post?.details?.share_count) ?? 0}
        />
      </View>
    </ThemedView>
  );
}
