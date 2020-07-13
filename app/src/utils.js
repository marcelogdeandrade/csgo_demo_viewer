import { useEffect, useRef } from 'react';
import moment from 'moment';

export function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export const formatTime = (seconds) => {
    return moment().startOf('day')
        .seconds(seconds)
        .format('mm:ss');
}