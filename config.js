// ============================================================================
//  OG Physics — App configuration
// ============================================================================
//
//  LECTURES_URL is the ONE thing that makes the app dynamic.
//
//  Put a JSON file online and paste its link below. After that, you can add,
//  remove, or edit lectures any time by editing that online file — WITHOUT
//  touching the app or re-publishing it. Students just pull-to-refresh.
//
//  ----------------------------------------------------------------------------
//  STEP 1 — Create the JSON file
//  ----------------------------------------------------------------------------
//  The file must contain a list of lectures in this exact shape:
//
//    {
//      "lectures": [
//        {
//          "id": "1",
//          "title": "Introduction to Mechanics",
//          "subject": "Unit 1 · Classical Mechanics",
//          "url": "https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
//        }
//      ]
//    }
//
//  (There is a ready-made example in this project: lectures.json)
//
//  ----------------------------------------------------------------------------
//  STEP 2 — Host it (free, recommended: GitHub Gist)
//  ----------------------------------------------------------------------------
//  1. Go to https://gist.github.com
//  2. Name the file  lectures.json  and paste your JSON.
//  3. Click "Create public gist".
//  4. Click the "Raw" button and copy that URL. It looks like:
//       https://gist.githubusercontent.com/<user>/<id>/raw/lectures.json
//  5. Paste it below as LECTURES_URL.
//
//  To update lectures later: edit the gist, save — done. (Tip: use the
//  ".../raw/lectures.json" link without a commit hash so it always points
//  to the latest version.)
//
//  ----------------------------------------------------------------------------
//  If LECTURES_URL is left as null, the app shows the built-in offline list
//  from data/lectures.js so it still works during development.
// ============================================================================

export const LECTURES_URL =
  "https://gist.githubusercontent.com/kathrojiniranjan/ce3c3b12388042e6cf36abac1cbaadcd/raw/ec22332bc93c2049c810da5216a60ca1a99432d7/gistfile1.txt"; // e.g. "https://gist.githubusercontent.com/you/abc/raw/lectures.json"
