import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

// Builds the best URL to display a PDF inside the app.
//
//  • Google Drive links → we turn them into Drive's own embeddable
//    ".../preview" page. (A normal Drive "/view?usp=sharing" link shows a
//    "No preview available" error when placed in an app, so we must rewrite it.)
//  • Any other direct .pdf link → on iOS we load it natively; on Android/web we
//    wrap it in Google's free document viewer so it embeds reliably.
function buildViewerUrl(pdfUrl) {
  const driveId = getGoogleDriveFileId(pdfUrl);
  if (driveId) {
    return `https://drive.google.com/file/d/${driveId}/preview`;
  }

  if (Platform.OS === "ios") {
    return pdfUrl;
  }
  return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    pdfUrl,
  )}`;
}

// Pulls the file ID out of the common Google Drive link shapes, e.g.
//   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
//   https://drive.google.com/open?id=FILE_ID
// Returns null if the URL is not a Google Drive link.
function getGoogleDriveFileId(url) {
  if (!url || !url.includes("drive.google.com")) {
    return null;
  }
  const pathMatch = url.match(/\/file\/d\/([^/]+)/);
  if (pathMatch) {
    return pathMatch[1];
  }
  const queryMatch = url.match(/[?&]id=([^&]+)/);
  if (queryMatch) {
    return queryMatch[1];
  }
  return null;
}

export default function PdfViewerScreen({ lecture, onBack }) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {/* Top bar with a back button and the lecture title */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          accessibilityLabel="Go back to the lecture list"
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Lectures</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {lecture.title}
        </Text>
      </View>

      {Platform.OS === "web" ? (
        // On web, react-native-webview is not supported, so we use a plain
        // browser <iframe>. Browsers render PDFs natively inside an iframe.
        <iframe
          src={buildViewerUrl(lecture.url)}
          title={lecture.title}
          onLoad={() => setLoading(false)}
          style={{ flex: 1, width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <WebView
          source={{ uri: buildViewerUrl(lecture.url) }}
          style={styles.webview}
          originWhitelist={["*"]}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          startInLoadingState
        />
      )}

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1e3a8a" />
          <Text style={styles.loadingText}>Opening PDF…</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 56 : 36,
    paddingBottom: 14,
    paddingHorizontal: 12,
    backgroundColor: "#1e3a8a",
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
  },
  backArrow: {
    color: "#ffffff",
    fontSize: 28,
    lineHeight: 28,
    marginRight: 2,
  },
  backText: {
    color: "#ffffff",
    fontSize: 16,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  loadingText: {
    marginTop: 12,
    color: "#64748b",
    fontSize: 15,
  },
});
