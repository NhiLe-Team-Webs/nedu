'use client';

import React, { useRef, useEffect } from 'react';
import { CountdownTimer } from './CountdownTimer';
import confetti from 'canvas-confetti';
import { EVENT_END } from '@/lib/event-config';

interface HeroSectionProps {
    onRegister: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRegister }) => {


    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Create a confetti instance that draws on our specific canvas
        const myConfetti = confetti.create(canvasRef.current, {
            resize: true,
            useWorker: true
        });

        let animationFrameId: number;
        let isActive = true;

        // Animation loop for falling confetti (snow effect)
        const frame = () => {
            if (!isActive) return;

            // Throttle: Only fire ~20% of frames to keep it subtle
            if (Math.random() < 0.2) {
                myConfetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: 200, // Stay on screen longer
                    origin: {
                        x: Math.random(),
                        y: -0.1 // Start just above the top
                    },
                    colors: ['#D32F2F', '#FFD700', '#FFEB3B', '#FF80AB', '#FFFFFF'], // Tet colors
                    gravity: 0.6, // Fall speed
                    scalar: Math.random() * 0.4 + 0.6, // Random sizes
                    drift: (Math.random() - 0.5) * 0.8, // Sway left/right
                    shapes: ['circle', 'square'],
                    disableForReducedMotion: true
                });
            }

            animationFrameId = requestAnimationFrame(frame);
        };

        frame();

        return () => {
            isActive = false;
            cancelAnimationFrame(animationFrameId);
            myConfetti.reset();
        };
    }, []);

    return (
        <section className="relative w-full bg-[#FFF5F5] overflow-hidden pt-12 pb-16 lg:pb-24 mt-[-1px]">
            {/* Confetti Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
            />

            {/* Decorative Background Elements - Pink/Red for Spring/Tet */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {/* Top left "Lantern" glow */}
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-red-100 rounded-full blur-3xl opacity-70"></div>
                {/* Bottom right "Peach Blossom" glow */}
                <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-pink-100 rounded-full blur-3xl opacity-60"></div>
                {/* Gold accent center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-yellow-50/50 rounded-full blur-3xl opacity-40"></div>
            </div>



            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center">

                    {/* Title - Lì Xì Khai Xuân */}
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-[#D32F2F] uppercase tracking-tighter mb-4 leading-tight max-w-5xl drop-shadow-sm mt-4">
                        LÌ XÌ <span className="text-[#F59E0B]">KHAI XUÂN</span>
                    </h1>

                    {/* Subtitle - Nhận Lộc Đầu Năm */}
                    <h2 className="text-[#D32F2F] font-black text-2xl md:text-4xl uppercase tracking-wide max-w-4xl mx-auto mb-6 leading-relaxed drop-shadow-sm">
                        NHẬN LỘC ĐẦU NĂM
                    </h2>

                    {/* Limited Quantity Badge - Gold Bar Style (Thỏi vàng) - Smaller Size */}
                    <button
                        onClick={onRegister}
                        className="mb-8 relative group cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-400/50 rounded-lg"
                        aria-label="Đăng ký nhận lộc ngay, số lượng có hạn"
                    >
                        <div className="relative transform -rotate-2 group-hover:rotate-0 transition-all duration-300 ease-out group-hover:scale-105">
                            {/* Main Gold Bar Body */}
                            <div className="relative inline-flex items-center justify-center bg-gradient-to-br from-[#FFD700] via-[#FFEB3B] to-[#FBC02D] text-[#D50000] px-6 py-2 rounded shadow-md border border-[#F9A825]">

                                {/* Shine/Reflection effect */}
                                <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/40 to-transparent rounded-t pointer-events-none"></div>

                                {/* Content - Flex row centered */}
                                <div className="flex items-center justify-center gap-2 relative z-10">
                                    <span className="font-black italic text-base md:text-lg tracking-wider text-[#D50000] uppercase leading-none pb-0.5 drop-shadow-sm">
                                        Số Lượng Có Hạn
                                    </span>
                                </div>
                            </div>
                        </div>
                    </button>

                    {/* Countdown Area */}
                    <div className="flex flex-col items-center mb-8">
                        <p className="text-[#D32F2F] text-sm font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            🌸 Thời khắc nhận lộc còn lại 🌸
                        </p>
                        <CountdownTimer targetDate={EVENT_END} />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
