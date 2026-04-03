import { Image } from "expo-image";

import { assets } from "@/constants/assets";

type Props = {
  size?: number;
};

export function SwiggyLogo({ size = 44 }: Props) {
  return (
    <Image
      source={assets.logos.swiggy}
      style={{ width: size, height: size }}
      contentFit="cover"
      cachePolicy="memory-disk"
    />
  );
}
