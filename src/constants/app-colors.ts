/**
 * Extended App Color Palette
 *
 * Imports the base palette from theme and adds app-specific colors
 * needed for the Figma design that are not in the provided theme.
 *
 * This is the single source of truth for all colors beyond the base theme.
 * Components should import from here OR from @/theme/colors.
 */

import { palette } from "@/theme/colors";

export const appPalette = {
  ...palette,

  // Brand – vivid / specific shades
  orangeVivid: "#FF7800",
  orangeAlt: "#FF6B00",
  orangeRed: "#FF5000",
  orangeDark: "#D63A00",
  orangeDeep: "#E65100",
  orangeBrown: "#BF5F0A",
  orangeWash: "#FFF1E5",
  orangeTrack: "#FFCCBC",

  // Greens – extended
  green70: "#2E7D32",
  greenDark: "#00AD00",
  greenVivid: "#13BF69",
  greenBright: "#51D900",
  greenSoft: "#57D997",
  green40: "#3A9957",
  greenShadow: "#A1DF7C",
  greenLime: "#7BE047",
  greenPale: "#95E5BD",
  greenMint: "#D0F8BC",
  greenMist: "#D4F3E5",
  greenWash: "#E8F5E9",

  // Teal
  tealAccent: "#338072",
  tealWash: "#E6F2F0",
  tealBorder: "#E3F3F0",

  // Golds & Yellows
  goldDark: "#886418",
  goldShadow: "#CA9100",
  gold: "#D4B04C",
  goldMedium: "#C8A232",
  yellow: "#FFCE00",
  yellowBright: "#FFD033",
  yellowLight: "#FFEFB9",
  yellowWash: "#FFF6D9",
  yellow70: "#5C4A0E",
  brownOlive: "#806B26",
  bannerGradientStart: "#FFFAF4",
  bannerGradientEnd: "#FBE8C7",

  // Blues
  facebookBlue: "#1877F2",
  blueLight: "#B2D9FF",
  blueWash: "#E5F2FF",

  // Purple
  purple: "#673AB7",

  // Navy
  navy: "#1A2B4C",

  // iOS System Neutrals
  ink: "#1C1C1E",
  ink2: "#2C2C2E",
  ink3: "#48484A",
  ink4: "#4A4A4A",
  inkMuted: "#6C6C70",
  nearBlack: "#1A1A1A",
  systemGray: "#8E8E93",
  systemGray3: "#AEAEB2",
  systemGray4: "#C7C7CC",
  systemGray5: "#D1D1D6",
  systemGray6: "#E5E5EA",
  separator: "#EFEFF4",
  fill: "#F5F5F5",
  fillSecondary: "#F5F5F8",
  fillTertiary: "#F7F7F9",
  midGray: "#666666",
  darkGray: "#333333",

  // Overlays
  overlayBlack10: "rgba(0,0,0,0.1)",
  overlayBlack40: "rgba(0,0,0,0.4)",
  overlayBlack60: "#00000099",
  overlayBlack64: "rgba(0,0,0,0.64)",
  overlayWhite0: "rgba(255,255,255,0)",
  overlayWhite8: "rgba(255,255,255,0.08)",
  overlayWhite85: "rgba(255,255,255,0.85)",
  bannerButtonOverlay: "rgba(251,236,211,0.37)",
} as const;
