import dayjs from "dayjs";
import { useCallback, useState } from "react";

type GetCookieFn = (key: string) => any;

type SetCookieFn = (key: string, value: any, expire_days: number) => void;

type UpdateCookieFn = (value: any, expire_days: number) => void;

type ClearCookieFn = () => void;

type UseCookieResult = {
  cookie: null | any;
  getCookie: GetCookieFn;
  setCookie: SetCookieFn;
  updateCookie: UpdateCookieFn;
  clearCookie: ClearCookieFn;
};

const retrieveCookie = (key: string) => {
  return document.cookie.split("; ").reduce((result, currentCookie) => {
    const item = currentCookie.split("=");
    const storedKey = item[0];
    const storedValue = item[1];
    return key === storedKey
      ? JSON.parse(decodeURIComponent(storedValue))
      : result;
  }, "" as any);
};

const storeCookie = (key: string, value: any, expire_days: number) => {
  let valueStr = JSON.stringify(value);
  const expires = dayjs().add(expire_days, "day").toDate();
  document.cookie = `${key}=${valueStr}; expires=${expires.toUTCString()}; path=/`;
};

const useCookie = (
  defaultKey?: string,
  defaultValue?: any,
): UseCookieResult => {
  const [key, setKey] = useState(defaultKey || "");
  const [value, setValue] = useState<null | any>(
    () => (key && retrieveCookie(key)) || defaultValue,
  );

  const setCookie = useCallback(
    (key: string, value: any, expire_days: number) => {
      setKey(key);
      setValue(value);
      storeCookie(key, value, expire_days);
    },
    [],
  );

  const updateCookie = useCallback(
    (value: any, expire_days: number) => {
      if (key) {
        setValue(value);
        storeCookie(key, value, expire_days);
      }
    },
    [key],
  );

  const clearCookie = useCallback(() => {
    if (key) {
      setValue(null);
      storeCookie(key, "", 0);
    }
  }, [key]);

  return {
    cookie: value,
    getCookie: retrieveCookie,
    setCookie,
    updateCookie,
    clearCookie,
  };
};

export default useCookie;
export type { UpdateCookieFn, ClearCookieFn, UseCookieResult };
