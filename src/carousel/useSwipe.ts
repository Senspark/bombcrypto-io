import React, { useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

export const useSwipe = () => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [distance, setDistance] = useState(0);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 1;

  function onTouchStart(event) {
    setTouchStart(event.touches[0].clientX);
  }

  function onTouchMove(event) {
    if (touchStart != null) {
      const distance = event.touches[0].clientX - touchStart;
      setDistance(distance);
      setTouchStart(event.touches[0].clientX);
    }
  }

  function onTouchEnd(
    apiRef: scrollVisibilityApiType,
    keyVisible: number,
    maxKey: number,
  ) {
    if (!touchStart || apiRef == null) return;
    const isSwipe = Math.abs(distance) > minSwipeDistance;
    const isLeftSwipe = distance < minSwipeDistance;
    if (isSwipe) {
      if (isLeftSwipe) {
        if (keyVisible < maxKey) {
          apiRef.scrollNext();
          return;
        }
      } else {
        if (keyVisible > 0) {
          apiRef.scrollPrev();
          return;
        }
      }
    }
    const itemElement = apiRef?.getItemByIndex(keyVisible);
    if (itemElement !== null) {
      apiRef?.scrollToItem?.(itemElement);
    }
  }

  return { onTouchStart, onTouchEnd, onTouchMove };
};
