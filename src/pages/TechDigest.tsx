/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getDigest, formatDigestDate } from "../data/social";
import { SOCIALS } from "../data/socials";

const YOUTUBE = "https://www.youtube.com/@builtbyswami";

const socialPath = (name: string) =>
  SOCIALS.find((s) => s.name.toLowerCase() === (name || "").trim().toLowerCase())?.path;

export default function TechDigest() {
  const { date } = useParams<{ date: string }>();
  const digest = date ? getDigest(date) : undefined;

  useEffect(() => {
    if (digest) {
      document.title = `${digest.title} | Latest in Tech`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", digest.intro);
    }
  }, [digest]);

  if (!digest) return <Navigate to="/tech" replace />;

  return (
    <div className="min-h-screen bg-m3-surface md:p-8 selection:bg-m3-primary selection:text-m3-on-primary">
      <div className="max-w-[820px] mx-auto min-h-[90vh] flex flex-col relative bg-m3-surface-variant overflow-hidden shadow-xl rounded-m3-xl md:rounded-[32px] border border-m3-outline/10">

        <header className="h-[70px] md:h-[88px] border-b border-m3-outline/20 flex items-center justify-between px-6 md:px-10 bg-m3-surface/80 backdrop-blur-md sticky top-0 z-30">
          <Link to="/tech" className="font-display font-bold text-sm text-m3-on-surface hover:text-m3-primary transition-colors">
            ← Latest in Tech
          </Link>
          <Link to="/" className="font-display font-bold text-sm px-5 py-2.5 bg-m3-primary text-m3-on-primary rounded-m3-full hover:m3-elevation-1 active:scale-95 transition-all shadow-sm">
            Home
          </Link>
        </header>

        <article className="px-6 md:px-14 py-10 md:py-16">
          <div className="text-[11px] font-bold uppercase tracking-widest text-m3-primary mb-5">
            {formatDigestDate(digest.date)} · {digest.posts.length} stories
          </div>
          <h1 className="display text-3xl md:text-5xl font-extrabold tracking-tighter text-m3-on-surface leading-[1.02] mb-6">
            {digest.title}
          </h1>
          <p className="text-base md:text-lg text-m3-on-surface-variant font-medium leading-relaxed mb-12">
            {digest.intro}
          </p>

          {digest.cover && (
            <img
              src={digest.cover}
              alt=""
              loading="lazy"
              className="w-full rounded-[24px] border border-m3-outline/10 mb-12"
            />
          )}

          <div className="flex flex-col gap-8">
            {digest.posts.map((p) => (
              <div
                key={p.n}
                className="bg-m3-surface rounded-[24px] border border-m3-outline/5 p-6 md:p-8"
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="w-full max-w-[420px] rounded-[16px] border border-m3-outline/10 mb-5"
                  />
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-[11px] font-black uppercase tracking-[0.2em] text-m3-primary">
                    {String(p.n).padStart(2, "0")} · {p.pillar}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {p.platforms.map((plat) => {
                      const path = socialPath(plat);
                      return path ? (
                        <span
                          key={plat}
                          title={plat}
                          className="w-7 h-7 rounded-full bg-m3-surface-variant text-m3-on-surface-variant flex items-center justify-center"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                            <path d={path} />
                          </svg>
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
                <h2 className="display text-xl md:text-2xl font-extrabold tracking-tight text-m3-on-surface mb-3 leading-snug">
                  {p.hook}
                </h2>
                <p className="text-[15px] md:text-base leading-relaxed text-m3-on-surface-variant font-medium">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-m3-on-surface-variant">Catch these live as I post them:</span>
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`@builtbyswami on ${s.name}`}
                className="w-10 h-10 bg-m3-surface text-m3-on-surface-variant rounded-full flex items-center justify-center hover:bg-m3-primary hover:text-m3-on-primary transition-colors shadow-sm border border-m3-outline/10"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </article>

        <footer className="mt-auto px-6 md:px-14 py-8 bg-m3-surface flex items-center gap-4 justify-between border-t border-m3-outline/10 rounded-b-m3-xl md:rounded-b-[32px]">
          <Link to="/tech" className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-m3-primary">
            ← All roundups
          </Link>
          <span className="text-[10px] font-bold uppercase opacity-30 font-display">© Swami Guru • Built with AI Context</span>
        </footer>
      </div>
    </div>
  );
}
