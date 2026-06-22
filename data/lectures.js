// ============================================================================
//  OG Physics — Built-in (offline) lecture list
// ============================================================================
//
//  >>> This is now only the FALLBACK list. <<<
//  The app loads its real list from the online file you set in config.js
//  (LECTURES_URL). This built-in list is used only when no URL is set, or
//  when the device is offline / the online file can't be loaded.
//
//  To manage lectures going forward, edit your online JSON file (see
//  config.js and lectures.json) — not this file.
//
//  ----------------------------------------------------------------------------
//  The shape of each lecture (same as the online JSON):
//    {
//      id: '7',                        // any unique text/number
//      title: 'Your lecture title',    // shown in the list
//      subject: 'Topic / chapter',     // small grey line under the title
//      url: 'https://.../yourfile.pdf'  // a PUBLIC link to the PDF
//    }
//
//  Google Drive links must be shared as "Anyone with the link" (Viewer),
//  otherwise the app shows a Google sign-in / "no preview" screen.
// ============================================================================

const lectures = [
  {
    id: "1",
    title: "Introduction to Mechanics",
    subject: "Unit 1 · Classical Mechanics",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "2",
    title: "Newton’s Laws of Motion",
    subject: "Unit 1 · Classical Mechanics",
    url: "https://drive.google.com/file/d/1aOHX2SAyiEdymQ1t04ZuanenfyZF51yH/view?usp=sharing",
  },
  {
    id: "3",
    title: "Work, Energy and Power",
    subject: "Unit 2 · Energy",
    url: "https://drive.google.com/file/d/1aOHX2SAyiEdymQ1t04ZuanenfyZF51yH/view?usp=sharing",
  },
  {
    id: "4",
    title: "Thermodynamics Basics",
    subject: "Unit 3 · Heat & Thermodynamics",
    url: "https://drive.google.com/file/d/1aOHX2SAyiEdymQ1t04ZuanenfyZF51yH/view?usp=sharing",
  },
  {
    id: "5",
    title: "Waves and Oscillations",
    subject: "Unit 4 · Waves",
    url: "https://drive.google.com/file/d/1aOHX2SAyiEdymQ1t04ZuanenfyZF51yH/view?usp=sharing",
  },
  {
    id: "6",
    title: "Electric Charges and Fields",
    subject: "Unit 5 · Electrostatics",
    url: "https://drive.google.com/file/d/1aOHX2SAyiEdymQ1t04ZuanenfyZF51yH/view?usp=sharing",
  },
];

export default lectures;
