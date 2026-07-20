/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Loads every published "Builtbyswami Weekly" newsletter issue from
 * src/content/weekly/*.json at build time. The weekly sync automation
 * (or a manual step right after publishing in beehiiv) just drops a new
 * issue-N.json file here — no index to edit.
 */

export interface WeeklyIssue {
  issueNumber: number;
  title: string;
  teaser: string;
  thumbnail: string; // e.g. /social/2026-07-20/card_1.png — reuses an existing daily card image
  url: string; // public beehiiv post URL
  publishedDate: string; // YYYY-MM-DD
  slug: string;
}

const modules = import.meta.glob<WeeklyIssue>("../content/weekly/*.json", {
  eager: true,
  import: "default",
});

export const WEEKLY_ISSUES: WeeklyIssue[] = Object.values(modules).sort(
  (a, b) => b.issueNumber - a.issueNumber
);

export const getLatestWeeklyIssue = (): WeeklyIssue | undefined => WEEKLY_ISSUES[0];
