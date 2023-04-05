import { useEffect, useRef } from "react";

// Credit: https://usehooks.com/useEventListener/
const useEventListener = (
  eventName: string,
  handler: Function,
  winEl?: Window | Document | Element | undefined,
) => {
  const savedHandler = useRef<typeof handler>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = winEl ? winEl : window;
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      return;
    }
    const eventListener = (event: Event) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };
    element && element.addEventListener(eventName, eventListener);

    return () => {
      element && element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, winEl]);
};

export default useEventListener;
