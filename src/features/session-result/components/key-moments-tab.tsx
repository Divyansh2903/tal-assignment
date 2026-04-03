import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        <TouchableOpacity style={styles.playButton} activeOpacity={0.7}>
          <Ionicons name="play" size={22} color="#C45C00" style={{ marginLeft: 2 }} />
        </TouchableOpacity>
        <View style={styles.playerRight}>
          <Text style={styles.audioTitle}>Mock Interview</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
              <View style={styles.progressDot} />
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
  const timestampColor = isPositive ? "#2E7D32" : "#E65100";

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
    paddingBottom: 32,
  },
  audioPlayer: {
    backgroundColor: "#FFF1E5",
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 12,
    paddingRight: 16,
    marginBottom: 16,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  playerRight: {
    flex: 1,
    gap: 4,
  },
  audioTitle: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: "#C45C00",
  },
  progressContainer: {
    flex: 1,
    justifyContent: "center",
  },
  progressTrack: {
    height: 4,
    backgroundColor: "#FFCCBC",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  progressFill: {
    width: "30%",
    height: 4,
    backgroundColor: "#FF6D00",
    borderRadius: 2,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF6D00",
    marginLeft: -6,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  timeText: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: 11,
    color: "#8E8E93",
  },
  momentItem: {
    paddingVertical: 16,
  },
  momentItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFF4",
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
    color: "#1C1C1E",
  },
});
