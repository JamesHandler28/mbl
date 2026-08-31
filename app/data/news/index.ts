// app/data/news/index.ts
//
// Collects every individual post into one sorted list. Each post is a
// single flat file under posts/ — e.g. posts/post_1.ts. Every post has
// TWO graphics: thumbGraphicFile (hero card + grid cards) and
// graphicFile (full detail, detail page only) — both served straight
// from public/news/.
//
// Add a new post by:
//   1. Creating posts/post_N.ts (copy an existing one's shape)
//   2. Saving both graphics directly to public/news/post_N_thumb.html
//      and public/news/post_N.html
//   3. Importing it below and adding it to ALL_POSTS

import { NewsPost } from './_newsType';
import { POST_1 } from './posts/post_1';
import { POST_2 } from './posts/post_2';
import { POST_3 } from './posts/post_3';
import { POST_4 } from './posts/post_4';
import { POST_5 } from './posts/post_5';
import { POST_6 } from './posts/post_6';
import { POST_7 } from './posts/post_7';
import { POST_8 } from './posts/post_8';
import { POST_9 } from './posts/post_9';

const ALL_POSTS: NewsPost[] = [
  POST_1,
  POST_2,
  POST_3,
  POST_4,
  POST_5,
  POST_6,
  POST_7,
  POST_8,
  POST_9,
  // POST_9, ... add new posts here as you write them
];

// Newest first
export const NEWS_POSTS: NewsPost[] = [...ALL_POSTS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);