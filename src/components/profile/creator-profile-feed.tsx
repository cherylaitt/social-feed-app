import { Post } from "@/types/post";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";

export default function CreatorProfileFeed({ posts }: { posts: Post[] }) {
  const { width } = useWindowDimensions();
  const router = useRouter();

  // Calculate 1/3 of the screen width for the grid items
  const itemSize = width / 3;

  if (!posts || posts.length === 0) return null;

  return (
    <View className="flex-row flex-wrap pb-20">
      {posts.map((post) => {
        const isMultiImage = post.media && post.media.length > 1;

        return (
          <TouchableOpacity
            key={post.id}
            activeOpacity={0.8}
            onPress={() => router.push(`/feed-details/${post.id}`)}
            style={{ width: itemSize, height: itemSize, padding: 0.5 }}
            className="relative"
          >
            <Image
              source={{ uri: post.media[0]?.url }}
              style={{ flex: 1 }}
              contentFit="cover"
            />

            {isMultiImage && (
              <View className="absolute top-2 right-2">
                <Ionicons
                  name="copy"
                  size={16}
                  color="white"
                  style={{ opacity: 0.9 }}
                />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
