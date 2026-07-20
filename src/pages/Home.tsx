/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  Mail,
  BookOpen,
  Sparkles,
  Clock,
} from "lucide-react";
import { SOCIALS } from "../data/socials";
import { getLatestDigest, formatDigestDate } from "../data/social";
import { getLatestNotes, formatNoteDate } from "../data/notes";
import Carousel from "../components/Carousel";
import SiteHeader from "../components/SiteHeader";
import NewsletterSignup from "../components/NewsletterSignup";

const YOUTUBE = "https://www.youtube.com/@builtbyswami";

interface Video {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
  thumbnail: string;
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/latest-videos")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("unavailable"))))
      .then((d) => {
        if (active && d && Array.isArray(d.videos)) setVideos(d.videos);
      })
      .catch(() => {
        /* fall back to the CTA card */
      });
    return () => {
      active = false;
    };
  }, []);

  const featured = videos[0] ?? null;
  const railVideos = videos.slice(1, 6);
  const latestDigest = getLatestDigest();

  useEffect(() => {
    document.title = "Swami Guru | Building products in public with AI";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Swami Guru — 11 years scaling $20M media products at Condé Nast and Newsweek. Now building products solo with AI, in public. Follow across YouTube, X, Threads, and Instagram."
      );
  }, []);

  return (
    <div className="min-h-screen bg-m3-surface md:p-8 selection:bg-m3-primary selection:text-m3-on-primary">
      <div className="max-w-[1100px] mx-auto min-h-[90vh] flex flex-col relative bg-m3-surface-variant overflow-hidden shadow-xl rounded-m3-xl md:rounded-[32px] border border-m3-outline/10">

        {/* 01 — Nav */}
        <SiteHeader />

        {/* 01b — Credibility strap */}
        <div className="px-6 md:px-14 py-3 bg-m3-primary/5 border-b border-m3-outline/10 flex items-center justify-between gap-4">
          <p className="text-xs md:text-sm font-medium text-m3-on-surface-variant">
            <span className="font-bold text-m3-on-surface">11 years, $20M+ scaled</span> at Cond&eacute; Nast and Newsweek — now building solo with AI, in public.
          </p>
          <Link
            to="/about"
            className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-m3-primary hover:underline"
          >
            The story →
          </Link>
        </div>

        {/* 02 — The Daily Tech Roundup (LEAD) */}
        <section className="relative overflow-hidden px-6 md:px-14 pt-10 md:pt-16 pb-10 md:pb-14 bg-m3-surface">
          <div className="absolute top-0 right-0 w-96 h-96 bg-m3-primary/5 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-m3-primary" />
                <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-primary">
                  The Daily Tech Roundup
                </span>
              </div>
              <Link
                to="/tech-roundup"
                className="text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant hover:text-m3-primary transition-colors flex items-center gap-1"
              >
                All roundups <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {latestDigest ? (
              <>
                <h1 className="display text-2xl md:text-4xl font-extrabold tracking-tighter text-m3-on-surface max-w-3xl leading-[1.05] mb-4">
                  {latestDigest.title}
                </h1>
                <p className="text-base md:text-lg text-m3-on-surface-variant font-medium max-w-2xl leading-relaxed mb-8">
                  {latestDigest.intro}
                </p>
                <div className="mb-5 text-[11px] font-bold uppercase tracking-widest text-m3-primary">
                  {formatDigestDate(latestDigest.date)} · today's 5
                </div>
                <Carousel ariaLabel="Today's tech roundup">
                  {latestDigest.posts.map((p) => (
                    <Link
                      key={p.n}
                      to={`/tech-roundup/${latestDigest.date}`}
                      role="listitem"
                      className="group snap-start shrink-0 w-[280px] md:w-[340px] bg-m3-surface-variant/40 rounded-[24px] border border-m3-outline/5 overflow-hidden flex flex-col hover:bg-m3-surface hover:border-m3-primary/30 hover:shadow-xl transition-all"
                    >
                      {p.image && (
                        <img
                          src={p.image}
                          alt=""
                          loading="lazy"
                          className="w-full aspect-square object-cover"
                        />
                      )}
                      <div className="p-6 flex flex-col gap-4 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-m3-primary">
                          {p.pillar}
                        </span>
                        <p className="text-[15px] leading-snug text-m3-on-surface font-bold line-clamp-4">
                          {p.hook}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-m3-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Read the take <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </Carousel>
              </>
            ) : (
              <div className="bg-m3-surface-variant/40 rounded-[24px] border border-m3-outline/5 p-8 flex flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                  <p className="font-display font-bold text-m3-on-surface mb-1">The daily roundup is coming online</p>
                  <p className="text-sm text-m3-on-surface-variant font-medium">
                    Fresh tech & AI stories will land here every day. In the meantime, follow along:
                  </p>
                </div>
                <div className="flex items-center gap-2">
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
              </div>
            )}
          </div>
        </section>

        {/* 03 — Get the week's five (email capture) */}
        <section
          id="build-notes"
          className="bg-m3-secondary-container text-m3-on-secondary-container px-6 md:px-14 py-10 md:py-14"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-m3-primary" />
              <h2 className="display text-2xl md:text-3xl font-extrabold uppercase tracking-tight">
                Get the week's five, one email
              </h2>
            </div>
            <p className="text-sm md:text-base font-medium opacity-80 mb-6 max-w-xl">
              Builtbyswami Weekly distills that week's roundups into the five stories that mattered — plus what I'm building. Weekly-ish, free.
            </p>
            <NewsletterSignup />
          </div>
        </section>

        {/* 04 — Latest build (featured video) */}
        <section className="px-6 md:px-14 py-10 md:py-14 bg-m3-surface-variant border-y border-m3-outline/10">
          <div className="flex items-center justify-between mb-6">
            <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-primary">
              The Channel
            </span>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant hover:text-m3-primary transition-colors flex items-center gap-1"
            >
              All videos <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
          {featured ? (
            <div className="rounded-[28px] overflow-hidden border border-m3-outline/10 bg-m3-surface shadow-sm">
              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={featured.embedUrl}
                  title={featured.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 p-5 md:p-6 hover:bg-m3-surface-variant/40 transition-colors group"
              >
                <span className="font-display font-bold text-sm md:text-base text-m3-on-surface line-clamp-2">
                  {featured.title}
                </span>
                <ArrowUpRight className="w-5 h-5 text-m3-on-surface-variant/50 group-hover:text-m3-primary shrink-0 transition-colors" />
              </a>
            </div>
          ) : (
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-[28px] overflow-hidden border border-m3-outline/10 bg-m3-secondary-container/40 aspect-video flex items-center justify-center shadow-sm hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0 bg-m3-primary/5 group-hover:bg-m3-primary/10 transition-colors" />
              <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
                <div className="w-20 h-20 rounded-full bg-m3-primary text-m3-on-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 ml-1" />
                </div>
                <span className="font-display font-bold uppercase tracking-widest text-sm text-m3-on-surface">
                  Watch the latest drop on YouTube
                </span>
                <span className="text-xs font-medium text-m3-on-surface-variant/70 max-w-sm">
                  New teardown every week or two.
                </span>
              </div>
            </a>
          )}
        </section>

        {/* 05 — Latest Videos (carousel) */}
        {railVideos.length > 0 && (
          <section className="px-6 md:px-14 py-10 md:py-14 bg-m3-surface">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Play className="w-5 h-5 text-m3-primary" />
                <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-on-surface">
                  Latest Videos
                </span>
              </div>
              <a
                href={YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant hover:text-m3-primary transition-colors flex items-center gap-1"
              >
                All videos <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <Carousel ariaLabel="Latest videos">
              {railVideos.map((v) => (
                <a
                  key={v.id}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  className="group snap-start shrink-0 w-[240px] md:w-[280px] bg-m3-surface rounded-[20px] border border-m3-outline/5 overflow-hidden hover:border-m3-primary/30 hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={v.thumbnail}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <div className="w-12 h-12 rounded-full bg-m3-primary text-m3-on-primary flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-display font-bold text-sm text-m3-on-surface line-clamp-2 leading-snug">
                      {v.title}
                    </p>
                  </div>
                </a>
              ))}
            </Carousel>
          </section>
        )}

        {/* 06 — Notes */}
        <section id="notes" className="px-6 md:px-14 py-12 md:py-16 bg-m3-surface-variant border-t border-m3-outline/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-m3-primary" />
              <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-on-surface">
                Notes
              </span>
            </div>
            <Link
              to="/notes"
              className="text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant hover:text-m3-primary transition-colors flex items-center gap-1"
            >
              All notes <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {getLatestNotes(3).map((note) => (
              <Link
                key={note.slug}
                to={`/notes/${note.slug}`}
                className="group bg-m3-surface rounded-[28px] border border-m3-outline/5 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-6 hover:border-m3-primary/30 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-[16px] bg-m3-primary-container text-m3-on-primary-container flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-m3-primary mb-2">
                    {note.tag} · {note.readMinutes} min read · {formatNoteDate(note.date)}
                  </div>
                  <h3 className="display text-lg md:text-xl font-extrabold tracking-tight text-m3-on-surface mb-2 group-hover:text-m3-primary transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-m3-on-surface-variant font-medium max-w-xl line-clamp-2">
                    {note.description}
                  </p>
                </div>
                <span className="m3-button-tonal text-sm tracking-wide whitespace-nowrap flex items-center gap-2 shrink-0">
                  Read <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 09 — About teaser */}
        <section className="px-6 md:px-14 py-12 md:py-16 bg-m3-primary text-m3-on-primary">
          <div className="max-w-3xl">
            <span className="font-display text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-extrabold text-m3-on-primary/60 mb-4 block">
              The operator behind the builds
            </span>
            <h2 className="display text-2xl md:text-4xl font-bold tracking-tighter leading-[0.95] mb-6">
              11 years, three global media companies, $20M+ scaled — now composing products solo with AI from Bengaluru.
            </h2>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-m3-surface text-m3-on-surface font-display font-bold px-6 py-3 rounded-m3-full hover:m3-elevation-2 active:scale-95 transition-all text-sm tracking-wide"
            >
              The full story <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 10 — Footer */}
        <footer className="px-6 md:px-14 py-8 bg-m3-surface flex flex-col md:flex-row items-center gap-6 justify-between border-t border-m3-outline/10 rounded-b-m3-xl md:rounded-b-[32px]">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-m3-primary animate-pulse" />
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-m3-primary">
              Live operational status — 2026
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {SOCIALS.map((s) => (
              <motion.a
                key={s.name}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`@builtbyswami on ${s.name}`}
                className="w-9 h-9 md:w-10 md:h-10 bg-m3-surface-variant text-m3-on-surface-variant rounded-full flex items-center justify-center hover:bg-m3-primary hover:text-m3-on-primary transition-colors shadow-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-[18px] md:h-[18px]" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </motion.a>
            ))}
          </div>
          <div className="text-[10px] font-bold uppercase opacity-30 font-display">
            © builtbyswami
          </div>
        </footer>
      </div>
    </div>
  );
}
