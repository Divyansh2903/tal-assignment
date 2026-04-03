import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, palette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

import type { Question } from "../types";

interface QuestionBottomSheetProps {
  question: Question | null;
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  onFeedbackPress: (questionId: string) => void;
}

export function QuestionBottomSheet({
  question,
  bottomSheetRef,
  onFeedbackPress,
}: QuestionBottomSheetProps) {
  const snapPoints = useMemo(() => ["45%"], []);

  const handleFeedback = useCallback(() => {
    if (question) {
      onFeedbackPress(question.id);
    }
  }, [question, onFeedbackPress]);

  if (!question) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.indicator}
    >
      <BottomSheetView style={styles.content}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.text}</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.companyInfo}>
            <Text style={styles.askedBy}>Asked by {question.companyName}</Text>
            <Image
              source={question.companyLogoUrl}
              style={styles.companyLogo}
              contentFit="contain"
              cachePolicy="memory-disk"
            />
          </View>
          <View style={styles.durationInfo}>
            <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.durationText}>{question.durationMinutes} mins</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={handleFeedback}
          activeOpacity={0.7}
        >
          <Text style={styles.feedbackButtonText}>FEEDBACK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aiButton} activeOpacity={0.7} disabled>
          <Ionicons name="headset" size={18} color={colors.textInverse} />
          <Text style={styles.aiButtonText}>AI VS AI (LISTEN)</Text>
        </TouchableOpacity>

        <View style={styles.socialProof}>
          <Ionicons name="flag" size={14} color={colors.primary} />
          <Text style={styles.socialProofText}>
            {question.completedTodayCount.toLocaleString()} users completed Question{" "}
            {question.questionNumber} today
          </Text>
          <Ionicons name="flag" size={14} color={colors.primary} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  indicator: {
    backgroundColor: colors.textDisabled,
    width: 40,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xs,
    gap: spacing.m,
  },
  questionCard: {
    backgroundColor: palette.orange20,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    borderWidth: 1,
    borderColor: palette.orange30,
  },
  questionText: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  askedBy: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.s,
    color: colors.textSecondary,
  },
  companyLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  durationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  durationText: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.s,
    color: colors.textSecondary,
  },
  feedbackButton: {
    borderWidth: 2,
    borderColor: palette.green50,
    borderRadius: spacing.buttonRadius,
    paddingVertical: spacing.s,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  feedbackButtonText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.m,
    color: palette.green50,
  },
  aiButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: spacing.buttonRadius,
    paddingVertical: spacing.s,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  aiButtonText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.m,
    color: colors.textInverse,
  },
  socialProof: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
  },
  socialProofText: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.xs,
    color: colors.primary,
  },
});
