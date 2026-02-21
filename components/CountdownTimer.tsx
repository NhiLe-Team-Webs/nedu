'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
    compact?: boolean;
    /** If provided, countdown to this specific date instead of +24h from now */
    targetDate?: Date;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ compact = false, targetDate: targetDateProp }) => {
    // Logic: Use provided targetDate, or fall back to 24 hours from now.
    const [targetDate] = useState(() => {
        if (targetDateProp) return targetDateProp;
        const date = new Date();
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
        return date;
    });

    const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number }>({ d: 0, h: 23, m: 59, s: 59 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                // Calculate total hours left (can be up to 24)
                const d = Math.floor(difference / (1000 * 60 * 60 * 24));
                const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft({ d, h, m, s });
            } else {
                setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
            }
        };

        // Run immediately
        calculateTimeLeft();

        const interval = setInterval(() => {
            calculateTimeLeft();
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    // Red Envelope Style: Red bg, Gold Text, Gold Border
    const boxClass = compact
        ? "bg-[#D32F2F] text-[#FFD700] rounded px-2 py-1.5 min-w-[34px] text-center shadow-sm border border-[#FFD700]"
        : "bg-[#D32F2F] text-[#FFD700] rounded-xl px-4 py-3 min-w-[60px] sm:min-w-[70px] text-center shadow-lg border-2 border-[#FFD700]";

    const textClass = compact
        ? "text-xl font-bold font-mono leading-none"
        : "text-2xl sm:text-3xl font-black font-mono";

    const labelClass = compact
        ? "text-[9px] text-[#D32F2F] font-bold mt-1 uppercase"
        : "text-xs text-[#D32F2F] font-bold mt-2 uppercase tracking-wider";

    const TimeUnit = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center">
            <div className={boxClass}>
                <span className={textClass}>
                    {value.toString().padStart(2, '0')}
                </span>
            </div>
            <span className={labelClass}>
                {label === "Ngày" ? "NGÀY" : label === "Giờ" ? "GIỜ" : label === "Phút" ? "PHÚT" : "GIÂY"}
            </span>
        </div>
    );

    return (
        <div className={`flex ${compact ? 'gap-1' : 'gap-3 sm:gap-5'} justify-center items-start`}>
            {timeLeft.d > 0 && (
                <>
                    <TimeUnit value={timeLeft.d} label="Ngày" />
                    <span className={`${compact ? 'text-lg' : 'text-3xl'} font-bold text-[#D32F2F] ${compact ? 'mt-0' : 'mt-2'}`}>:</span>
                </>
            )}
            <TimeUnit value={timeLeft.h} label="Giờ" />
            <span className={`${compact ? 'text-lg' : 'text-3xl'} font-bold text-[#D32F2F] ${compact ? 'mt-0' : 'mt-2'}`}>:</span>
            <TimeUnit value={timeLeft.m} label="Phút" />
            <span className={`${compact ? 'text-lg' : 'text-3xl'} font-bold text-[#D32F2F] ${compact ? 'mt-0' : 'mt-2'}`}>:</span>
            <TimeUnit value={timeLeft.s} label="Giây" />
        </div>
    );
};

export default CountdownTimer;
