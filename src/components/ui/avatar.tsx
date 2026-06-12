import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";

export default function Avatar({
  uri,
  size = 40,
}: {
  uri: string;
  size?: number;
}) {
  if (uri) {
    return (
      <Image
        source={{ uri: uri }}
        style={{
          aspectRatio: 1,
          resizeMode: "cover",
          borderRadius: 99,
          width: size,
        }}
        contentFit="cover"
      />
    );
  }

  return (
    <SymbolView
      name={{ ios: "person.crop.circle", android: "person", web: "person" }}
      size={size}
      tintColor={"#000"}
    />
  );
}
