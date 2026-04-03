import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { assets } from "@/constants/assets";
import { appPalette } from "@/constants/app-colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { RootStackParamList } from "@/navigation/types";
import { SettingsRow } from "../components/settings-row";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Auth" }],
    });
  };

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} accessibilityLabel="Go back" accessibilityRole="button">
          <Ionicons name="chevron-back" size={24} color={appPalette.darkGray} accessible={false} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bannerContainer}>
          <View style={StyleSheet.absoluteFillObject}>
            <View
              style={{
                position: "absolute",
                width: 26,
                height: 200,
                backgroundColor: appPalette.overlayWhite8,
                borderRadius: spacing.inputRadius,
                transform: [{ rotate: "51deg" }],
                 left: 15,
                top: -60,
              }}
            />
            <View
              style={{
                position: "absolute",
                width: 31,
                height: 250,
                backgroundColor: appPalette.overlayWhite8,
                borderRadius: spacing.inputRadius,
                transform: [{ rotate: "51deg" }],
                left: 15,
                top: -60,
              }}
            />
          </View>

          <View style={styles.bannerContent}>
            <View style={styles.bannerTextContent}>
              <Text style={styles.bannerSubtitle}>3 days free trial for</Text>
              <Text style={styles.bannerPrice}>₹1</Text>
              <Text style={styles.bannerFootnote}>Then ₹299/month</Text>
            </View>
            <Image
              source={assets.images.happyGirl}
              style={styles.bannerImage}
              contentFit="contain"
              cachePolicy="memory-disk"
              accessible={false}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bannerButtonWrapper}
            accessibilityLabel="Start 3 days trial at 1 rupee"
            accessibilityRole="button"
          >
            <LinearGradient
              colors={[appPalette.bannerGradientStart, appPalette.bannerGradientEnd]}
              start={{ x: 1, y: 0.5 }}
              end={{ x: 0, y: 0.5 }}
              style={styles.bannerButton}
            >
              <Text style={styles.bannerButtonText}>
                START 3 DAYS TRIAL @ ₹1
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <SettingsRow
            icon={
              <Svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={styles.icon}
              >
                <Path
                  d="M14.6667 3.33325V3.99992C14.6667 4.77937 14.6667 5.16909 14.5499 5.48012C14.3643 5.97427 13.9744 6.36421 13.4802 6.54978C13.1692 6.66658 12.7794 6.66658 12 6.66658C11.2205 6.66658 10.8308 6.66658 10.5198 6.54978C10.0256 6.36421 9.63571 5.97427 9.45014 5.48012C9.33333 5.16909 9.33333 4.77937 9.33333 3.99992C9.33333 3.22047 9.33333 2.83075 9.45014 2.51971C9.63571 2.02556 10.0256 1.63563 10.5198 1.45006C10.8308 1.33325 11.2205 1.33325 12 1.33325H12.6667M12 14.6666C11.2205 14.6666 10.8308 14.6666 10.5198 14.5498C10.0256 14.3642 9.63571 13.9743 9.45014 13.4801C9.33333 13.1691 9.33333 12.7794 9.33333 11.9999C9.33333 11.2205 9.33333 10.8307 9.45014 10.5197C9.63571 10.0256 10.0256 9.63563 10.5198 9.45006C10.8308 9.33325 11.2205 9.33325 12 9.33325C12.7794 9.33325 13.1692 9.33325 13.4802 9.45006C13.9744 9.63563 14.3643 10.0256 14.5499 10.5197C14.6667 10.8307 14.6667 11.2205 14.6667 11.9999C14.6667 12.7794 14.6667 13.1691 14.5499 13.4801C14.3643 13.9743 13.9744 14.3642 13.4802 14.5498C13.1692 14.6666 12.7794 14.6666 12 14.6666ZM4 9.33325C4.77945 9.33325 5.16917 9.33325 5.4802 9.45006C5.97435 9.63563 6.36429 10.0256 6.54986 10.5197C6.66667 10.8307 6.66667 11.2205 6.66667 11.9999C6.66667 12.7794 6.66667 13.1691 6.54986 13.4801C6.36429 13.9743 5.97435 14.3642 5.4802 14.5498C5.16917 14.6666 4.77945 14.6666 4 14.6666C3.22055 14.6666 2.83083 14.6666 2.51979 14.5498C2.02564 14.3642 1.63571 13.9743 1.45014 13.4801C1.33333 13.1691 1.33333 12.7794 1.33333 11.9999C1.33333 11.2205 1.33333 10.8307 1.45014 10.5197C1.63571 10.0256 2.02564 9.63563 2.51979 9.45006C2.83083 9.33325 3.22055 9.33325 4 9.33325ZM4 6.66658C3.22055 6.66658 2.83083 6.66658 2.51979 6.54978C2.02564 6.36421 1.63571 5.97427 1.45014 5.48012C1.33333 5.16909 1.33333 4.77937 1.33333 3.99992C1.33333 3.22047 1.33333 2.83075 1.45014 2.51971C1.63571 2.02556 2.02564 1.63563 2.51979 1.45006C2.83083 1.33325 3.22055 1.33325 4 1.33325C4.77945 1.33325 5.16917 1.33325 5.4802 1.45006C5.97435 1.63563 6.36429 2.02556 6.54986 2.51971C6.66667 2.83075 6.66667 3.22047 6.66667 3.99992C6.66667 4.77937 6.66667 5.16909 6.54986 5.48012C6.36429 5.97427 5.97435 6.36421 5.4802 6.54978C5.16917 6.66658 4.77945 6.66658 4 6.66658Z"
                  stroke={appPalette.inkMuted}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            }
            label="New update available"
            accessibilityLabel="New update available"
            onPress={() => {}}
            rightElement={
              <View style={styles.iconButton}>
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <Path
                    d="M14.2333 8.89991V9.23324C14.2333 11.9947 11.9948 14.2332 9.23333 14.2332H8.9M0.899994 8.8999L0.899994 9.23324C0.899994 11.9947 3.13857 14.2332 5.9 14.2332H6.23333M7.56666 0.899902V8.8999L4.9 6.23324M9.23333 7.23324L10.2333 6.23324"
                    stroke={appPalette.tealAccent}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            }
          />
        </View>

        <View style={styles.card}>
          <SettingsRow
            icon={
              <Svg
                width="13.33"
                height="13.33"
                viewBox="0 0 15 15"
                fill="none"
                style={[styles.icon, { marginTop: 1.33, marginLeft: 1.33 }]}
              >
                <Path
                  d="M3.62524 6.75L3.80347 6.53818C3.80378 6.53782 3.80393 6.53763 3.80407 6.53746C4.74856 5.41474 5.0972 3.90711 4.7415 2.48372C4.74145 2.4835 4.74139 2.48327 4.74128 2.48281L4.69798 2.30964C4.46883 1.39303 3.64525 0.75 2.70043 0.75C1.56327 0.75 0.625814 1.67541 0.764216 2.80413C1.00666 4.78133 1.6026 6.55729 2.50335 8.08333C3.47342 9.72681 4.79702 11.0804 6.41332 12.0833C7.98948 13.0613 9.844 13.7059 11.9205 13.9605C13.0492 14.0989 13.9747 13.1413 13.9747 12.0041C13.9747 11.0593 13.3317 10.2559 12.4151 10.0268L12.1713 9.96581C12.0867 9.94467 12.0445 9.9341 12.0039 9.92475C10.7197 9.62839 9.36997 9.90039 8.30073 10.6711C8.26698 10.6954 8.2321 10.7215 8.16234 10.7737L7.97474 10.9142"
                  stroke={appPalette.inkMuted}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            }
            label="Phone number"
            rightElement={<Text style={styles.rowValue}>+91 9608184703</Text>}
          />
          <View style={styles.divider} />
          <SettingsRow
            icon={
              <Svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                style={styles.icon}
              >
                <Path
                  d="M0.75 5.33341V5.00008C0.75 2.97504 2.39162 1.33341 4.41666 1.33341H7.41667C8.51063 1.33341 9.05761 1.33341 9.51453 1.41113C11.8136 1.80216 13.6146 3.60317 14.0056 5.90222C14.0833 6.35914 14.0833 6.90612 14.0833 8.00008C14.0833 9.09404 14.0833 9.64102 14.0056 10.0979C13.6146 12.397 11.8136 14.198 9.51453 14.589C9.05761 14.6667 8.51063 14.6667 7.41666 14.6667H6.41666C6.2519 14.6667 6.16952 14.6667 6.09985 14.665C3.17748 14.5908 0.825986 12.2393 0.751769 9.3169C0.75 9.24723 0.75 9.16485 0.75 9.00008V8.66675M4.75 0.666748V2.66675M10.0833 0.666748V2.66675M4.75 8.00008H7.41667M7.41667 8.00008H10.0833M7.41667 8.00008V5.33341M7.41667 8.00008V10.6667"
                  stroke={appPalette.inkMuted}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            }
            label="Learning since"
            rightElement={<Text style={styles.rowValue}>August 17, 2025</Text>}
          />
        </View>

        <View style={styles.card}>
          <SettingsRow
            icon={
              <Svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                style={styles.icon}
              >
                <Path
                  d="M5.40148 11.9954C5.15835 11.9502 4.92704 11.8875 4.70322 11.8075C4.21732 11.6337 3.97435 11.5468 3.88113 11.5248C3.02098 11.3225 2.66415 11.9121 1.9228 12.0356C1.55868 12.0962 1.23469 11.7981 1.26491 11.4302C1.29133 11.1085 1.5138 10.8043 1.60258 10.4954C1.78713 9.85319 1.5367 9.36626 1.27212 8.79513C0.937083 8.07188 0.75 7.2661 0.75 6.41667C0.75 3.28705 3.28705 0.75 6.41667 0.75C8.44457 0.75 10.2237 1.81523 11.225 3.41667M9.41667 5.64427C9.83371 5.49687 10.2825 5.41667 10.75 5.41667C12.9591 5.41667 14.75 7.20753 14.75 9.41667C14.75 10.0163 14.6179 10.5851 14.3814 11.0956C14.1947 11.4987 14.0179 11.8424 14.1482 12.2958C14.2108 12.5138 14.3679 12.7286 14.3865 12.9557C14.4079 13.2153 14.1792 13.4258 13.9221 13.383C13.3988 13.2958 13.147 12.8796 12.5398 13.0224C12.474 13.0379 12.3025 13.0993 11.9595 13.2219C11.5966 13.3518 11.2057 13.4167 10.75 13.4167C8.54086 13.4167 6.75 11.6258 6.75 9.41667C6.75 8.68809 6.94479 8.00501 7.28513 7.41667"
                  stroke={appPalette.inkMuted}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            }
            label="Chat with us"
            accessibilityLabel="Chat with us"
            onPress={() => {}}
            rightElement={<Ionicons name="chevron-forward" size={20} color={appPalette.systemGray4} accessible={false} />}
          />
          <View style={styles.divider} />
          <SettingsRow
            icon={
              <Svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={styles.icon}
              >
                <Path
                  d="M10.6667 6.66658L11 6.66659C11.0067 6.66659 11.01 6.66659 11.0128 6.66659C13.0295 6.6697 14.6635 8.30375 14.6667 10.3204C14.6667 10.3232 14.6667 10.3266 14.6667 10.3333V10.6666C14.6667 10.9828 14.6667 11.1409 14.6569 11.2743C14.5244 13.0847 13.0848 14.5243 11.2744 14.6568C11.141 14.6666 10.9829 14.6666 10.6667 14.6666L9.66666 14.6666L9.33333 14.6666M5.33333 6.66658H5C4.99332 6.66658 4.98998 6.66658 4.98716 6.66659C2.9705 6.6697 1.33645 8.30375 1.33334 10.3204C1.33333 10.3232 1.33333 10.3266 1.33333 10.3333L1.33333 10.6666C1.33333 10.9828 1.33333 11.1409 1.3431 11.2743C1.47565 13.0847 2.91523 14.5243 4.72559 14.6568C4.85902 14.6666 5.01712 14.6666 5.33333 14.6666L6.33333 14.6666L6.66667 14.6666M8 9.99992L8 1.33325L5.33333 3.99992M9.66666 2.99992L10.6667 3.99992"
                  stroke={appPalette.inkMuted}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            }
            label="Share the app"
            accessibilityLabel="Share the app"
            onPress={() => {}}
            rightElement={<Ionicons name="chevron-forward" size={20} color={appPalette.systemGray4} accessible={false} />}
          />
          <View style={styles.divider} />
          <SettingsRow
            icon={
              <Svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={styles.icon}
              >
                <Path
                  d="M3.18611 12C2.8722 12.9386 2.74584 13.4828 2.89138 13.8393C3.04903 14.2254 3.37828 14.5155 3.78117 14.6233C4.26973 14.754 5.02055 14.3786 6.52221 13.6278L6.9521 13.4129C7.39423 13.1918 7.61529 13.0813 7.85034 13.0547C7.9498 13.0435 8.05021 13.0435 8.14966 13.0547C8.38472 13.0813 8.60578 13.1918 9.04791 13.4129L9.47779 13.6278C10.9794 14.3786 11.7303 14.754 12.2188 14.6233C12.6217 14.5155 12.951 14.2254 13.1086 13.8393C13.2998 13.3711 13.0219 12.579 12.466 10.9948C12.2954 10.5086 12.2101 10.2655 12.2142 10.0266C12.2176 9.82545 12.2665 9.62768 12.3573 9.44812C12.465 9.23491 12.6538 9.0596 13.0314 8.70899L13.1253 8.62176C14.3218 7.51072 14.9201 6.9552 14.9564 6.42898C14.9805 6.08067 14.867 5.73682 14.6403 5.47129C14.2978 5.07014 13.4863 4.97999 11.8635 4.79967C11.3996 4.74813 11.1677 4.72236 10.9674 4.62819C10.8309 4.56398 10.7063 4.47707 10.5988 4.37116C10.4412 4.21582 10.3369 4.00707 10.1281 3.58959L10.0964 3.52618C9.31654 1.96644 8.92661 1.18657 8.35313 1.02906C8.12199 0.965575 7.87801 0.965574 7.64687 1.02906C7.0734 1.18657 6.68346 1.96644 5.90359 3.52618L5.87188 3.58959C5.66314 4.00708 5.55877 4.21582 5.40118 4.37116C5.29374 4.47707 5.1691 4.56398 5.03257 4.62819C4.83233 4.72236 4.60037 4.74813 4.13647 4.79967C2.51365 4.97999 1.70225 5.07014 1.35974 5.47129C1.13303 5.73682 1.01951 6.08067 1.04358 6.42898C1.07994 6.9552 1.67819 7.51072 2.8747 8.62176L2.96863 8.70899C3.21974 8.94216 3.43499 9.1921 3.55102 9.33337"
                  stroke={appPalette.inkMuted}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            }
            label="Rate the app"
            accessibilityLabel="Rate the app"
            onPress={() => {}}
            rightElement={<Ionicons name="chevron-forward" size={20} color={appPalette.systemGray4} accessible={false} />}
          />
          <View style={styles.divider} />
          <SettingsRow
            icon={
              <Svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={styles.icon}
              >
                <Path
                  d="M6.66667 1.3335H6.33333C5.08626 1.3335 4.46272 1.3335 3.95442 1.48391C2.76549 1.83573 1.83557 2.76565 1.48374 3.95459C1.33333 4.46288 1.33333 5.08642 1.33333 6.3335V6.66683M6.66667 14.6668H6.33333C5.08626 14.6668 4.46272 14.6668 3.95442 14.5164C2.76549 14.1646 1.83557 13.2347 1.48374 12.0457C1.33333 11.5374 1.33333 10.9139 1.33333 9.66683V9.3335M6.66667 8.00016H14.6667L12 5.3335M13 9.66683L12 10.6668"
                  stroke={appPalette.systemGray}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            }
            label="Log out"
            accessibilityLabel="Log out"
            onPress={handleLogout}
            rightElement={<Ionicons name="chevron-forward" size={20} color={appPalette.systemGray4} accessible={false} />}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>App version v2.14.2</Text>
          <Text style={styles.footerText}>Made with ♥ from India</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: appPalette.fillTertiary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
  },
  backButton: {
    padding: spacing.xs,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: typography.fonts.manrope.semiBold,
    color: appPalette.nearBlack,
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.s,
    paddingBottom: spacing.xxxl,
  },
  bannerContainer: {
    backgroundColor: appPalette.ink,
    borderRadius: spacing.xl,
    overflow: "hidden",
    paddingTop: spacing.l,
    paddingBottom: spacing.l,
    paddingHorizontal: spacing.m,
    gap: 18,
    marginBottom: spacing.l,
  },
  bannerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },
  bannerTextContent: {
    flex: 1,
  },
  bannerSubtitle: {
    color: appPalette.white,
    fontSize: 16,
    fontFamily: typography.fonts.manrope.bold,
    marginBottom: spacing.xxs,
  },
  bannerPrice: {
    color: appPalette.yellowBright,
    fontSize: 32,
    fontFamily: typography.fonts.manrope.bold,
    marginBottom: spacing.xxs,
  },
  bannerFootnote: {
    color: appPalette.systemGray6,
    fontSize: 14,
    fontFamily: typography.fonts.manrope.normal,
  },
  bannerImage: {
    width: 175,
    height: 255,
    position: "absolute",
    right: -12,
    top: -55,
  },
  bannerButtonWrapper: {
    zIndex: 2,
    backgroundColor: appPalette.bannerButtonOverlay,
    borderRadius: 18,
    paddingBottom: spacing.xxs,
  },
  bannerButton: {
    borderRadius: spacing.cardRadius,
    paddingTop: spacing.m,
    paddingBottom: spacing.m,
    alignItems: "center",
  },
  bannerButtonText: {
    color: appPalette.goldDark,
    fontSize: 14,
    fontFamily: typography.fonts.inter.bold,
    letterSpacing: 0.8,
    lineHeight: 18,
    textAlign: "center",
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: appPalette.white,
    borderRadius: spacing.xl,
    borderWidth: 1,
    borderColor: appPalette.systemGray6,
    marginBottom: spacing.m,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.m,
  },
  icon: {
    marginRight: spacing.s,
  },
  rowValue: {
    fontSize: 14,
    color: appPalette.systemGray3,
    fontFamily: typography.fonts.inter.normal,
    letterSpacing: -0.14,
  },
  iconButton: {
    backgroundColor: appPalette.tealWash,
    paddingVertical: spacing.xs,
    paddingHorizontal: 10,
    borderRadius: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: appPalette.fillSecondary,
    marginLeft: 28,
  },
  footer: {
    alignItems: "center",
    marginTop: spacing.m,
  },
  footerText: {
    fontSize: 13,
    color: appPalette.overlayBlack64,
    fontFamily: typography.fonts.inter.medium,
    letterSpacing: -0.13,
    marginTop: spacing.xxs,
    opacity: 0.4,
  },
});
