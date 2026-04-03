import { appPalette } from "@/constants/app-colors";
import type { LevelCardProps } from "../types";

export const LEVELS: LevelCardProps[] = [
  { id: 1, company: "PhonePe", logoKey: "phonepe", status: "completed", marginLeft: 48 },
  { id: 2, company: "Amazon", logoKey: "amazon", status: "current", marginLeft: 96, showStartTooltip: true },
  { id: 3, company: "PhonePe", logoKey: "phonepe", status: "locked", marginLeft: 144 },
  { id: 4, company: "Google", logoKey: "google", status: "locked", marginLeft: 144 },
  { id: 5, company: "Microsoft", logoKey: "microsoft", status: "locked", marginLeft: 96 },
  { id: 6, company: "Facebook", fallbackIcon: "facebook", fallbackColor: appPalette.facebookBlue, status: "locked", marginLeft: 48 },
  { id: 7, company: "Amazon", logoKey: "amazon", status: "locked", marginLeft: 48 },
  { id: 8, company: "Facebook", fallbackIcon: "facebook", fallbackColor: appPalette.facebookBlue, status: "locked", marginLeft: 96 },
];
