import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { RootStackParamList } from "@/navigation/types";
import { typography } from "@/theme/typography";

import { KeyMomentsTab } from "../components/key-moments-tab";
import { SmartSummaryTab } from "../components/smart-summary-tab";
import type { SessionResult } from "../types";

import sessionResultData from "@/mock-data/session-result.json";

type Props = NativeStackScreenProps<RootStackParamList, "SessionResult">;
type TabType = "summary" | "moments";

export function SessionResultScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>("summary");

  const result = sessionResultData as SessionResult;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.avatarRow}>
          <Image
            source={require("../../../../assets/boy_gif.gif")}
            style={styles.avatar}
            contentFit="cover"
          />
          <Image
            source={require("../../../../assets/girl_gif.gif")}
            style={[styles.avatar, styles.avatarOverlap]}
            contentFit="cover"
          />
        </View>

        <View style={styles.closeButtonWrapper}>
          <View style={styles.closeButtonShadow} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Image
              source={require("../../../../assets/cancel_btn.png")}
              style={styles.closeIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.questionCardWrapper}>
          <View style={styles.diamond} />
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{result.questionText}</Text>
            <View style={styles.companyRow}>
              <View style={styles.companyLogoContainer}>
                <Image
                  source={result.companyLogoUrl}
                  style={styles.companyLogo}
                  cachePolicy="memory-disk"
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
            onPress={() => setActiveTab("summary")}
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
            onPress={() => setActiveTab("moments")}
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
    backgroundColor: "#E8F5E9",
  },
  header: {
    paddingHorizontal: 16,
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
    borderColor: "#D4F3E5",
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#4ADE80",
  },
  closeButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#95E5BD",
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
    backgroundColor: "#13BF69",
    borderRadius: 2,
    transform: [{ rotate: "45deg" }],
    marginBottom: -7,
    zIndex: 1,
  },
  questionCard: {
    backgroundColor: "#13BF69",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  questionText: {
    fontFamily: typography.fonts.manrope.bold,
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "center",
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  companyLogoContainer: {
    width: 22,
    height: 22,
    borderRadius: 687,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.69,
    borderColor: "#FFEFB9",
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
    color: "#EFEFF4",
  },
  detailsCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 12,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFF4",
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    paddingBottom: 8,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#2C2C2E",
  },
  tabText: {
    fontFamily: typography.fonts.manrope.normal,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: "#6C6C70",
  },
  tabTextActive: {
    fontFamily: typography.fonts.manrope.medium,
    color: "#2C2C2E",
  },
});
