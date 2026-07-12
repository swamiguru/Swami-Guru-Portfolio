/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Vercel serverless function: returns the latest videos from the channel RSS
 * feed (no API key). Used for the featured card and the "Latest Videos" rail.
 */

const CHANNEL_ID = "UCEQlJOO7HNP9tHUajaCwrBg";
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const LIMIT = 6;

function decode(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export default async function handler(req, res) {
  try {
    const r = await fetch(FEED, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!r.ok) throw new Error(`RSS responded ${r.status}`);
    const xml = await r.text();

    const entries = xml.split("<entry>").slice(1, LIMIT + 1);
    const videos = entries
      .map((entry) => {
        const pick = (tag) => {
          const m = entry.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
          return m ? m[1].trim() : "";
        };
        const id = pick("yt:videoId");
        if (!id) return null;
        return {
          id,
          title: decode(pick("title")),
          published: pick("published"),
          url: `https://www.youtube.com/watch?v=${id}`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        };
      })
      .filter(Boolean);

    if (!videos.length) throw new Error("No videos found");

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json({ videos });
  } catch (err) {
    res.status(502).json({ error: String((err && err.message) || err) });
  }
}
