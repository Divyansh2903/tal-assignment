import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, palette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

import type { Question } from "../types";

interface QuestionCardProps {
  question: Question;
  isFirst: boolean;
  onPress: (question: Question) => void;
}

function QuestionCardComponent({ question, isFirst, onPress }: QuestionCardProps) {
  const isHighlighted = question.questionNumber <= 3;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isHighlighted ? styles.cardHighlighted : styles.cardDefault,
      ]}
      onPress={() => onPress(question)}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <Text style={styles.companyName}>{question.companyName}</Text>
        <Image
          source={question.companyLogoUrl}
          style={styles.companyLogo}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
      </View>

      <View style={styles.rightSection}>
        {isFirst && <Text style={styles.startLabel}>START</Text>}
        <View
          style={[
            styles.numberBadge,
            isHighlighted ? styles.numberBadgeHighlighted : styles.numberBadgeDefault,
          ]}
        >
          <Text
            style={[
              styles.numberText,
              isHighlighted ? styles.numberTextHighlighted : styles.numberTextDefault,
            ]}
          >
            {question.questionNumber}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const QuestionCard = React.memo(QuestionCardComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: 28,
    marginBottom: spacing.s,
  },
  cardHighlighted: {
    backgroundColor: palette.orange20,
    borderWidth: 1.5,
    borderColor: palette.orange40,
  },
  cardDefault: {
    backgroundColor: palette.gray20,
    borderWidth: 1.5,
    borderColor: palette.gray30,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  companyName: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
  },
  companyLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  startLabel: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xs,
    color: palette.green60,
  },
  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  numberBadgeHighlighted: {
    backgroundColor: palette.orange40,
  },
  numberBadgeDefault: {
    backgroundColor: palette.gray30,
  },
  numberText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.l,
  },
  numberTextHighlighted: {
    color: colors.background,
  },
  numberTextDefault: {
    color: colors.textSecondary,
  },
});
