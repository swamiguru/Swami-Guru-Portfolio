/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { NOTES, formatNoteDate } from "../data/notes";
import BrandLogo from "../components/BrandLogo";

const YOUTUBE = "https://www.youtube.com/@builtbyswami";

export default function Notes() {
  useEffect(() => {
    document.title = "Build Notes | Swami Guru";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Build Notes by Swami Guru — long-form teardowns of building products in public with AI. The wiring behind the videos: prompts, stack, mistakes, results."
      );
  }, []);

  return (
    <div className="min-h-screen bg-m3-surface md:p-8 selection:bg-m3-primary selection:text-m3-on-primary">
      <div className="max-w-[1100px] mx-auto min-h-[90vh] flex flex-col relative bg-m3-surface-variant overflow-hidden shadow-xl rounded-m3-xl md:rounded-[32px] border border-m3-outline/10">

        <header className="h-[70px] md:h-[88px] border-b border-m3-outline/20 flex items-center justify-between px-6 md:px-10 bg-m3-surface/80 backdrop-blur-md sticky top-0 z-30">
          <BrandLogo />
          <div className="flex items-center gap-2 md:gap-3 font-display font-bold text-sm">
            <Link to="/tech-roundup" className="hidden md:inline-block px-4 py-2.5 hover:bg-m3-surface-variant text-m3-on-surface rounded-m3-full transition-all">Tech Roundup</Link>
            <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="hidden md:inline-block px-4 py-2.5 hover:bg-m3-surface-variant text-m3-on-surface rounded-m3-full transition-all">The Channel</a>
            <Link to="/about" className="hidden md:inline-block px-4 py-2.5 hover:bg-m3-surface-variant text-m3-on-surface rounded-m3-full transition-all">The Work</Link>
            <Link to="/" className="px-5 py-2.5 bg-m3-primary text-m3-on-primary rounded-m3-full hover:m3-elevation-1 active:scale-95 transition-all shadow-sm">← Home</Link>
          </div>
        </header>

        <section className="px-6 md:px-14 pt-12 md:pt-16 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-m3-primary" />
            <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-primary">
              Build Notes
            </span>
          </div>
          <h1 className="display text-3xl md:text-5xl font-extrabold uppercase tracking-tighter text-m3-on-surface max-w-2xl leading-[0.95]">
            The wiring behind the builds
          </h1>
          <p className="mt-5 text-base md:text-lg font-medium text-m3-on-surface-variant max-w-xl leading-relaxed">
            Long-form teardowns of building products in public with AI — prompts, stack, mistakes, and results.
          </p>
        </section>

        <section className="px-6 md:px-14 pb-14 flex-1">
          <div className="flex flex-col gap-4 md:gap-5">
            {NOTES.map((n) => (
              <Link
                key={n.slug}
                to={`/notes/${n.slug}`}
                className="group bg-m3-surface rounded-[24px] border border-m3-outline/5 p-6 md:p-8 hover:border-m3-primary/30 hover:shadow-xl transition-all flex flex-col gap-3"
              >
                <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant/60">
                  <span className="text-m3-primary">{n.tag}</span>
                  <span>{formatNoteDate(n.date)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {n.readMinutes} min
                  </span>
                </div>
                <h2 className="display text-xl md:text-2xl font-extrabold tracking-tight text-m3-on-surface group-hover:text-m3-primary transition-colors">
                  {n.title}
                </h2>
                <p className="text-sm leading-relaxed text-m3-on-surface-variant font-medium max-w-2xl">
                  {n.description}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-m3-primary">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
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
