import { LECTURES_URL } from "../config";
import fallbackLectures from "../data/lectures";

// Fetches the lecture list.
//
//  • If LECTURES_URL is set (see config.js), it loads the list from that online
//    file so the lecturer can update lectures without changing the app.
//  • If the URL is not set, or the network/file fails, it returns the built-in
//    list from data/lectures.js so the app still works.
//
// Returns: { lectures: Array, source: "remote" | "fallback" }
export async function fetchLectures() {
  if (!LECTURES_URL) {
    return { lectures: fallbackLectures, source: "fallback" };
  }

  // Add a cache-buster so students always get the latest published list.
  const url = `${LECTURES_URL}${LECTURES_URL.includes("?") ? "&" : "?"}t=${Date.now()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load lectures (HTTP ${response.status}).`);
  }

  const data = await response.json();
  const lectures = normalizeLectures(data);

  if (lectures.length === 0) {
    throw new Error("The lectures file is empty or in the wrong format.");
  }

  return { lectures, source: "remote" };
}

// Accepts either a bare array  [ {...}, {...} ]
// or an object               { "lectures": [ {...} ] }
// and keeps only well-formed entries.
function normalizeLectures(data) {
  const list = Array.isArray(data) ? data : data?.lectures;
  if (!Array.isArray(list)) {
    return [];
  }

  return list
    .filter((item) => item && item.title && item.url)
    .map((item, index) => ({
      id: String(item.id ?? index + 1),
      title: String(item.title),
      subject: item.subject ? String(item.subject) : "",
      url: String(item.url),
    }));
}
