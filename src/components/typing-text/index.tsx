import { useEffect, useState } from "react";

const TypingText = ({ text, speed = 50 }: any) => {
    const [displayed, setDisplayed] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            current++;
            setDisplayed(text.slice(0, current));
            if (current >= text.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <span>
            {displayed}
            {
                isTyping && <span className="inline-block w-[2px] h-[1em] bg-current ml-1 animate-pulse" style={{ animation: 'blink 1s infinite' }}>|</span>
            }

            <style jsx>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `}</style>
        </span>
    );
};

export default TypingText;