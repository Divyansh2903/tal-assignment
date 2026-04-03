import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { appPalette } from "@/constants/app-colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

import type { KeyMoment } from "../types";

interface KeyMomentsTabProps {
  moments: KeyMoment[];
  audioDurationSeconds: number;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function AudioPlayer({ duration }: { duration: number }) {
  return (
    <View style={styles.audioPlayer}>
      <View style={styles.playerRow}>
        <TouchableOpacity style={styles.playButton} activeOpacity={0.7} accessibilityLabel="Play mock interview" accessibilityRole="button">
          <Ionicons name="play" size={22} color={appPalette.orangeBrown} style={{ marginLeft: spacing.xxxs }} accessible={false} />
        </TouchableOpacity>
        <View style={styles.playerRight}>
          <Text style={styles.audioTitle}>Mock Interview</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>00:00</Text>
            <Text style={styles.timeText}>{formatDuration(duration)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function MomentItem({ moment, isLast }: { moment: KeyMoment; isLast: boolean }) {
  const isPositive = moment.type === "positive";
  const timestampColor = isPositive ? appPalette.green70 : appPalette.orangeDeep;

  return (
    <View style={[styles.momentItem, !isLast && styles.momentItemBorder]}>
      <Text style={[styles.timestamp, { color: timestampColor }]}>
        {moment.timestamp}
      </Text>
      <Text style={styles.momentDescription}>{moment.description}</Text>
    </View>
  );
}

export function KeyMomentsTab({ moments, audioDurationSeconds }: KeyMomentsTabProps) {
  const renderItem = ({ item, index }: { item: KeyMoment; index: number }) => (
    <MomentItem moment={item} isLast={index === moments.length - 1} />
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={moments}
        renderItem={renderItem}
        keyExtractor={(item) => item.timestamp}
        ListHeaderComponent={<AudioPlayer duration={audioDurationSeconds} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  audioPlayer: {
    backgroundColor: appPalette.orangeWash,
    borderRadius: spacing.cardRadius,
    paddingTop: spacing.m,
    paddingBottom: spacing.m,
    paddingLeft: spacing.s,
    paddingRight: spacing.m,
    marginBottom: spacing.m,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: spacing.buttonRadius,
    backgroundColor: appPalette.white,
    alignItems: "center",
    justifyContent: "center",
  },
  playerRight: {
    flex: 1,
    gap: spacing.xs,
  },
  audioTitle: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: appPalette.orangeBrown,
  },
  progressContainer: {
    flex: 1,
    justifyContent: "center",
  },
  progressTrack: {
    height: 6,
    backgroundColor: appPalette.orangeTrack,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  progressFill: {
    width: "40%",
    height: 6,
    backgroundColor: appPalette.orangeVivid,
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0,
    color: appPalette.systemGray,
  },
  momentItem: {
    paddingVertical: spacing.m,
  },
  momentItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: appPalette.separator,
  },
  timestamp: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    marginBottom: 6,
  },
  momentDescription: {
    fontFamily: typography.fonts.manrope.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    color: appPalette.ink,
  },
});
