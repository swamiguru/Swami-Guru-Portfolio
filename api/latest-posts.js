/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Vercel serverless function: returns the latest social posts from a Google
 * Sheet that an automation (Zapier/Make) appends to. No API key needed — the
 * sheet is read via the public gviz JSON endpoint.
 *
 * Setup: create a sheet with columns  platform | text | url | date  and
 * "Publish to web". Set the env var POSTS_SHEET_ID to the sheet's ID.
 * Automation appends one row per new post (newest row at the bottom).
 */

const SHEET_ID = process.env.POSTS_SHEET_ID || "";
const LIMIT = 5;

export default async function handler(req, res) {
  try {
    if (!SHEET_ID) {
      res.setHeader("Cache-Control", "s-maxage=300");
      return res.status(200).json({ posts: [], configured: false });
    }

    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!r.ok) throw new Error(`Sheet responded ${r.status}`);
    const text = await r.text();

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    const json = JSON.parse(text.slice(start, end + 1));
    const rows = (json.table && json.table.rows) || [];

    const cell = (c, i) => {
      const v = c[i];
      if (!v) return "";
      return String(v.f != null ? v.f : v.v != null ? v.v : "").trim();
    };

    const posts = rows
      .map((row) => (row.c || []))
      .filter((c) => cell(c, 1)) // must have text
      .map((c) => ({
        platform: cell(c, 0),
        text: cell(c, 1),
        url: cell(c, 2),
        date: cell(c, 3),
      }))
      .slice(-LIMIT)
      .reverse();

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=86400");
    res.status(200).json({ posts, configured: true });
  } catch (err) {
    res.status(200).json({ posts: [], configured: true, error: String((err && err.message) || err) });
  }
}
