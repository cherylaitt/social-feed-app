import { Post } from "@/types/post";
import { View } from "react-native";
import { StandardPostCard } from "../feed/standard/standard-post-card";

export default function StandardProfileFeed({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <View className="pb-20">
      {posts.map((post) => (
        <View
          key={post.id}
          className="border-b border-neutral-200 dark:border-neutral-800"
        >
          <StandardPostCard post={post} />
        </View>
      ))}
    </View>
  );
}
