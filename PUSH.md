# Pushing to GitHub and deploying

The repo at **https://github.com/GPFI18/Website-2026** was empty, so this is the
first push. Open a terminal in this folder (`gpfi-website-2026`) and run:

```bash
git init -b main
git add .
git commit -m "Build the Global Peace for Israel site from the 2026 design handoff"
git remote add origin https://github.com/GPFI18/Website-2026.git
git push -u origin main
```

If the remote already exists from an earlier attempt, use
`git remote set-url origin https://github.com/GPFI18/Website-2026.git` instead of
`git remote add`.

## Check it runs first (optional but worth it)

```bash
npm install
npm run build     # should finish with 20 static routes
npm run dev       # http://localhost:3000
```

`node_modules/` and `.next/` are already in `.gitignore`, so neither gets
committed.

## Vercel

1. In Vercel, **Add New → Project** and import `GPFI18/Website-2026`.
2. Framework preset: **Next.js** (detected automatically). Leave the build and
   output settings alone.
3. Add the environment variables from `.env.example` under
   **Settings → Environment Variables**. At minimum set
   `NEXT_PUBLIC_SITE_URL` to the real hostname before going live.
4. Deploy. Every later push to `main` redeploys; pull requests get their own
   preview URL.

The forms need `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` before submissions are
delivered — until then they are logged server-side and the visitor still sees
the confirmation. See the README for the full list.
