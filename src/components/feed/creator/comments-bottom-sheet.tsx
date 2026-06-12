import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Avatar from "@/components/ui/avatar";
import { Post } from "@/types/post";
import { formatRelativeTime } from "@/utils/format";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";
import { View } from "react-native";

type Props = {
  post: Post | null;
  onClose: () => void;
};

export function CommentsBottomSheet({ post, onClose }: Props) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "80%"], []);

  useEffect(() => {
    if (post) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [post]);

  // swipe to close
  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      onClose();
    }
  };

  const renderComment = ({ item }: { item: any }) => (
    <View className="flex-row gap-3 px-4 py-3 border-b border-neutral-100 dark:border-neutral-900">
      <Avatar uri={item.author?.avatarUrl} />
      <View className="flex-1">
        <View className="flex-row items-center gap-2 mb-0.5">
          <ThemedText type="smallBold" className="text-[14px]">
            {item.author?.username}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {formatRelativeTime(item.timestamp)}
          </ThemedText>
        </View>
        <ThemedText className="text-[14px] leading-5">{item.text}</ThemedText>
      </View>
    </View>
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: "#ffffff" }}
    >
      <ThemedView className="flex-1">
        <View className="items-center pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <ThemedText type="smallBold">Comments</ThemedText>
        </View>

        <BottomSheetFlatList
          data={post?.comments || []}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          ListEmptyComponent={
            <View className="py-8 items-center">
              <ThemedText themeColor="textSecondary">
                No comments yet. Be the first to reply!
              </ThemedText>
            </View>
          }
        />
      </ThemedView>
    </BottomSheet>
  );
}
