For eleven years I built products with teams, roadmaps, and runway — scaling digital platforms for Vogue, GQ, Wired, Condé Nast Traveler, and Newsweek. Big org, big resources, big timelines.

So I keep running the opposite experiment: no team, no runway, one operator, one sitting. This time the test case was Free Word Tool — a browser-based word and character counter. On paper, the simplest utility I could pick. That's exactly why it was useful: if the AI-native method only holds up on hard problems, it isn't actually a method, it's a trick.

The whole thing shipped on June 15, 2026, in eight commits from empty repo to live on freewordtool.com — Astro, Tailwind CSS 4, deployed on Vercel, Claude Code doing the execution. The first commit is titled "Word Counter micro-tool." The last is a Claude settings tweak to allow WebFetch on the live domain. Everything in between is the actual build. But the interesting part wasn't the speed. It was watching myself, mid-sprint, almost turn a ten-minute utility into an unfocused five-app bundle — and having to catch it in real time.

## Why a word counter

Word counters are a commodity. There are a dozen of them, most cluttered with ads, most uploading your text to a server you didn't ask about. That's a low bar, and low bars are useful test cases: the product problem is small enough to hold entirely in your head, which means every design decision is visible, including the bad ones. There's nowhere to hide behind complexity.

It's also a genuinely useful catalog piece. Free Word Tool sits alongside the other small, focused tools I'm shipping under builtbyswami.com — each one a self-contained proof that a single operator, using Claude as the build partner, can take a real utility from brief to production without a team.

And I wasn't guessing at who'd use it. Eleven years on editorial and platform teams means I've sat next to the people who hit these limits every day: social media managers and content creators trimming a caption to fit a character cap, writers and bloggers tracking a draft against a target, SEO specialists checking a meta description won't truncate, students and academics counting toward an essay minimum, public speakers timing a script to a slot. The brief wasn't abstract — it was six job-to-be-done cases I'd watched people do manually, badly, for years. Privacy-conscious users made the list too, for a different reason: everyone on that list works with drafts they don't want sitting on someone else's server before publish.

## The method

I ran the same discipline I use on every sprint now, with Claude Code doing the execution:

**Write the context before the code.** Before anything got generated, I wrote the brief: who this is for — the six audiences above, each with a specific limit or target they're working against — what "done" looks like, and, critically, what was explicitly out of scope. That last part turned out to matter more than usual.

**Treat Claude as a fast junior, not an oracle.** With the brief set, the core counter — words, characters, sentences, paragraphs, reading time — came together fast. Fast enough that the bottleneck immediately stopped being "can this get built" and became "should this get built," which is a much harder question to answer at speed.

**Iterate in tight loops.** Generate a feature, look at it, decide keep-or-cut, move. Cheap building doesn't remove the need for judgment — it just moves judgment into the critical path, on every single loop, instead of once at the planning stage.

**Fix the tool as you go.** One of the eight commits isn't product code at all — it's a change to Claude Code's own local settings, allowing it to fetch the live freewordtool.com domain mid-build so it could verify its own output against the real deployment. Even the AI-native method needs its own small configuration pass. That's not overhead; it's part of the loop.

## What actually broke

The honest part: nothing broke technically. What nearly broke was scope.

Because generation was so cheap, "add a Lorem Ipsum generator" or "add a readability score" or "add a words-to-pages converter" cost almost nothing to try. So I tried them. By the middle of the sprint, a single-purpose word counter had quietly grown into five adjacent tools — a character counter, a words-to-pages calculator, a reading-time estimator, an essay counter, a Lorem Ipsum generator — each reasonable on its own, and collectively a product with no center.

That's the trap of a fast junior with no taste of its own: it will build whatever you ask for, at whatever pace you ask for it, and it will never once tell you that you're diluting the thing you started building. Claude never said "this doesn't belong here." It just built it well. The discipline had to come entirely from me — going back to the brief, deciding the core counter was the product and everything else was a supporting feature, not a peer, and restructuring the information architecture so the site reads as one tool with modes, not five competing destinations.

The privacy stance — everything runs in the browser, nothing is uploaded or logged — turned out to be the one piece of scope that was non-negotiable from the brief and never drifted. It's the cleanest reminder that the parts of your context you write down and defend stay fixed; the parts you leave implicit are exactly the parts that creep.

For what it's worth, the repo's README is still the unedited Astro starter-kit boilerplate — "Seasoned astronaut? Delete this file." I never went back to it. That's the trade I made on purpose: fix the scope that reaches the user, leave the scope that doesn't.

## Steal this

- **Cheap generation makes scope creep cheap too.** Speed doesn't just accelerate the right features — it accelerates every feature, including the ones that shouldn't exist. Budget review time for "should we" as strictly as you budget it for "does it work."
- **Decide what's non-negotiable in the brief, in writing.** The one constraint that survived the sprint intact was the one I'd written down explicitly. Everything I left as a vague intention drifted.
- **The model won't tell you when you're diluting the product.** It has no opinion on focus. That judgment call is yours on every loop, not just at kickoff.
- **A rough, focused proof beats a polished sprawl.** The value wasn't five features — it was one counter that actually works well, with the rest genuinely in support of it.

This is the same practice as every other build in this series — operator taste setting direction, Claude handling velocity — except this time the lesson wasn't about what AI can't do. It was about how easily "I could build this" turns into "I should," and why that's now the harder skill to hold onto.
