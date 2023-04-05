import { useCallback, useState } from "react";
import useEventListener from "./useEventListener";

type UseLocalStorageOpts = {
  sync: boolean;
};

const defaultOpts = {
  sync: false,
};

// Credit: https://usehooks.com/useLocalStorage/
const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  opts: UseLocalStorageOpts = defaultOpts,
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } else {
        return initialValue;
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEventListener("storage", (evt: StorageEvent) => {
    if (opts.sync && evt.storageArea === localStorage && evt.key === key) {
      try {
        setStoredValue(evt.newValue ? JSON.parse(evt.newValue) : evt.newValue);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const setValue = useCallback(
    (newValue: string | Function) => {
      try {
        setStoredValue((currentValue: string) => {
          const result =
            typeof newValue === "function" ? newValue(currentValue) : newValue;
          window.localStorage.setItem(key, JSON.stringify(result));
          return result;
        });
      } catch (error) {
        console.error(error);
      }
    },
    [key],
  );

  const clearValue = useCallback(() => {
    try {
      setStoredValue(undefined);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [storedValue, setValue, clearValue];
};

export default useLocalStorage;
