// app/data/news/_newsType.ts
//
// Shared type used by every individual news post file (e.g.
// posts/post_1.ts). Each post has TWO graphics, both rendered LIVE via
// GraphicEmbed (never screenshots), both served from public/news/:
//
//   - thumbGraphicFile: a simple, text-light graphic (one hero stat +
//     portrait, centered) used on the news list page — for BOTH the
//     big featured/hero card and the smaller "All News" grid cards.
//     Neither overlays text on top of it (graphic sits in its own box,
//     title/summary/date sit in a separate panel below), so a single
//     centered version works cleanly at both sizes.
//   - graphicFile: the FULL breakdown (hero stat + top-3 board), shown
//     only on the individual post's detail page, where there's room
//     for the extra detail.

export interface NewsPost {
  id: string;              // e.g. "post-1" — used for the URL slug
  title: string;
  date: string;              // ISO date string, e.g. "2026-08-05"
  thumbGraphicFile: string; // e.g. "post_1_thumb.html" — hero card + grid cards
  graphicFile: string;      // e.g. "post_1.html" — detail page only
  summary: string;           // 1-2 sentence teaser shown on the list page
  body: string[];            // one paragraph per array entry
}