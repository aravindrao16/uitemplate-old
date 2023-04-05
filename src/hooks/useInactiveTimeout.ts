import { useRouter } from "next/router";
import Paths from "paths";
import { useEffect, useRef } from "react";
// ----------------------------------------------------------------------

const defaultInactiveTimeout = 1800000; // 30 mins

const useInactiveTimeout = (
    inactiveTimeout: number = defaultInactiveTimeout,
    onInactiveTimeout?: () => void,
    isAuth: boolean = false,
) => {
    const router = useRouter();

    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (!isAuth) {
            return;
        }

        const handleUserActivity = () => {
            clearTimeout(timerRef.current);
            //set timeout for session expire e.g for 60 mins -- 3600000            
            timerRef.current = setTimeout(() => onInactiveTimeout ? onInactiveTimeout() : router.push(Paths.Error), inactiveTimeout);
        };

        addEventListener('mousemove', handleUserActivity);
        addEventListener('click', handleUserActivity);
        addEventListener('mouseup', handleUserActivity);
        addEventListener('mousedown', handleUserActivity);
        addEventListener('keydown', handleUserActivity);
        addEventListener('keypress', handleUserActivity);
        addEventListener('keyup', handleUserActivity);
        addEventListener('submit', handleUserActivity);
        addEventListener('change', handleUserActivity);
        addEventListener('mouseenter', handleUserActivity);
        addEventListener('scroll', handleUserActivity);
        addEventListener('resize', handleUserActivity);
        addEventListener('dblclick', handleUserActivity);

        handleUserActivity();

        return () => {
            clearTimeout(timerRef.current);
            removeEventListener('mousemove', handleUserActivity);
            removeEventListener('click', handleUserActivity);
            removeEventListener('mouseup', handleUserActivity);
            removeEventListener('mousedown', handleUserActivity);
            removeEventListener('keydown', handleUserActivity);
            removeEventListener('keypress', handleUserActivity);
            removeEventListener('keyup', handleUserActivity);
            removeEventListener('submit', handleUserActivity);
            removeEventListener('change', handleUserActivity);
            removeEventListener('mouseenter', handleUserActivity);
            removeEventListener('scroll', handleUserActivity);
            removeEventListener('resize', handleUserActivity);
            removeEventListener('dblclick', handleUserActivity);
        };
    }, [isAuth, router, onInactiveTimeout, inactiveTimeout]);
}
export default useInactiveTimeout;

// Usage
//const onInactiveTimeout = () => { console.log("timer end") };
//useInactiveTimeout(30000, onInactiveTimeout, isAuthenticated);