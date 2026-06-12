import FeedList from "@/components/feed/feed-list";
import ScreenLayout from "@/components/ui/screen-layout";
import { usePosts } from "@/hooks/queries/use-posts";
import { useAppStore } from "@/stores/app-store";
import { Text, View } from "react-native";

export default function FeedsScreen() {
  const { data, isLoading, isRefetching, refetch, error } = usePosts();

  const posts = data?.posts || [];

  const { showSystemAlert } = useAppStore();

  return (
    <ScreenLayout title="Home" isBackButtonShown={false} isMyIconShown={true}>
      {showSystemAlert && (
        <View>
          <Text>System Alert!</Text>
        </View>
      )}
      <FeedList
        error={error}
        posts={posts}
        isLoading={isLoading}
        isRefetching={isRefetching}
        refetchAll={refetch}
      />
    </ScreenLayout>
  );
}
