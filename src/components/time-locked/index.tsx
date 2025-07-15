import React, { useState, useEffect, useCallback } from 'react';

interface TimeLockedProps {
    children: React.ReactNode;
    cooldownTime?: number; 
    onLockedClick?: () => void; 
    className?: string;
    disabled?: boolean;
    showCountdown?: boolean; 
    countdownFormat?: 'seconds' | 'milliseconds';
}

const TimeLocked: React.FC<TimeLockedProps> = ({
    children,
    cooldownTime = 30000,
    onLockedClick,
    className = '',
    disabled = false,
    showCountdown = true,
    countdownFormat = 'seconds'
}) => {
    const [isLocked, setIsLocked] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (disabled || isLocked) {
            e.preventDefault();
            onLockedClick?.();
            return;
        }

        setIsLocked(true);
        setRemainingTime(cooldownTime);
    }, [disabled, isLocked, cooldownTime, onLockedClick]);

    useEffect(() => {
        if (!isLocked) return;

        const timer = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 100) {
                    setIsLocked(false);
                    return 0;
                }
                return prev - 100;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [isLocked]);

    const formatRemainingTime = () => {
        if (countdownFormat === 'seconds') {
            return Math.ceil(remainingTime / 1000);
        }
        return Math.ceil(remainingTime / 100);
    };

    return (
        <div
            className={`time-locked  ${className} ${isLocked ? 'locked' : 'cursor-pointer'} ${disabled ? 'disabled' : 'cursor-pointer'}`}
            onClick={handleClick}
            style={{
                position: 'relative',
                // cursor: isLocked || disabled ? 'not-allowed' : 'pointer',
            }}
        >
            {!isLocked && children}

            {isLocked && showCountdown && (
                <div
                    style={{
                        fontSize: '12px',
                    }}
                >
                    {formatRemainingTime()}
                    {countdownFormat === 'seconds' ? 's' : 'ms'}
                </div>
            )}
        </div>
    );
};

export default TimeLocked;
