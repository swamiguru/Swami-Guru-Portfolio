/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUpRight, Clock } from "lucide-react";
import { getNote, formatNoteDate } from "../data/notes";

const YOUTUBE = "https://www.youtube.com/@builtbyswami";

export default function NotePost() {
  const { slug } = useParams<{ slug: string }>();
  const note = slug ? getNote(slug) : undefined;

  useEffect(() => {
    if (note) {
      document.title = `${note.title} | Build Notes`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", note.description);
    }
  }, [note]);

  if (!note) return <Navigate to="/notes" replace />;

  return (
    <div className="min-h-screen bg-m3-surface md:p-8 selection:bg-m3-primary selection:text-m3-on-primary">
      <div className="max-w-[820px] mx-auto min-h-[90vh] flex flex-col relative bg-m3-surface-variant overflow-hidden shadow-xl rounded-m3-xl md:rounded-[32px] border border-m3-outline/10">

        <header className="h-[70px] md:h-[88px] border-b border-m3-outline/20 flex items-center justify-between px-6 md:px-10 bg-m3-surface/80 backdrop-blur-md sticky top-0 z-30">
          <Link to="/notes" className="font-display font-bold text-sm text-m3-on-surface hover:text-m3-primary transition-colors">
            ← Build Notes
          </Link>
          <Link to="/" className="font-display font-bold text-sm px-5 py-2.5 bg-m3-primary text-m3-on-primary rounded-m3-full hover:m3-elevation-1 active:scale-95 transition-all shadow-sm">
            Home
          </Link>
        </header>

        <article className="px-6 md:px-14 py-10 md:py-16">
          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant/60 mb-5">
            <span className="text-m3-primary">{note.tag}</span>
            <span>{formatNoteDate(note.date)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {note.readMinutes} min read</span>
          </div>
          <h1 className="display text-3xl md:text-5xl font-extrabold tracking-tighter text-m3-on-surface leading-[1.02] mb-6">
            {note.title}
          </h1>
          {note.videoUrl && (
            <a
              href={note.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-10 m3-button-tonal text-sm tracking-wide"
            >
              Watch the build on YouTube <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          <div className="prose-notes">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
          </div>
        </article>

        <footer className="mt-auto px-6 md:px-14 py-8 bg-m3-surface flex items-center gap-4 justify-between border-t border-m3-outline/10 rounded-b-m3-xl md:rounded-b-[32px]">
          <Link to="/notes" className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-m3-primary">
            ← All notes
          </Link>
          <span className="text-[10px] font-bold uppercase opacity-30 font-display">© Swami Guru • Built with AI Context</span>
        </footer>
      </div>
    </div>
  );
}
