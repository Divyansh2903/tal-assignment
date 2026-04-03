import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { assets } from "@/constants/assets";
import type { AuthStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";

type Props = NativeStackScreenProps<AuthStackParamList, "Splash">;

export function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={assets.images.fullLogo}
        style={styles.logo}
        contentFit="contain"
        cachePolicy="memory-disk"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 220,
    height: 60,
  },
});
