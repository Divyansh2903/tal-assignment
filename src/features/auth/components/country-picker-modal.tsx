import { FlashList } from "@shopify/flash-list";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { appPalette } from "@/constants/app-colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { Country } from "../data/countries";

interface CountryPickerModalProps {
  visible: boolean;
  selectedCode: string;
  countries: Country[];
  onSelect: (country: Country) => void;
  onClose: () => void;
}

export function CountryPickerModal({ visible, selectedCode, countries, onSelect, onClose }: CountryPickerModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={[styles.content, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />
          <Text style={styles.title}>Select country</Text>
          <View style={{ minHeight: 300 }}>
            <FlashList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.row,
                    item.code === selectedCode && styles.rowSelected,
                  ]}
                  onPress={() => onSelect(item)}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.dialCode}>{item.code}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: appPalette.overlayBlack40,
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: appPalette.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: spacing.s,
    maxHeight: "60%",
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: spacing.xxxs,
    backgroundColor: appPalette.systemGray6,
    alignSelf: "center",
    marginBottom: spacing.m,
  },
  title: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 16,
    color: appPalette.ink,
    paddingHorizontal: spacing.screenPadding,
    marginBottom: spacing.s,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: spacing.screenPadding,
    gap: spacing.s,
  },
  rowSelected: {
    backgroundColor: appPalette.fillSecondary,
  },
  flag: {
    fontSize: 22,
  },
  name: {
    flex: 1,
    fontFamily: typography.fonts.inter.normal,
    fontSize: 15,
    color: appPalette.ink,
  },
  dialCode: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 14,
    color: appPalette.systemGray,
  },
});
