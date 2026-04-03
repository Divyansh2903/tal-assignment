import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { assets } from "@/constants/assets";
import { appPalette } from "@/constants/app-colors";
import type { RootStackParamList } from "@/navigation/types";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

import { SessionResultSkeleton } from "../components/session-result-skeleton";
import { KeyMomentsTab } from "../components/key-moments-tab";
import { SmartSummaryTab } from "../components/smart-summary-tab";
import type { SessionResult } from "../types";

import sessionResultData from "@/mock-data/session-result.json";

type Props = NativeStackScreenProps<RootStackParamList, "SessionResult">;
type TabType = "summary" | "moments";

export function SessionResultScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>("summary");
  const [isLoading, setIsLoading] = useState(true);

  const result = sessionResultData as SessionResult;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <SessionResultSkeleton />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.avatarRow} accessible={false}>
          <Image
            source={assets.images.boyGif}
            style={styles.avatar}
            contentFit="cover"
            cachePolicy="memory-disk"
            accessible={false}
          />
          <Image
            source={assets.images.girlGif}
            style={[styles.avatar, styles.avatarOverlap]}
            contentFit="cover"
            cachePolicy="memory-disk"
            accessible={false}
          />
        </View>

        <View style={styles.closeButtonWrapper}>
          <View style={styles.closeButtonShadow} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
            accessibilityLabel="Close"
            accessibilityRole="button"
          >
            <Image
              source={assets.icons.cancel}
              style={styles.closeIcon}
              contentFit="contain"
              cachePolicy="memory-disk"
              accessible={false}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.questionCardWrapper}>
          <View style={styles.diamond} />
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{result.questionText}</Text>
            <View style={styles.companyRow}>
              <View style={styles.companyLogoContainer} accessible={false}>
                <Image
                  source={result.companyLogoUrl}
                  style={styles.companyLogo}
                  cachePolicy="memory-disk"
                  accessible={false}
                />
              </View>
              <Text style={styles.companyName}>Asked by {result.companyName}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "summary" && styles.tabActive]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActiveTab("summary");
            }}
            accessibilityLabel="Smart summary tab"
            accessibilityRole="tab"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "summary" && styles.tabTextActive,
              ]}
            >
              Smart summary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "moments" && styles.tabActive]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActiveTab("moments");
            }}
            accessibilityLabel="Key moments tab"
            accessibilityRole="tab"
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "moments" && styles.tabTextActive,
              ]}
            >
              Key moments
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "summary" ? (
          <SmartSummaryTab summary={result.smartSummary} />
        ) : (
          <KeyMomentsTab
            moments={result.keyMoments}
            audioDurationSeconds={result.audioDurationSeconds}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appPalette.greenWash,
  },
  header: {
    paddingHorizontal: spacing.m,
    paddingTop: 49,
    alignItems: "center",
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    marginTop: -5,
  },
  avatar: {
    width: 107,
    height: 107,
    borderRadius: 668,
    borderWidth: 2.7,
    borderColor: appPalette.greenMist,
    backgroundColor: appPalette.white,
  },
  avatarOverlap: {
    marginLeft: -22,
  },
  closeButtonWrapper: {
    position: "absolute",
    top: 8,
    right: 16,
    width: 42,
    height: 46,
  },
  closeButtonShadow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 42,
    borderRadius: 21,
    backgroundColor: appPalette.green40,
  },
  closeButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: appPalette.greenPale,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
  questionCardWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: -5,
  },
  diamond: {
    width: 14,
    height: 14,
    backgroundColor: appPalette.greenVivid,
    borderRadius: 2,
    transform: [{ rotate: "45deg" }],
    marginBottom: -7,
    zIndex: 1,
  },
  questionCard: {
    backgroundColor: appPalette.greenVivid,
    borderRadius: spacing.cardRadius,
    padding: spacing.cardPadding,
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  questionText: {
    fontFamily: typography.fonts.manrope.bold,
    fontSize: 16,
    color: appPalette.white,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "center",
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  companyLogoContainer: {
    width: 22,
    height: 22,
    borderRadius: 687,
    backgroundColor: appPalette.white,
    borderWidth: 0.69,
    borderColor: appPalette.yellowLight,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  companyLogo: {
    width: 16,
    height: 16,
  },
  companyName: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.14,
    color: appPalette.separator,
  },
  detailsCard: {
    flex: 1,
    backgroundColor: appPalette.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: spacing.s,
    paddingTop: spacing.l,
    paddingHorizontal: spacing.m,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.giga,
    borderBottomWidth: 1,
    borderBottomColor: appPalette.separator,
    marginBottom: spacing.xl,
  },
  tab: {
    paddingVertical: 6,
    paddingBottom: spacing.xs,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: appPalette.ink2,
  },
  tabText: {
    fontFamily: typography.fonts.manrope.normal,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: appPalette.inkMuted,
  },
  tabTextActive: {
    fontFamily: typography.fonts.manrope.medium,
    color: appPalette.ink2,
  },
});
