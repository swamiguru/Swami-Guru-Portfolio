/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Vercel serverless function: returns the newest video from the YouTube
 * channel RSS feed. No API key required. Cached at the edge for 1 hour.
 */

const CHANNEL_ID = "UCEQlJOO7HNP9tHUajaCwrBg";
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

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

    const entry = xml.split("<entry>")[1];
    if (!entry) throw new Error("No entries in feed");

    const pick = (tag) => {
      const m = entry.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
      return m ? m[1].trim() : "";
    };

    const id = pick("yt:videoId");
    if (!id) throw new Error("No video id found");
    const title = decode(pick("title"));
    const published = pick("published");

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json({
      id,
      title,
      published,
      url: `https://www.youtube.com/watch?v=${id}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    });
  } catch (err) {
    res.status(502).json({ error: String((err && err.message) || err) });
  }
}
