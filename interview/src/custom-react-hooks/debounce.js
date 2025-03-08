import {useState, useEffect} from 'react';

const useDebounce = (inputValue, wait) => {
    const [debouncedValue, setDebouncedValue] = useState('');
    useEffect(() => {
        let timer = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, wait);
        return () => clearTimeout(timer); 
    }, [inputValue, wait]);
    return debouncedValue;
}

export default useDebounce;