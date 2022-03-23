import throttle from 'lodash/throttle';
import { useEffect, DependencyList } from 'react';
import { isServer } from '@/lib/utils';

type Element = HTMLElement | Window | null;
interface Position {
  x: number;
  y: number;
}
export type EffectFn = (props: { prev: Position; current: Position }) => void;

const DEFAULT_INTERVAL = 50;

const getScrollPos = (el: Element): Position => {
  if (isServer() || el == null) return { x: 0, y: 0 };
  if (el === window) return { x: el.pageXOffset, y: el.pageYOffset };

  const pos = (el as HTMLElement).getBoundingClientRect();
  return { x: pos.left, y: pos.top };
};

export const useElementScroll = (
  effect: EffectFn,
  element: Element,
  interval: number = DEFAULT_INTERVAL,
  deps: DependencyList = []
): void => {
  useEffect(() => {
    let pos = getScrollPos(element);

    const onScroll = throttle(() => {
      const curPos = getScrollPos(element);
      effect({ prev: pos, current: curPos });
      pos = curPos;
    }, interval);

    (element as EventTarget).addEventListener('scroll', onScroll);

    return () => (element as EventTarget).removeEventListener('scroll', onScroll);
  }, deps);
};

export const useWindowScroll = (
  effect: EffectFn,
  interval: number = DEFAULT_INTERVAL,
  deps: DependencyList = []
): void => {
  return useElementScroll(effect, isServer() ? null : window, interval, deps);
};
