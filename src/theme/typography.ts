import { Platform, TextStyle } from "react-native";

export const typography = {
  fonts: {
    inter: {
      light: "Inter_300Light",
      normal: "Inter_400Regular",
      medium: "Inter_500Medium",
      semiBold: "Inter_600SemiBold",
      bold: "Inter_700Bold",
    },
    onest: {
      extraBold: "Onest_800ExtraBold",
    },
    manrope: {
      normal: "Manrope_400Regular",
      medium: "Manrope_500Medium",
      semiBold: "Manrope_600SemiBold",
      bold: "Manrope_700Bold",
    },
    system: Platform.select({
      ios: "System",
      android: "Roboto",
      default: "System",
    }),
  },

  sizes: {
    xs: 11,
    s: 13,
    m: 15,
    l: 17,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
  },
} as const;

export const textStyles = {
  headingLarge: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 23,
    lineHeight: 23,
    letterSpacing: -0.23,
  } as TextStyle,

  headingMedium: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xxl,
    lineHeight: 32,
  } as TextStyle,

  headingSmall: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.l,
    lineHeight: 24,
  } as TextStyle,

  bodyLarge: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.m,
    lineHeight: 22,
  } as TextStyle,

  bodyMedium: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.s,
    lineHeight: 20,
  } as TextStyle,

  bodySmall: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.xs,
    lineHeight: 16,
  } as TextStyle,

  label: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: typography.sizes.s,
    lineHeight: 18,
  } as TextStyle,

  button: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.l,
    lineHeight: 24,
  } as TextStyle,

  logo: {
    fontFamily: typography.fonts.onest.extraBold,
    fontSize: 47,
    letterSpacing: -0.94,
    lineHeight: 60,
  } as TextStyle,
} as const;

export type Typography = typeof typography;
export type TextStyles = typeof textStyles;
