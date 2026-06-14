import { Media } from "@/types/post";
import { Image } from "expo-image";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ImageViewing from "react-native-image-viewing";

const ImageGrid = ({ images }: { images: Media[] }) => {
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log("isViewerVisible", isViewerVisible);
  console.log("currentImageIndex", currentImageIndex);

  if (!images || images.length === 0) return null;

  const count = images.length;

  const viewerImages = images.map((img) => ({ uri: img.url }));

  const handleImagePress = (index: number, image: Media) => {
    setCurrentImageIndex(index);
    setIsViewerVisible(true);
  };

  const renderGrid = () => {
    // 1 Image Layout: Full width, square
    if (count === 1) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleImagePress(0, images[0])}
          className="w-full aspect-square"
        >
          <Image
            source={{ uri: images[0]?.url }}
            style={{ flex: 1, width: "100%", height: "100%" }}
            contentFit="cover"
          />
        </TouchableOpacity>
      );
    }

    // 2 Images Layout: Side by side (50/50)
    if (count === 2) {
      return (
        <View className="flex-row gap-1 aspect-square w-full">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleImagePress(0, images[0])}
            className="flex-1"
          >
            <Image
              source={{ uri: images[0]?.url }}
              style={{ flex: 1, width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleImagePress(1, images[1])}
            className="flex-1"
          >
            <Image
              source={{ uri: images[1]?.url }}
              style={{ flex: 1, width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>
      );
    }

    // 3 Images Layout: 1 Large on left, 2 Small stacked on right
    if (count === 3) {
      return (
        <View className="flex-row gap-1 aspect-square w-full">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleImagePress(0, images[0])}
            className="flex-1"
          >
            <Image
              source={{ uri: images[0]?.url }}
              style={{ flex: 1, width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </TouchableOpacity>
          <View className="flex-1 gap-1">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleImagePress(1, images[1])}
              className="flex-1"
            >
              <Image
                source={{ uri: images[1]?.url }}
                style={{ flex: 1, width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleImagePress(2, images[2])}
              className="flex-1"
            >
              <Image
                source={{ uri: images[2]?.url }}
                style={{ flex: 1, width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // 4+ Images Layout: 2x2 Grid with overlay on the 4th image
    const remainingCount = count - 4;

    return (
      <View className="flex-col gap-1 aspect-square w-full">
        <View className="flex-row flex-1 gap-1">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleImagePress(0, images[0])}
            className="flex-1"
          >
            <Image
              source={{ uri: images[0]?.url }}
              style={{ flex: 1, width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleImagePress(1, images[1])}
            className="flex-1"
          >
            <Image
              source={{ uri: images[1]?.url }}
              style={{ flex: 1, width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-1 gap-1">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleImagePress(2, images[2])}
            className="flex-1"
          >
            <Image
              source={{ uri: images[2]?.url }}
              style={{ flex: 1, width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleImagePress(3, images[3])}
            className="flex-1 relative"
          >
            <Image
              source={{ uri: images[3]?.url }}
              style={{ flex: 1, width: "100%", height: "100%" }}
              contentFit="cover"
            />

            {/* +X Overlay */}
            {remainingCount > 0 && (
              <View className="absolute inset-0 items-center justify-center bg-black/50">
                <Text className="text-2xl font-bold text-white">
                  +{remainingCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      {renderGrid()}

      {/* Full Screen Zoomable Image Viewer */}
      <ImageViewing
        images={viewerImages}
        imageIndex={currentImageIndex}
        visible={isViewerVisible}
        onRequestClose={() => setIsViewerVisible(false)}
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
      />
    </>
  );
};

export default ImageGrid;
