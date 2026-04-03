import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { appPalette } from "@/constants/app-colors";
import { assets } from "@/constants/assets";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export function StickyBanner() {
  return (
    <View style={styles.bannerWrapper}>
      <Pressable style={({pressed}) => [styles.bannerShadow, pressed && { paddingBottom: 0, marginTop: spacing.xxs }]} accessibilityLabel="Practicing Top 50 Questions for Big Tech Companies" accessibilityRole="button">
        <View style={styles.bannerContainer}>
          <Image source={assets.images.body} style={styles.bannerImage} contentFit="contain" cachePolicy="memory-disk" accessible={false} />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerSubtitle}>Practicing Top 50 Questions for</Text>
            <Text style={styles.bannerTitle}>Big Tech Companies</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color={appPalette.darkGray} accessible={false} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerWrapper: {
    backgroundColor: appPalette.white,
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.xxs,
  },
  bannerShadow: {
    backgroundColor: appPalette.gold,
    borderRadius: spacing.cardRadius,
    paddingBottom: spacing.xxs,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: appPalette.yellowWash,
    borderRadius: spacing.cardRadius,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    gap: spacing.s,
  },
  bannerImage: {
    width: 40,
    height: 40,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerSubtitle: {
    fontFamily: typography.fonts.manrope.medium,
    fontSize: 14,
    lineHeight: 20,
    color: appPalette.gray60,
  },
  bannerTitle: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: appPalette.ink,
    marginTop: spacing.xxxs,
  },
});
