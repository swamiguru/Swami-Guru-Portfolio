/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { DIGESTS, formatDigestDate } from "../data/social";

const YOUTUBE = "https://www.youtube.com/@builtbyswami";

export default function Tech() {
  useEffect(() => {
    document.title = "Tech Roundup | Swami Guru";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Daily tech & AI roundups from Swami Guru — the biggest stories, honest takes, and practical tips, filtered so you only get what's worth your time."
      );
  }, []);

  return (
    <div className="min-h-screen bg-m3-surface md:p-8 selection:bg-m3-primary selection:text-m3-on-primary">
      <div className="max-w-[1100px] mx-auto min-h-[90vh] flex flex-col relative bg-m3-surface-variant overflow-hidden shadow-xl rounded-m3-xl md:rounded-[32px] border border-m3-outline/10">

        <header className="h-[70px] md:h-[88px] border-b border-m3-outline/20 flex items-center justify-between px-6 md:px-10 bg-m3-surface/80 backdrop-blur-md sticky top-0 z-30">
          <Link to="/" className="flex flex-col group">
            <span className="font-display text-[9px] md:text-[11px] uppercase tracking-[0.25em] font-black text-m3-primary/60">
              Digital Media Hub
            </span>
            <span className="display text-xl md:text-2xl font-extrabold tracking-tighter uppercase text-m3-on-surface">
              Built<span className="text-m3-primary">By</span>Swami
            </span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3 font-display font-bold text-sm">
            <Link to="/tech-roundup" className="hidden md:inline-block px-4 py-2.5 hover:bg-m3-surface-variant text-m3-on-surface rounded-m3-full transition-all">Tech Roundup</Link>
            <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="hidden md:inline-block px-4 py-2.5 hover:bg-m3-surface-variant text-m3-on-surface rounded-m3-full transition-all">The Channel</a>
            <Link to="/notes" className="hidden md:inline-block px-4 py-2.5 hover:bg-m3-surface-variant text-m3-on-surface rounded-m3-full transition-all">Notes</Link>
            <Link to="/" className="px-5 py-2.5 bg-m3-primary text-m3-on-primary rounded-m3-full hover:m3-elevation-1 active:scale-95 transition-all shadow-sm">← Home</Link>
          </div>
        </header>

        <section className="px-6 md:px-14 pt-12 md:pt-16 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-m3-primary" />
            <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-primary">
              The Daily Tech Roundup
            </span>
          </div>
          <h1 className="display text-3xl md:text-5xl font-extrabold uppercase tracking-tighter text-m3-on-surface max-w-2xl leading-[0.95]">
            Tech Roundup
          </h1>
          <p className="mt-5 text-base md:text-lg font-medium text-m3-on-surface-variant max-w-xl leading-relaxed">
            The day's biggest tech & AI stories — filtered, with honest takes. Five things worth your time, every day.
          </p>
        </section>

        <section className="px-6 md:px-14 pb-14 flex-1">
          {DIGESTS.length > 0 ? (
            <div className="flex flex-col gap-4 md:gap-5">
              {DIGESTS.map((d) => (
                <Link
                  key={d.date}
                  to={`/tech-roundup/${d.date}`}
                  className="group bg-m3-surface rounded-[24px] border border-m3-outline/5 p-6 md:p-8 hover:border-m3-primary/30 hover:shadow-xl transition-all flex flex-col gap-3"
                >
                  <div className="text-[11px] font-bold uppercase tracking-widest text-m3-primary">
                    {formatDigestDate(d.date)} · {d.posts.length} stories
                  </div>
                  <h2 className="display text-xl md:text-2xl font-extrabold tracking-tight text-m3-on-surface group-hover:text-m3-primary transition-colors">
                    {d.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-m3-on-surface-variant font-medium max-w-2xl line-clamp-2">
                    {d.intro}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-m3-primary">
                    Read the roundup <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-m3-on-surface-variant font-medium">Roundups are on the way — check back soon.</p>
          )}
        </section>

        <footer className="px-6 md:px-14 py-8 bg-m3-surface flex items-center gap-4 justify-between border-t border-m3-outline/10 rounded-b-m3-xl md:rounded-b-[32px]">
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-m3-primary flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-m3-primary animate-pulse" /> Live operational status — 2026
          </span>
          <span className="text-[10px] font-bold uppercase opacity-30 font-display">© builtbyswami</span>
        </footer>
      </div>
    </div>
  );
}
