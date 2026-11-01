# Insights editor (/keystatic)

Posts live as Markdown in `content/insights`. The editor at `/keystatic` is a
form over those same files: it never publishes directly. Every post reaches the
site through a reviewed pull request, which is the compliance read - Percapita
is an AMFI-registered distributor, so commentary is checked before it goes live.

## Writing a post (once set up)

1. Go to `https://percapita.in/keystatic` and sign in with GitHub.
2. **Create a branch** from the branch picker (top left), e.g. `insights/regular-vs-direct`.
   Never edit on `main`.
3. **Insights → Add**. Fill in title, summary, date, topic and the body.
   Leave **Draft** ticked until the post is ready for review.
4. **Save**. This commits to your branch.
5. Untick Draft when ready, save, then use **Create pull request** from the
   branch menu. The reviewer checks the copy and merges; the host redeploys.

Headings (H2/H3), bold, italic, lists, links, quotes, tables and dividers are
available. Images and code blocks are off until `src/components/MdxContent.tsx`
styles them.

## Local editing (developers)

`npm run dev`, then open `http://localhost:3000/keystatic`. In development the
editor writes straight to `content/insights` on disk - commit as usual. A post
created while the dev server is running 404s until the server is restarted
(static params are cached).

## One-time setup: GitHub App

Production needs a GitHub App so editors can sign in. Until its variables are
set on the host, `/keystatic` loads but cannot sign in, and the build still
succeeds.

1. Locally, add `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` to `.env.local` and run
   `npm run dev`.
2. Open `http://localhost:3000/keystatic`. Keystatic offers to create a GitHub
   App; create it under the **aryansahal** account. It writes four
   variables to `.env`:
   `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
   `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
3. Install the app on the `percapita-site` repository when GitHub asks.
4. In the app's settings on GitHub (Settings → Developer settings → GitHub
   Apps), add the production callback URL:
   `https://percapita.in/api/keystatic/github/oauth/callback`
5. Copy the four variables into the host's environment and redeploy.
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` is read at build time, so it must be
   set before the build, not only at runtime.
6. Remove `NEXT_PUBLIC_KEYSTATIC_STORAGE` from `.env.local` and move the values
   from `.env` into `.env.local` (both are gitignored).

### Protect `main`

Keystatic lets anyone with write access commit to whichever branch they pick,
including `main`. To make review mandatory, add a branch protection rule on
GitHub (repo Settings → Branches → `main`): **Require a pull request before
merging**, with at least one approval. Keystatic then cannot save to `main` and
editors have to work on a branch.

Editors need write access to the repository to save.
