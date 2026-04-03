import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { assets } from "@/constants/assets";

type Props = {
  size?: number;
};

export function AmazonLogo({ size = 28 }: Props) {
  return (
    <Image
      source={assets.logos.amazon}
      style={{ width: size, height: size * (29.25 / 32.3721) }}
      contentFit="contain"
      cachePolicy="memory-disk"
    />
  );
}
