import { useState } from 'react';

export default function useClipboard(timeout) {
    const [copied, setCopied] = useState(false);
    const copyValue = async(text) => {
        if (!navigator.clipboard) {
            throw Error('Clipboard not exist');
        }

        try {
            await navigator.clipboard.write(text);
            setCopied(true);
            setTimeout(() => setCopied(false), timeout);
            return true;
        } catch (error) {
            console.error("Copy failed", err);
            setCopied(false);
            return false;
        }
    }

    return {copied, copyValue};
}