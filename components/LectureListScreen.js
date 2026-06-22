import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { fetchLectures } from "../services/lectureService";

export default function LectureListScreen({ onSelectLecture }) {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadLectures = useCallback(async (isRefresh) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const { lectures: list } = await fetchLectures();
      setLectures(list);
    } catch (e) {
      setError(e.message || "Something went wrong while loading lectures.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadLectures(false);
  }, [loadLectures]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* App header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>OG Physics</Text>
        <Text style={styles.headerSubtitle}>Lecture Notes & PDFs</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1e3a8a" />
          <Text style={styles.centerText}>Loading lectures…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => loadLectures(false)}
          >
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={lectures}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadLectures(true)}
              colors={["#1e3a8a"]}
              tintColor="#1e3a8a"
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => onSelectLecture(item)}
              accessibilityLabel={`Open ${item.title}`}
            >
              <View style={styles.pdfIcon}>
                <Text style={styles.pdfIconText}>PDF</Text>
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {item.subject ? (
                  <Text style={styles.cardSubject}>{item.subject}</Text>
                ) : null}
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No lectures yet. Pull down to refresh.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#1e3a8a",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#bfdbfe",
    fontSize: 14,
    marginTop: 4,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  centerText: {
    marginTop: 12,
    color: "#64748b",
    fontSize: 15,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#1e3a8a",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pdfIcon: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  pdfIconText: {
    color: "#dc2626",
    fontWeight: "700",
    fontSize: 13,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
  cardSubject: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 3,
  },
  chevron: {
    fontSize: 26,
    color: "#cbd5e1",
    marginLeft: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    marginTop: 40,
    fontSize: 15,
  },
});
