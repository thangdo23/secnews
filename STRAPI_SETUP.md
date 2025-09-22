Quick Strapi setup for SecNews

This project expects a Strapi v4 instance exposing a content-type for news items.

Recommended content-type: `tintucs` (or set `NEXT_PUBLIC_CMS_CONTENT_TYPE` to your content-type name)

Suggested fields for `tintucs`:
- tieude (string) — title
- noidung (richtext/text) — content
- author (string)
- published_at (datetime)
- image (media) — upload image

Important Strapi settings when publishing:
- Public role permissions: allow `find` and `findOne` for the content-type (so public API /api/tintucs and /api/tintucs/:id are accessible).
- When returning images, Strapi returns paths relative, for example `/uploads/xxx.jpg`.
  Set `NEXT_PUBLIC_CMS_URL` to the base Strapi URL (e.g. `http://localhost:1337`). The frontend will prefix relative image URLs with this base.

Env vars (set in `.env.local` or your deployment platform):
- NEXT_PUBLIC_CMS_URL=http://localhost:1337
- NEXT_PUBLIC_CMS_CONTENT_TYPE=tintucs

Example curl to list items:

```bash
curl "${NEXT_PUBLIC_CMS_URL}/api/tintucs?populate=*"
```

If Strapi uses a different base route or auth, adjust `src/lib/cms.ts` accordingly.
