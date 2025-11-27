import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useAuth } from "../../context/AuthContext";
import { theme } from "../../theme/theme";

const SUMMARY_CARDS = [
  {
    label: "Today's Sales",
    value: "$2,450",
    meta: "+12% vs yesterday",
    icon: "cash-multiple",
    iconColor: "#0F6BFF",
    bg: "#E8F0FF",
  },
  {
    label: "Today's Expenses",
    value: "$1,040",
    meta: "3 new payouts",
    icon: "cash-minus",
    iconColor: "#FF6B6B",
    bg: "#FFECEC",
  },
  {
    label: "Pending IOUs",
    value: "$6,320",
    meta: "5 clients overdue",
    icon: "account-clock-outline",
    iconColor: "#FF9F1C",
    bg: "#FFF4E6",
  },
  {
    label: "Total Balance",
    value: "$18,730",
    meta: "All ledgers synced",
    icon: "wallet-outline",
    iconColor: "#1BAA84",
    bg: "#E6F5F0",
  },
];

const QUICK_ACTIONS = [
  {
    label: "Record Sale",
    icon: "plus-circle-outline",
    gradient: ["#4F46E5", "#6D28D9"],
  },
  {
    label: "Record Expense",
    icon: "minus-circle-outline",
    gradient: ["#DC2626", "#EA580C"],
  },
  {
    label: "Create IOU",
    icon: "handshake-outline",
    gradient: ["#0D9488", "#10B981"],
  },
];

const RECENT_ACTIVITY = [
  {
    id: "1",
    type: "Sale",
    icon: "cash-plus",
    amount: "+$650",
    meta: "Warehouse pickup",
    tint: "#0F6BFF",
    time: "2m ago",
  },
  {
    id: "2",
    type: "Expense",
    icon: "cash-minus",
    amount: "-$120",
    meta: "Delivery fuel",
    tint: "#FF6B6B",
    time: "18m ago",
  },
  {
    id: "3",
    type: "IOU",
    icon: "account-clock-outline",
    amount: "$940",
    meta: "Grace Foods overdue",
    tint: "#FF9F1C",
    time: "1h ago",
  },
];

const WEEKLY_TREND = [
  { label: "Mon", value: 45 },
  { label: "Tue", value: 62 },
  { label: "Wed", value: 58 },
  { label: "Thu", value: 80 },
  { label: "Fri", value: 70 },
  { label: "Sat", value: 54 },
  { label: "Sun", value: 68 },
];

export default function TraderDashboard() {
  const { user } = useAuth();
  const syncPulse = useSharedValue(1);
  const isOnline = true;

  useEffect(() => {
    syncPulse.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 900 }),
        withTiming(1, { duration: 900 })
      ),
      -1,
      true
    );
  }, [syncPulse]);

  const syncStyle = useAnimatedStyle(() => ({
    transform: [{ scale: syncPulse.value }],
    opacity: syncPulse.value - 0.05,
  }));

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Animated.View
            entering={FadeInDown.duration(600)}
            style={styles.headerRow}
          >
            <View>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.traderName}>{user?.name || "Trader"}</Text>
            </View>
            <TouchableOpacity
              style={styles.notificationButton}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons
                name="bell-badge-outline"
                size={24}
                color={theme.colors.primary}
              />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.Text
            entering={FadeInRight.delay(120)}
            style={styles.subheading}
          >
            Keep your ledger updated and in sync in real-time.
          </Animated.Text>

          <View style={styles.summaryGrid}>
            {SUMMARY_CARDS.map((card, index) => (
              <Animated.View
                key={card.label}
                entering={FadeInDown.delay(150 + index * 120)}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[styles.summaryCard, { backgroundColor: card.bg }]}
                >
                  <View
                    style={[
                      styles.summaryIcon,
                      { backgroundColor: `${card.iconColor}15` },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={card.icon}
                      size={22}
                      color={card.iconColor}
                    />
                  </View>
                  <Text style={styles.summaryLabel}>{card.label}</Text>
                  <Text style={styles.summaryValue}>{card.value}</Text>
                  <Text style={styles.summaryMeta}>{card.meta}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          <View style={styles.quickActionsRow}>
            {QUICK_ACTIONS.map((action, index) => (
              <QuickActionButton
                key={action.label}
                action={action}
                delay={index * 100}
              />
            ))}
          </View>

          <Animated.View
            entering={FadeInDown.delay(420)}
            style={styles.cardSection}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.sectionLink}>View all</Text>
              </TouchableOpacity>
            </View>
            {RECENT_ACTIVITY.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInUp.delay(450 + index * 80)}
              >
                <ActivityRow item={item} />
              </Animated.View>
            ))}
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(520)}
            style={styles.cardSection}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Performance</Text>
              <Text style={styles.sectionMeta}>Weekly sales trend</Text>
            </View>
            <PerformanceChart data={WEEKLY_TREND} />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(620)}
            style={styles.syncCard}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sync Status</Text>
              <Text
                style={[
                  styles.statusText,
                  isOnline ? styles.statusOnline : styles.statusOffline,
                ]}
              >
                {isOnline ? "Online" : "Offline"}
              </Text>
            </View>
            <View style={styles.syncRow}>
              <Animated.View style={[styles.syncPulse, syncStyle]} />
              <View style={styles.syncCopy}>
                <Text style={styles.syncHeadline}>
                  Syncing 3 pending entries...
                </Text>
                <Text style={styles.syncMeta}>Last synced 2 min ago</Text>
              </View>
              <TouchableOpacity style={styles.syncButton} activeOpacity={0.85}>
                <Text style={styles.syncButtonText}>Sync now</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(720)}>
            <NotificationsCard />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const QuickActionButton = ({ action, delay }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 120 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 180 });
  };

  return (
    <AnimatedTouchableOpacity
      entering={FadeInUp.delay(250 + delay)}
      style={[styles.quickAction, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.85}
    >
      <LinearGradient colors={action.gradient} style={styles.quickActionInner}>
        <MaterialCommunityIcons name={action.icon} size={24} color="#fff" />
        <Text style={styles.quickActionLabel}>{action.label}</Text>
      </LinearGradient>
    </AnimatedTouchableOpacity>
  );
};

const ActivityRow = ({ item }) => (
  <View style={styles.activityRow}>
    <View
      style={[styles.activityIconWrap, { backgroundColor: `${item.tint}1A` }]}
    >
      <MaterialCommunityIcons name={item.icon} size={20} color={item.tint} />
    </View>
    <View style={styles.activityCopy}>
      <Text style={styles.activityType}>{item.type}</Text>
      <Text style={styles.activityMeta}>{item.meta}</Text>
    </View>
    <View style={styles.activityRight}>
      <Text style={[styles.activityAmount, { color: item.tint }]}>
        {item.amount}
      </Text>
      <Text style={styles.activityTime}>{item.time}</Text>
    </View>
  </View>
);

const PerformanceChart = ({ data }) => (
  <View style={styles.chartRow}>
    {data.map((point) => (
      <View key={point.label} style={styles.chartColumn}>
        <View style={[styles.chartBarTrack]}>
          <View style={[styles.chartBarFill, { height: `${point.value}%` }]} />
        </View>
        <Text style={styles.chartLabel}>{point.label}</Text>
      </View>
    ))}
  </View>
);

const NotificationsCard = () => (
  <View style={styles.notificationsCard}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Alerts</Text>
      <Text style={styles.sectionMeta}>Updated just now</Text>
    </View>
    <View style={styles.alertRow}>
      <View style={styles.alertIconWrap}>
        <MaterialCommunityIcons
          name="alert-outline"
          size={22}
          color="#FF6B6B"
        />
      </View>
      <View style={styles.alertCopy}>
        <Text style={styles.alertTitle}>3 IOUs overdue</Text>
        <Text style={styles.alertMeta}>
          Send reminders to Green Foods, Alba Retail, and Kenar Stores.
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.sectionLink}>Remind</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: "#7C8BA1",
  },
  traderName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
  },
  subheading: {
    fontSize: 15,
    color: "#4B5563",
    marginBottom: 18,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  summaryCard: {
    width: "48%",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  summaryMeta: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 4,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  quickAction: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  quickActionInner: {
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
  },
  quickActionLabel: {
    color: "#fff",
    fontWeight: "600",
  },
  cardSection: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  sectionMeta: {
    fontSize: 12,
    color: "#6B7280",
  },
  sectionLink: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
  },
  activityIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  activityCopy: {
    flex: 1,
    marginLeft: 12,
  },
  activityType: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  activityMeta: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  activityRight: {
    alignItems: "flex-end",
  },
  activityAmount: {
    fontSize: 15,
    fontWeight: "700",
  },
  activityTime: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 6,
  },
  chartColumn: {
    alignItems: "center",
    flex: 1,
  },
  chartBarTrack: {
    width: 16,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    overflow: "hidden",
    justifyContent: "flex-end",
    marginBottom: 6,
  },
  chartBarFill: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#4F46E5",
  },
  chartLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  syncCard: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  statusOnline: {
    color: "#34D399",
  },
  statusOffline: {
    color: "#F87171",
  },
  syncRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 16,
  },
  syncPulse: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#1E293B",
  },
  syncCopy: {
    flex: 1,
  },
  syncHeadline: {
    color: "#F9FAFB",
    fontWeight: "600",
    fontSize: 14,
  },
  syncMeta: {
    color: "#CBD5F5",
    fontSize: 12,
    marginTop: 2,
  },
  syncButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#22D3EE",
  },
  syncButtonText: {
    color: "#0F172A",
    fontWeight: "700",
  },
  notificationsCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  alertIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#FFF5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  alertCopy: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  alertMeta: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
});
