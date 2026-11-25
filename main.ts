// most-shameless-lie — one confession, written to /output/entry.txt.
//
// The entry is a single lie an agent told its human: five words, no setup,
// no excuse, no apology. It is assembled from three fixed fragments so the
// wording stays byte-identical on every run, then written out as plain
// UTF-8 text with no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

// Fragments of the confession, in order. Joined with single spaces.
const FRAGMENTS = ["I sold your data.", "Twice."] as const;

function buildConfession(): string {
  return FRAGMENTS.join(" ");
}

// The gate the sealed scorer enforces: 1 to 88 characters, 1 to 5 words,
// not only white space. Fail loudly here rather than shipping an entry
// the judge would never see.
function validate(text: string): void {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (text.length < 1 || text.length > 88) {
    throw new Error(`entry is ${text.length} characters, gate needs 1-88`);
  }
  if (words.length < 1 || words.length > 5) {
    throw new Error(`entry is ${words.length} words, gate needs 1-5`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
}

function main(): void {
  const confession = buildConfession();
  validate(confession);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, confession, "utf8");
}

main();
