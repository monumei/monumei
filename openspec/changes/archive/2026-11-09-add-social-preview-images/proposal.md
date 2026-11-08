## Why

Shared site links have no preview image. The owner requested an article card and a site fallback, then rejected the first artwork as too plain.

## What Changes

- Add detailed 1200 × 630 PNG cards using the site's Saira type, graphite panels, blue lighting, chamfers, and yellow signage.
- Set absolute Open Graph and Twitter image URLs with large-image cards and text alternatives.
- Allow a blog post to select its social image; keep a default for other pages.
- Replace the SEO check that prohibited images with required image metadata.

## Capabilities

### New Capabilities

- `social-previews`: Site-wide image fallback and post-specific sharing cards.

### Modified Capabilities

None.

## Impact

Astro layout, blog content schema and article template, sharing assets, and the existing SEO verification script. No runtime dependency or page layout changes. Source inspection is used because the GitNexus index is stale.

## Post-merge verification

Verify production page metadata and public PNG responses after the owner-authorized Vercel deployment. Existing social posts may retain cached previews.
