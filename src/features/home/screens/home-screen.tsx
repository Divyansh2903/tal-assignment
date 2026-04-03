import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { appPalette } from "@/constants/app-colors";
import { spacing } from "@/theme/spacing";
import { LEVELS } from "../data/levels";
import { TopHeader } from "../components/top-header";
import { StickyBanner } from "../components/sticky-banner";
import { MilestoneDivider } from "../components/milestone-divider";
import { BottomNav } from "../components/bottom-nav";
import { LevelCard } from "../components/level-card";

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={appPalette.white} />

      <TopHeader />
      <StickyBanner />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => setActiveCardId(null)}
      >
        <Pressable style={styles.pathContainer} onPress={() => setActiveCardId(null)}>
          {LEVELS.slice(0, 3).map((level) => (
            <LevelCard
              key={level.id}
              {...level}
              onPress={() => {
                if (level.id === 1) {
                  setActiveCardId(activeCardId === level.id ? null : level.id);
                } else {
                  setActiveCardId(null);
                }
              }}
              showFeedbackTooltip={activeCardId === 1 && level.id === 1}
            />
          ))}

          <MilestoneDivider />

          {LEVELS.slice(3).map((level) => (
            <LevelCard key={level.id} {...level} onPress={() => setActiveCardId(null)} />
          ))}

          <View style={{ height: 120 }} />
        </Pressable>
      </ScrollView>

      <LinearGradient
        colors={[appPalette.overlayWhite0, appPalette.overlayWhite85, appPalette.white]}
        style={styles.bottomGradient}
        pointerEvents="none"
      />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appPalette.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  pathContainer: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.m,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    zIndex: 5,
  },
});
