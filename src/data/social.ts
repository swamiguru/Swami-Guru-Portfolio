/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Loads every daily social digest from src/content/social/*.json at build time.
 * The daily automation just drops a new YYYY-MM-DD.json file — no index to edit.
 */

export interface SocialPost {
  n: number;
  pillar: string;
  platforms: string[];
  hook: string;
  body: string;
  url?: string;
  image?: string; // e.g. /social/2026-07-12/card_1.png
}

export interface Digest {
  date: string; // YYYY-MM-DD
  title: string;
  intro: string;
  cover?: string; // optional hero image path
  posts: SocialPost[];
}

const modules = import.meta.glob<Digest>("../content/social/*.json", {
  eager: true,
  import: "default",
});

export const DIGESTS: Digest[] = Object.values(modules).sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const getDigest = (date: string): Digest | undefined =>
  DIGESTS.find((d) => d.date === date);

export const getLatestDigest = (): Digest | undefined => DIGESTS[0];

export const formatDigestDate = (iso: string): string =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
