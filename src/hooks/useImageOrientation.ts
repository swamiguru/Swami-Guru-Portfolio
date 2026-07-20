/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Measures an image's natural aspect ratio once it loads, so a card built
 * around it can size itself to match instead of forcing a fixed box. Useful
 * when a media source (e.g. a YouTube channel mixing landscape long-form
 * videos and portrait Shorts) doesn't tell you the orientation up front.
 */

import { useEffect, useState } from "react";

export type Orientation = "landscape" | "portrait";

export function useImageOrientation(
  src: string | undefined,
  fallback: Orientation = "landscape"
): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(fallback);

  useEffect(() => {
    if (!src) return;
    let active = true;
    const img = new window.Image();
    img.onload = () => {
      if (active) {
        setOrientation(img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait");
      }
    };
    img.src = src;
    return () => {
      active = false;
    };
  }, [src]);

  return orientation;
}
