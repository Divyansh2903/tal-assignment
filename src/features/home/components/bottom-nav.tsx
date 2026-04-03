import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { MainTabParamList } from "@/navigation/types";
import {
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  Platform,
  Alert,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Rect } from "react-native-svg";
import { appPalette } from "@/constants/app-colors";
import { assets } from "@/constants/assets";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export function BottomNav() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bottomNavWrapper, { bottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.bottomNavShadow}>
        <View style={styles.bottomNavContainer}>
          <TouchableOpacity style={styles.navItem} onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); navigation.navigate("Home"); }} accessibilityLabel="Home tab" accessibilityRole="tab">
            <Image source={assets.icons.home} style={styles.navIcon} contentFit="contain" cachePolicy="memory-disk" accessible={false} />
            <Text style={[styles.navText, { color: appPalette.orangeAlt }]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); navigation.navigate("Settings"); }} accessibilityLabel="Settings tab" accessibilityRole="tab">
            <Image source={assets.icons.settings} style={styles.navIcon} contentFit="contain" cachePolicy="memory-disk" accessible={false} />
            <Text style={[styles.navText, { color: appPalette.ink4 }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navItemActiveWrapper}>
        <Pressable style={({pressed}) => [styles.navItemActiveShadow, pressed && { paddingBottom: 0, marginTop: spacing.xxs }]} onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            if (Platform.OS === "android") {
              ToastAndroid.show("Coming soon!", ToastAndroid.SHORT);
            } else {
              Alert.alert("Coming soon!");
            }
          }} accessibilityLabel="Store tab" accessibilityRole="tab">
          <View style={styles.navItemActive}>
            <View>
              <View style={[StyleSheet.absoluteFill, { backgroundColor: appPalette.blueWash, borderRadius: 34, overflow: "hidden" }]}>
                <Svg width="68" height="68" viewBox="0 0 68 68" fill="none">
                  <Rect x="-15" y="-20" width="16" height="120" transform="rotate(30 -15 -20)" fill="white" fillOpacity={0.4} />
                  <Rect x="15" y="-20" width="16" height="120" transform="rotate(30 15 -20)" fill="white" fillOpacity={0.4} />
                  <Rect x="45" y="-20" width="16" height="120" transform="rotate(30 45 -20)" fill="white" fillOpacity={0.4} />
                </Svg>
              </View>
            </View>
            <Image source={assets.icons.store} style={[styles.navIcon, { zIndex: 2, marginBottom: spacing.xxxs }]} contentFit="contain" cachePolicy="memory-disk" accessible={false} />
            <Text style={[styles.navText, { color: appPalette.ink4, zIndex: 2 }]}>Store</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavWrapper: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  bottomNavShadow: {
    backgroundColor: appPalette.separator,
    borderRadius: 99999,
    paddingBottom: spacing.xxs,
    height: 72,
  },
  bottomNavContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.m,
    gap: spacing.xl,
    width: 172,
    height: 68,
    backgroundColor: appPalette.white,
    borderWidth: 1,
    borderColor: appPalette.separator,
    borderRadius: 99999,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 54,
  },
  navItemActiveWrapper: {
    marginLeft: spacing.s,
  },
  navItemActiveShadow: {
    backgroundColor: appPalette.blueLight,
    borderRadius: 34,
    paddingBottom: spacing.xxs,
    height: 72,
    width: 68,
  },
  navItemActive: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1,
    borderColor: appPalette.blueLight,
    backgroundColor: appPalette.blueWash,
    alignItems: "center",
    justifyContent: "center",
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navText: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 12,
    marginTop: spacing.xxs,
  },
});
