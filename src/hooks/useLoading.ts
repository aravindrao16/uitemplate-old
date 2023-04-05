import { useRouter } from "next/router";
import Paths from "paths";
import { useCallback, useEffect, useRef, useState } from "react";

const defaultTimeout = 5000;

const useLoading = (
  initialState: boolean,
  timeout: number = defaultTimeout,
  onTimeout?: () => void,
): [boolean, (loading: boolean) => void] => {
  const [isLoading, setIsLoading] = useState(initialState);
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    timerRef.current = setTimeout(() => {
      if (isLoading) {
        onTimeout ? onTimeout() : router.push(Paths.Error);
      }
    }, timeout);
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [isLoading, router, onTimeout, timeout]);

  const setLoading = useCallback((loading: boolean) => {
    if (!loading && timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsLoading(loading);
  }, []);

  return [isLoading, setLoading];
};

export default useLoading;
