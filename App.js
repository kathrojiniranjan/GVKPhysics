import { useState } from "react";
import LectureListScreen from "./components/LectureListScreen";
import PdfViewerScreen from "./components/PdfViewerScreen";

export default function App() {
  // When a lecture is selected we show the PDF viewer; otherwise the list.
  const [selectedLecture, setSelectedLecture] = useState(null);

  if (selectedLecture) {
    return (
      <PdfViewerScreen
        lecture={selectedLecture}
        onBack={() => setSelectedLecture(null)}
      />
    );
  }

  return <LectureListScreen onSelectLecture={setSelectedLecture} />;
}
