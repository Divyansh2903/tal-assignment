import { StyleSheet, View } from "react-native";

import { appPalette } from "@/constants/app-colors";
import { Skeleton } from "@/components/ui/skeleton";

export function SessionResultSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarRow}>
          <Skeleton width={107} height={107} borderRadius={54} />
          <Skeleton width={107} height={107} borderRadius={54} style={{ marginLeft: -22 }} />
        </View>
        <Skeleton width="85%" height={80} borderRadius={16} style={{ marginTop: 12 }} />
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.tabRow}>
          <Skeleton width={120} height={18} borderRadius={4} />
          <Skeleton width={100} height={18} borderRadius={4} />
        </View>
        <Skeleton width="100%" height={1} borderRadius={0} style={{ marginBottom: 24 }} />

        <Skeleton width={160} height={18} borderRadius={4} style={{ marginBottom: 16 }} />

        <View style={styles.bulletRow}>
          <Skeleton width={10} height={10} borderRadius={5} />
          <Skeleton width="90%" height={16} borderRadius={4} />
        </View>
        <View style={styles.bulletRow}>
          <Skeleton width={10} height={10} borderRadius={5} />
          <Skeleton width="80%" height={16} borderRadius={4} />
        </View>
        <View style={styles.bulletRow}>
          <Skeleton width={10} height={10} borderRadius={5} />
          <Skeleton width="85%" height={16} borderRadius={4} />
        </View>
        <View style={styles.bulletRow}>
          <Skeleton width={10} height={10} borderRadius={5} />
          <Skeleton width="75%" height={16} borderRadius={4} />
        </View>

        <Skeleton width="100%" height={1} borderRadius={0} style={{ marginTop: 16, marginBottom: 16 }} />

        <Skeleton width={140} height={18} borderRadius={4} style={{ marginBottom: 16 }} />

        <View style={styles.bulletRow}>
          <Skeleton width={10} height={10} borderRadius={5} />
          <Skeleton width="88%" height={16} borderRadius={4} />
        </View>
        <View style={styles.bulletRow}>
          <Skeleton width={10} height={10} borderRadius={5} />
          <Skeleton width="82%" height={16} borderRadius={4} />
        </View>
        <View style={styles.bulletRow}>
          <Skeleton width={10} height={10} borderRadius={5} />
          <Skeleton width="78%" height={16} borderRadius={4} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 49,
    paddingHorizontal: 16,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  detailsCard: {
    flex: 1,
    backgroundColor: appPalette.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 12,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 64,
    marginBottom: 12,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
});
