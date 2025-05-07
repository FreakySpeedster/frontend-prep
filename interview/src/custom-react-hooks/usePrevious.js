import { useRef, useEffect } from "react";

export default function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    // return statement executes before useEffect
    // So this will always return previous value

    return ref.current;
}

