'use client';

import React, { useEffect, useRef, useState } from 'react';

// Renders an HTML graphic (served from public/news/) at its real,
// fixed design resolution, then scales the WHOLE thing down uniformly
// to fit whatever box it's placed in — like zooming out on a
// screenshot. This is deliberately different from making the graphic's
// own CSS "responsive" (vw/vh, clamp()): those approaches reflow text
// and portraits differently at every size, which is what caused the
// cramped/overlapping look before. Scaling keeps every proportion
// exactly as designed, at any size.
//
// Usage:
//   <GraphicEmbed src="/news/post_1.html" designWidth={1600} designHeight={900} />
//
// The wrapping element should control the box size (e.g. via an
// aspect-ratio or fixed height utility class) — this component fills
// 100% of whatever that box is and scales its content to match.

interface GraphicEmbedProps {
  src: string;
  designWidth: number;
  designHeight: number;
  title?: string;
  /** 'contain' (default) = scale to fit fully inside the box, no
   *  cropping, small letterbox gaps allowed if aspect ratios differ.
   *  'cover' = fill the box completely, cropping any excess. */
  fit?: 'contain' | 'cover';
}

export default function GraphicEmbed({ src, designWidth, designHeight, title, fit = 'contain' }: GraphicEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const containerWidth = el.offsetWidth;
      const containerHeight = el.offsetHeight;
      const scaleX = containerWidth / designWidth;
      const scaleY = containerHeight / designHeight;
      setScale(fit === 'cover' ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY));
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [designWidth, designHeight, fit]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden pointer-events-none">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        style={{
          width: designWidth,
          height: designHeight,
          border: 0,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
}