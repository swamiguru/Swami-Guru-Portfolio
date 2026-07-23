A few months ago, my role at Condé Nast was made redundant as part of a restructuring. Instead of going straight into the next job search, I gave myself a different assignment first: build something of my own, from the ground up, and put my name on it.

That became [BuiltBySwami](https://www.builtbyswami.com/) — a website, a newsletter, and a few social channels, all built around one daily habit: The Daily Tech Roundup, a short, honest digest of what's actually happening in tech and AI.

This is the story of why I built it, how I planned and executed it, and — since this is what people ask me most — exactly where and how AI helped along the way.

Whether you build products for a living, hire people who do, or just have five minutes and some curiosity, I've tried to write this so it makes sense to you too.

## Why I built it

I didn't want another post that disappears in a week, or a page that lives on someone else's platform, subject to someone else's rules. I wanted something I fully own — the website, the writing, the way it looks, the relationship with the people who read it.

So I built three things that work together:

- **A website** ([builtbyswami.com](https://www.builtbyswami.com/)) — the permanent home. Everything I publish lives here and stays here, instead of scrolling away and disappearing.
- **A newsletter** ("Builtbyswami Weekly") — a direct way to reach people, without depending on an algorithm to decide who sees it.
- **Social posts** — how people discover the work in the first place.

The real goal wasn't to build a media business. It was simpler: prove to myself that I could take an idea, plan it properly, and build the whole thing myself — with no team, no committee, and nobody to blame but me if it didn't work.

One decision shaped everything else: no ads, no sponsorships, no paid promotions. Not because making money is wrong, but because I wanted this first version to be about earning trust, not revenue. It also kept things simple — free from the complications that come with running ads on a site.

## How I planned it

Once I knew what I wanted to build, the plan came down to a few simple decisions, made in order:

1. **Know who it's for.** This isn't "tech news for everyone." It's written for people who care about products, building things, and how AI is actually being used — a specific reader, not a general one.
2. **Design how things work before writing anything.** Before I wrote a single roundup, I worked out the format: what a daily post looks like, how a video section fits in, and how one piece of writing could go from the website to the newsletter to a social post without being rewritten three times.
3. **Build it properly, not from a template.** The website isn't a pre-made theme with a logo dropped in — it's built from scratch, with its own look and feel, and it's been refined gradually, the same way you'd polish any product over time.
4. **Start small, then build on what works.** The first version was as simple as it could be while still doing the basic job: publish something, share it, see what people think, repeat. Everything since has been added on top of a foundation that already worked.

![Vision → Strategy → Execution → Iterate](/notes/why-i-built-builtbyswami-from-scratch/vision-strategy-execution.png)

## How I actually built it, start to finish

I approached building this the same way I'd approach building any new product from scratch:

- **Foundation first** — get the basic website and publishing process working reliably before anything else.
- **The daily format next** — design the roundup format once, so it can be reused every single day without extra effort.
- **Make it easy to follow** — put the newsletter sign-up right on the site itself, instead of just linking out somewhere else, so it takes as few steps as possible to subscribe.
- **Add tracking once things were live** — set up basic analytics early enough to learn from real readers, without letting that slow down actually shipping something.

Since then, it's been the same small loop, over and over: publish, watch what happens, improve. No big relaunches — just steady, visible progress, which is really the whole idea behind "building in public."

## Where AI actually helped

This is the part people are usually most curious about, so here's the honest, specific version — not a buzzword version.

AI didn't replace my thinking here — it removed friction in three specific places:

1. **Writing help.** I use Claude and Gemini to help draft and organize the daily roundup faster than doing it entirely by hand. I still do the important part myself: deciding what's actually worth covering, cutting what isn't, and adding my own point of view on top.
2. **Building faster.** I built the site itself while working alongside AI tools the whole way through — from putting components together to fixing technical details that help the site show up properly in Google search and social media previews. AI didn't build the product for me, but it meant one person could build something this complete, solo, much faster than before.
3. **Learning what works.** Basic data on what people read and search for quietly feeds back into what I choose to cover next — a small, ongoing loop between what gets published and what people actually care about.

![The Content & AI Pipeline](/notes/why-i-built-builtbyswami-from-scratch/ai-content-pipeline.png)

## The tech stack, for the technically curious

If you're curious about what's actually running under the hood, here's the honest list — feel free to skip this section if it's not your thing.

**What the website is built with**

- React and TypeScript (the core building blocks of the site)
- Vite (the tool that builds and packages the site)
- Tailwind CSS (for styling and layout)
- Framer Motion (for the small animations and interactions)
- A custom step that makes sure each page shows up correctly when shared on Google or social media

**Behind the scenes**

- Resend, for sending emails like confirmations
- Claude AI - Code, Cowork, Design, and Google's Gemini, for content help as described above

**Where it all lives**

- The code lives on GitHub, and every update automatically rebuilds and republishes the site
- The site is hosted on Vercel, which handles the technical hosting so I don't have to run any servers myself
- Google Tag Manager, Google Analytics, and Google Search Console, for basic visibility into who's reading and finding the site

**Newsletter and domain**

- Beehiiv powers the newsletter, with sign-up built directly into the site
- The domain is registered through GoDaddy and points to the site's hosting

![Architecture at a Glance](/notes/why-i-built-builtbyswami-from-scratch/architecture-overview.png)

## Why I'm sharing this

Whether you build products, hire people who do, or just enjoy seeing how things get made — here's the honest reason I'm sharing this: it's proof of how I think and work. Start with a clear reason for doing something, turn it into a real plan, build the whole thing yourself, and use AI as a genuine tool rather than a buzzword.

Nobody approved this plan but me. Nobody else owns how it turns out. That's kind of the whole point.

If any of this resonates — whether you're building something similar, curious about how AI fits into real work, or just want to say hi — I'd love to connect.

Cheers,

Swami

**[BuiltBySwami.com](https://www.builtbyswami.com/) | [Builtbyswami Weekly](https://builtbyswami.beehiiv.com/) (newsletter)**
