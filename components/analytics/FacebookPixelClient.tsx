'use client';

import dynamic from 'next/dynamic';

const FacebookPixel = dynamic(
  () => import('./FacebookPixel').then((mod) => mod.default),
  { ssr: false }
);

export default function FacebookPixelClient() {
  return <FacebookPixel />;
}
