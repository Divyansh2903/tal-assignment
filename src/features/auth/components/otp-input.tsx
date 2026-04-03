import { useCallback, useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { appPalette } from "@/constants/app-colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

const OTP_LENGTH = 6;

interface OtpInputProps {
  otp: string[];
  onOtpChange: (otp: string[]) => void;
}

export function OtpInput({ otp, onOtpChange }: OtpInputProps) {
  const otpRefs = useRef<(TextInput | null)[]>([]);
  const backspaceHandled = useRef(false);

  const handleChange = useCallback(
    (text: string, index: number) => {
      if (backspaceHandled.current) {
        backspaceHandled.current = false;
        return;
      }
      const digit = text.replace(/[^0-9]/g, "");
      if (!digit && text) return;
      const newOtp = [...otp];
      newOtp[index] = digit;
      onOtpChange(newOtp);

      if (digit && index < OTP_LENGTH - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    },
    [otp, onOtpChange],
  );

  const handleKeyPress = useCallback(
    (key: string, index: number) => {
      if (key === "Backspace") {
        backspaceHandled.current = true;
        if (otp[index]) {
          const newOtp = [...otp];
          newOtp[index] = "";
          onOtpChange(newOtp);
        } else if (index > 0) {
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          onOtpChange(newOtp);
          otpRefs.current[index - 1]?.focus();
        }
      }
    },
    [otp, onOtpChange],
  );

  return (
    <View>
      <Text style={styles.label}>Enter the OTP</Text>
      <View style={styles.row}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              otpRefs.current[index] = ref;
            }}
            style={[styles.box, digit ? styles.boxFilled : null]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key, index)
            }
            placeholder="-"
            placeholderTextColor={appPalette.ink}
            accessibilityLabel={`OTP digit ${index + 1}`}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 12,
    lineHeight: 16,
    color: appPalette.ink3,
    marginTop: spacing.xxl,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  box: {
    width: 48,
    height: 54,
    backgroundColor: appPalette.white,
    borderWidth: 1,
    borderColor: appPalette.fillSecondary,
    borderBottomWidth: 2,
    borderBottomColor: appPalette.overlayBlack10,
    borderRadius: spacing.xs,
    textAlign: "center",
    fontFamily: typography.fonts.inter.medium,
    fontSize: 20,
    color: appPalette.ink2,
  },
  boxFilled: {
    backgroundColor: appPalette.fillSecondary,
    borderBottomWidth: 2,
    borderBottomColor: appPalette.overlayBlack10,
  },
});
