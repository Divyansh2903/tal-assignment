import type { ComponentProps } from "react";
import type { FontAwesome } from "@expo/vector-icons";
import type { assets } from "@/constants/assets";

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Question {
  id: string;
  questionNumber: number;
  companyId: string;
  companyName: string;
  companyLogoUrl: string;
  text: string;
  durationMinutes: number;
  completedTodayCount: number;
}

export type CardStatus = "completed" | "current" | "locked";

export interface LevelCardProps {
  id: number;
  company: string;
  logoKey?: keyof typeof assets.logos;
  fallbackIcon?: ComponentProps<typeof FontAwesome>["name"];
  fallbackColor?: string;
  status: CardStatus;
  marginLeft: number;
  showStartTooltip?: boolean;
  onPress?: () => void;
  showFeedbackTooltip?: boolean;
}
