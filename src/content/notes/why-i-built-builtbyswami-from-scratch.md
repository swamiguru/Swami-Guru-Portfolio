For eleven years I built products with teams, roadmaps, and runway — scaling digital platforms for Vogue, GQ, Wired, Condé Nast Traveler, and Newsweek. Then my role at Condé Nast was made redundant as part of a restructuring, and the runway disappeared in one conversation.

So I ran the opposite experiment: no team, no brief handed down to me, no committee — one operator, building a brand from zero and shipping it end to end. The test case was [BuiltBySwami](https://www.builtbyswami.com/) itself — a website, a newsletter, and a daily habit of writing about what's actually happening in tech and AI. Not a side project I could half-finish. A real brief I had to write for myself, then hold myself to.

## The brief I wrote myself

No one was going to tell me what "done" looked like, so I had to define it before I touched anything.

**Know who it's for.** Not "tech news for everyone" — product managers, builders, and people tracking applied AI, specifically. A narrow reader, addressed narrowly.

**Design the system before the content.** What a daily roundup looks like, how it moves from the site to the newsletter to a social post without being rewritten three times, how the archive compounds instead of scrolling away.

**No ads, no sponsorships, no affiliate links.** Not a moral stance — a scope constraint. The first version of this brand needed to be about earning trust, not revenue, and it kept the whole build inside the non-commercial terms of the free tier I was hosting on.

## The build

Claude did the execution — scaffolding the React 19 and TypeScript site, wiring up Vite and Tailwind CSS 4, pair-programming through the SEO and social-preview layer a client-rendered app needs to get right, the kind of work that would've taken a team weeks. Gemini sits inside the content workflow itself — drafting and structuring the daily roundup faster than doing it by hand, while I stay the editor: deciding what's worth covering, cutting what isn't, adding the point of view on top.

Everything ships from one GitHub repo — a push to `main` triggers an automatic Vercel build and deploy, static SPA, no server to babysit. The newsletter signup is embedded directly on the site instead of just linked out, so the funnel from reader to subscriber has as few steps as possible.

## What actually broke

The honest one: `robots.txt` on the live site points crawlers to `/sitemap.xml` — and there's a real sitemap file sitting in `public/`. But the SPA's catch-all rewrite (every route resolves to the app shell) catches that request before it ever reaches the static file. The sitemap has existed since close to launch. It has never once been served as actual XML.

Nothing about that bug is subtle once you look for it. It's exactly the kind of gap that survives because nothing about the site *looks* broken — the pages render, the content ships, the roundup goes out every day. The failure is invisible unless you go check what a crawler actually receives, which is precisely the kind of check that's easy to skip when you're both the operator and the only QA the project has.

## Steal this

- **Write the brief before you touch the tools.** The one constraint that survived the build intact — no ads, no sponsorships — was the one I'd decided and written down before anything else got built. Everything I left as a vague intention drifted.
- **A layoff is just an unscheduled brief.** The runway disappearing didn't remove the need for a plan — it just moved the deadline for writing one up to immediately.
- **AI changes the pace, not the judgment.** Claude and Gemini moved the build and the writing faster than I could alone. Neither one told me what was worth building or worth saying, or checked what a crawler actually sees. That part stays mine, every day.
- **Being both the builder and the only QA means some bugs hide in plain sight.** The stuff that renders fine for a human reader can still be silently broken for everything else reading your site.

This is the same practice as every other build in this series — operator taste setting direction, AI handling velocity — except this time the product was the platform itself, not something built on top of it.

**Read more or subscribe: [Builtbyswami Weekly](https://builtbyswami.beehiiv.com/).**
