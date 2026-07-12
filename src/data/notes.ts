/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Raw markdown is imported at build time via Vite's ?raw suffix.
import sprintPost from "../content/notes/24-hour-task-manager-sprint.md?raw";

export interface Note {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readMinutes: number;
  tag: string;
  videoUrl?: string;
  content: string;
}

export const NOTES: Note[] = [
  {
    slug: "24-hour-task-manager-sprint",
    title: "I built a task manager from zero in 24 hours with AI",
    description:
      "A solo, single-cycle build of a working task-management engine — the method, what broke, and why LLM context is the new foundational code.",
    date: "2026-07-12",
    readMinutes: 4,
    tag: "Build-in-public",
    videoUrl: "https://www.youtube.com/@builtbyswami",
    content: sprintPost,
  },
];

export const getNote = (slug: string): Note | undefined =>
  NOTES.find((n) => n.slug === slug);

export const getLatestNotes = (n = 3): Note[] =>
  [...NOTES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);

export const formatNoteDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
