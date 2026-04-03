import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { typography } from "@/theme/typography";

import type { SmartSummary } from "../types";

interface SmartSummaryTabProps {
  summary: SmartSummary;
}

interface BulletItem {
  id: string;
  text: string;
  section: "worked" | "takeaways";
}

function BulletIcon() {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={require("../../../../assets/diamond_icon.png")}
        style={styles.bulletIcon}
        contentFit="contain"
      />
    </View>
  );
}

export function SmartSummaryTab({ summary }: SmartSummaryTabProps) {
  const items = useMemo<BulletItem[]>(() => {
    const worked = summary.whatWorkedWell.map((text, i) => ({
      id: `w-${i}`,
      text,
      section: "worked" as const,
    }));
    const takeaways = summary.overallTakeaways.map((text, i) => ({
      id: `t-${i}`,
      text,
      section: "takeaways" as const,
    }));
    return [...worked, ...takeaways];
  }, [summary]);

  const renderItem = ({ item, index }: { item: BulletItem; index: number }) => {
    const isFirstTakeaway =
      item.section === "takeaways" &&
      (index === 0 || items[index - 1]?.section === "worked");

    return (
      <>
        {item.section === "worked" && index === 0 && (
          <Text style={styles.sectionTitle}>What worked well</Text>
        )}
        {isFirstTakeaway && (
          <>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Overall takeaways</Text>
          </>
        )}
        <View style={styles.bulletRow}>
          <BulletIcon />
          <Text style={styles.bulletText}>{item.text}</Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  sectionTitle: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 16,
    lineHeight: 16,
    color: "#48484A",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#EFEFF4",
    marginVertical: 16,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 8,
  },
  iconContainer: {
    width: 10,
    height:10,
    paddingTop: 6,
    alignItems: "center",
  },
  bulletIcon: {
    width: 10,
    height: 10,
  },
  bulletText: {
    flex: 1,
    fontFamily: typography.fonts.manrope.medium,
    fontSize: 14,
    lineHeight: 20,
    color: "#48484A",
  },
});
