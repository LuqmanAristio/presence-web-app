/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export function useSessionStorage(key, initialValue) {
    const [value, setValue] = useState(() => getInitialValue(key, initialValue));
    
    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}

const getInitialValue = (key, initialValue) => {
    const storedValue = JSON.parse(sessionStorage.getItem(key));
    if(storedValue) return storedValue;
    if(initialValue instanceof Function) return initialValue();
    return initialValue;
}