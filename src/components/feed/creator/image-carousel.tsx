import { Media } from "@/types/post";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";

export default function ImageCarousel({ images }: { images: Media[] }) {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which image is currently visible to update the pagination dots
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  if (!images || images.length === 0) return null;

  return (
    <View className="relative">
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            // 4:5 is the standard Instagram portrait aspect ratio
            style={{ width, aspectRatio: 4 / 5 }}
            contentFit="cover"
          />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Pagination Dots (Only show if multiple images) */}
      {images.length > 1 && (
        <View className="absolute bottom-4 w-full flex-row justify-center gap-1.5">
          {images.map((_, index) => (
            <View
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-1.5 bg-blue-500"
                  : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
