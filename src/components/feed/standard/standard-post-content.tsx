import { ThemedText } from "@/components/themed-text";
import Avatar from "@/components/ui/avatar";
import { Post } from "@/types/post";
import { formatRelativeTime } from "@/utils/format";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import ImageGrid from "./image-grid";

export default function StandardPostContent({ post }: { post: Post }) {
  const router = useRouter();

  return (
    <>
      <Pressable
        onPress={() =>
          router.navigate({
            pathname: "/(profiles)/[id]",
            params: { id: post?.author?.id },
          })
        }
      >
        <View className="flex-row gap-3 mb-4 items-center">
          <Avatar uri={post?.author?.avatarUrl} />

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
      </Pressable>

      {!!post?.content && <Text className="mb-4">{post.content}</Text>}

      {!!post?.media && post.media?.length > 0 && (
        <ImageGrid images={post.media} onPressImage={() => {}} />
      )}
    </>
  );
}
