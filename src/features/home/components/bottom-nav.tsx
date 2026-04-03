import { triggerHaptic } from "@/utils/haptics";
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
import Svg, { Defs, LinearGradient as SvgLinearGradient, Path, Rect, Stop } from "react-native-svg";
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
          <TouchableOpacity style={styles.navItem} onPress={() => { triggerHaptic("light"); navigation.navigate("Home"); }} accessibilityLabel="Home tab" accessibilityRole="tab">
            <Svg width="22" height="20" viewBox="0 0 24 22" fill="none" accessible={false}>
              <Defs>
                <SvgLinearGradient id="homeGrad" x1="11.7499" y1="0" x2="11.7499" y2="21.8428" gradientUnits="userSpaceOnUse">
                  <Stop stopColor={appPalette.orangeVivid} />
                  <Stop offset="1" stopColor={appPalette.orangeRed} />
                </SvgLinearGradient>
              </Defs>
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2822 0.23247C11.2362 -0.0774826 12.2637 -0.0774976 13.2177 0.23247C13.806 0.423619 14.3186 0.764427 14.8642 1.22759C15.4031 1.68511 16.0224 2.3047 16.8056 3.08794L23.2802 9.56255C23.5731 9.85542 23.573 10.3302 23.2802 10.6231C22.9873 10.916 22.5126 10.916 22.2197 10.6231L21.7099 10.1133L20.5146 16.0948C20.3335 17.0002 20.1899 17.72 20.0292 18.2969C19.8661 18.8828 19.6717 19.3725 19.3652 19.8116C18.8642 20.5292 18.175 21.0948 17.373 21.4454C16.8822 21.6598 16.3634 21.7538 15.7568 21.7989C15.1597 21.8432 14.4261 21.8428 13.5029 21.8428H9.99701C9.07377 21.8428 8.34023 21.8432 7.74311 21.7989C7.1365 21.7538 6.61768 21.6598 6.1269 21.4454C5.32489 21.0948 4.63572 20.5293 4.13471 19.8116C3.82818 19.3724 3.63381 18.8828 3.47065 18.2969C3.31001 17.72 3.16639 17.0002 2.98529 16.0948L1.78901 10.1133L1.28022 10.6231C0.987323 10.916 0.512562 10.916 0.219669 10.6231C-0.0732225 10.3302 -0.0732236 9.85544 0.219669 9.56255L6.69428 3.08794C7.47749 2.30473 8.09676 1.6851 8.63568 1.22759C9.18126 0.764446 9.69393 0.42361 10.2822 0.23247ZM11.7499 8.09282C10.0931 8.09282 8.74998 9.436 8.74994 11.0928C8.74994 12.7497 10.0931 14.0928 11.7499 14.0928C13.4068 14.0928 14.7499 12.7497 14.7499 11.0928C14.7499 9.43601 13.4068 8.09285 11.7499 8.09282Z"
                fill="url(#homeGrad)"
              />
            </Svg>
            <Text style={[styles.navText, { color: appPalette.orangeAlt }]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => { triggerHaptic("light"); navigation.navigate("Settings"); }} accessibilityLabel="Settings tab" accessibilityRole="tab">
            <Svg width="22" height="21" viewBox="0 0 23 22" fill="none" accessible={false}>
              <Path
                d="M2.25 0.75H20.25M2.25 0.75V8.35C2.25 10.5902 2.25 11.7103 2.68597 12.566C3.06947 13.3186 3.68139 13.9305 4.43404 14.314C5.28968 14.75 6.40979 14.75 8.65 14.75H13.85C16.0902 14.75 17.2103 14.75 18.066 14.314C18.8186 13.9305 19.4305 13.3186 19.814 12.566C20.25 11.7103 20.25 10.5902 20.25 8.35V0.75M2.25 0.75H0.75M20.25 0.75H21.75M7.25 7.75V9.75M11.25 5.75V9.75M15.25 6.75V9.75M11.25 14.75V17.75M11.25 17.75L6.25 20.75M11.25 17.75L16.25 20.75M11.25 17.75V20.75"
                stroke={appPalette.ink4}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={[styles.navText, { color: appPalette.ink4 }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navItemActiveWrapper}>
        <Pressable style={({pressed}) => [styles.navItemActiveShadow, pressed && { paddingBottom: 0, marginTop: spacing.xxs }]} onPress={() => {
            triggerHaptic("light");
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
            <Svg width="19" height="20" viewBox="0 0 19 20" fill="none" style={{ zIndex: 2, marginBottom: spacing.xxxs }} accessible={false}>
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.45905 0C11.6551 0.000160619 13.4701 1.62649 13.7686 3.74023C14.2325 3.787 14.6132 3.86304 14.963 3.98828C16.3854 4.49775 17.5357 5.57083 18.1436 6.9541C18.5278 7.82844 18.6053 8.92745 18.7598 11.125C18.9352 13.6193 19.0222 14.8663 18.7071 15.8643C18.2082 17.4443 17.0237 18.7157 15.4825 19.3242C14.5092 19.7084 13.2589 19.708 10.7589 19.708H8.15924C5.6587 19.708 4.40803 19.7086 3.43464 19.3242C1.89359 18.7156 0.708937 17.4442 0.210026 15.8643C-0.105003 14.8664 -0.0171011 13.6191 0.158268 11.125C0.312791 8.92734 0.390274 7.82846 0.774479 6.9541C1.38245 5.57077 2.53258 4.49773 3.95514 3.98828C4.30468 3.86312 4.68495 3.787 5.1485 3.74023C5.44707 1.62641 7.26291 6.47322e-05 9.45905 0ZM5.79206 7.10449C5.28596 7.10456 4.87524 7.51444 4.87506 8.02051C4.87506 8.52673 5.28585 8.93743 5.79206 8.9375C6.29832 8.9375 6.70905 8.52677 6.70905 8.02051C6.70887 7.5144 6.29821 7.10449 5.79206 7.10449ZM13.1251 7.10449C12.6191 7.10473 12.2092 7.51455 12.209 8.02051C12.209 8.52662 12.619 8.93726 13.1251 8.9375C13.6313 8.9375 14.0421 8.52677 14.0421 8.02051C14.0419 7.5144 13.6312 7.10449 13.1251 7.10449ZM9.45905 1.375C8.04808 1.37506 6.86772 2.35665 6.55964 3.67383C7.02075 3.66694 7.54754 3.66699 8.15924 3.66699H10.7589C11.3697 3.66699 11.8959 3.66696 12.3565 3.67383C12.0485 2.35685 10.8698 1.37515 9.45905 1.375Z"
                fill="#1F364D"
              />
            </Svg>
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
    gap: spacing.l,
    width: 210,
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
