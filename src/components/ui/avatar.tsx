import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";

export default function Avatar({ uri }: { uri: string }) {
  if (uri) {
    return (
      <Image
        source={{ uri: uri }}
        style={{
          aspectRatio: 1,
          resizeMode: "cover",
          borderRadius: 99,
          width: 40,
        }}
        contentFit="cover"
      />
    );
  }

  return (
    <SymbolView
      name={{ ios: "person.crop.circle", android: "person", web: "person" }}
      size={40}
      tintColor={"#000"}
    />
  );
}
