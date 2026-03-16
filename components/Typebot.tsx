'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MASCOT_IMAGE_SRC = '/onioncm.png'; // file location: public/onion.png
const EYE_LEFT = { x: '29.5%', y: '42%' };
const EYE_RIGHT = { x: '51.9%', y: '42%' };
const EYE_WIDTH = '18.5%';
const EYE_HEIGHT = '18.5%';
const MOUTH_WRAPPER = { x: '40.6%', y: '59.8%', w: '18.7%', h: '7%' };

export default function Typebot() {
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const eyeRefs = useRef<Array<HTMLDivElement | null>>([]);
    const pupilRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        const resetPupils = () => {
            pupilRefs.current.forEach((pupil) => {
                if (!pupil) return;
                pupil.style.transform = 'translate(-50%, -50%)';
            });
        };

        const updatePupils = (clientX: number, clientY: number) => {
            eyeRefs.current.forEach((eye, index) => {
                const pupil = pupilRefs.current[index];
                if (!eye || !pupil) return;

                const eyeRect = eye.getBoundingClientRect();
                const eyeCenterX = eyeRect.left + eyeRect.width / 2;
                const eyeCenterY = eyeRect.top + eyeRect.height / 2;

                const dx = clientX - eyeCenterX;
                const dy = clientY - eyeCenterY;
                const angle = Math.atan2(dy, dx);

                const maxRadius = (eye.clientWidth / 2) - (pupil.offsetWidth / 2) - 2;
                const distanceToPointer = Math.hypot(dx, dy);
                const pupilDistance = Math.min(distanceToPointer * 0.15, maxRadius);

                const pupilX = Math.cos(angle) * pupilDistance;
                const pupilY = Math.sin(angle) * pupilDistance;

                pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
            });
        };

        const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        if (isCoarsePointer) {
            resetPupils();
            return;
        }

        const handleMouseMove = (event: MouseEvent) => {
            updatePupils(event.clientX, event.clientY);
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (event.touches.length < 1) return;
            updatePupils(event.touches[0].clientX, event.touches[0].clientY);
        };

        const handleMouseLeaveWindow = () => {
            resetPupils();
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeaveWindow);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('mouseleave', handleMouseLeaveWindow);
        };
    }, []);

    return (
        <>
            {/* Floating Button */}
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                    className="fixed bottom-0 right-0 md:bottom-0 md:right-0 translate-x-[12%] translate-y-[12%] w-[13rem] h-[13rem] md:w-[15rem] md:h-[15rem] bg-transparent hover:scale-105 active:scale-95 transition-transform z-[9999] flex items-center justify-center overflow-visible"
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {!imageError ? (
                    <img
                        src={MASCOT_IMAGE_SRC}
                        alt="Chat mascot"
                        className="absolute inset-0 z-[1] w-full h-full object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.14)]"
                        style={{
                            // Soft alpha mask to remove square/light panel feeling from non-transparent source.
                            WebkitMaskImage: 'radial-gradient(circle at 50% 42%, black 56%, transparent 75%)',
                            maskImage: 'radial-gradient(circle at 50% 42%, black 56%, transparent 75%)',
                        }}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <span className="absolute inset-0 z-[1] w-full h-full bg-[#FDB913] text-white flex items-center justify-center">
                        <MessageCircle size={34} />
                    </span>
                )}

                {/* Eye overlay layer to keep pupils independent from mascot image */}
                <div className="absolute inset-0 z-[2] pointer-events-none">
                    <div
                        ref={(el) => {
                            eyeRefs.current[0] = el;
                        }}
                        className="absolute rounded-full bg-transparent"
                        style={{
                            left: EYE_LEFT.x,
                            top: EYE_LEFT.y,
                            width: EYE_WIDTH,
                            height: EYE_HEIGHT,
                        }}
                    >
                        <div className="absolute left-1/2 top-1/2 w-[64%] h-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff8ea] shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)] overflow-hidden">
                            <div
                                ref={(el) => {
                                    pupilRefs.current[0] = el;
                                }}
                                className="absolute left-1/2 top-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_38%_30%,#bf7338_0%,#8b4a23_72%,#6a3518_100%)]"
                                style={{ transition: 'transform 0.05s linear' }}
                            >
                                <div className="absolute left-1/2 top-1/2 w-[58%] h-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1f120c]" />
                                <div className="absolute top-[13%] left-[17%] w-[36%] h-[36%] rounded-full bg-white/95" />
                                <div className="absolute bottom-[17%] right-[17%] w-[15%] h-[15%] rounded-full bg-white/75" />
                            </div>
                        </div>
                    </div>

                    <div
                        ref={(el) => {
                            eyeRefs.current[1] = el;
                        }}
                        className="absolute rounded-full bg-transparent"
                        style={{
                            left: EYE_RIGHT.x,
                            top: EYE_RIGHT.y,
                            width: EYE_WIDTH,
                            height: EYE_HEIGHT,
                        }}
                    >
                        <div className="absolute left-1/2 top-1/2 w-[64%] h-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff8ea] shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)] overflow-hidden">
                            <div
                                ref={(el) => {
                                    pupilRefs.current[1] = el;
                                }}
                                className="absolute left-1/2 top-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_38%_30%,#bf7338_0%,#8b4a23_72%,#6a3518_100%)]"
                                style={{ transition: 'transform 0.05s linear' }}
                            >
                                <div className="absolute left-1/2 top-1/2 w-[58%] h-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1f120c]" />
                                <div className="absolute top-[13%] left-[17%] w-[36%] h-[36%] rounded-full bg-white/95" />
                                <div className="absolute bottom-[17%] right-[17%] w-[15%] h-[15%] rounded-full bg-white/75" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mouth overlay */}
                <div className="absolute inset-0 z-[3] pointer-events-none">
                    <div
                        className="absolute"
                        style={{
                            left: MOUTH_WRAPPER.x,
                            top: MOUTH_WRAPPER.y,
                            width: MOUTH_WRAPPER.w,
                            height: MOUTH_WRAPPER.h,
                        }}
                    >
                        <svg
                            className="absolute"
                            viewBox="0 0 140 60"
                            aria-hidden="true"
                            style={{
                                left: '11.1%',
                                top: '13.6%',
                                width: '77.8%',
                                height: '54.5%',
                                overflow: 'visible',
                                opacity: isOpen ? 0 : 1,
                                transform: isOpen ? 'scale(0.8) translateY(-15%)' : 'scale(1) translateY(0)',
                                transition: isOpen
                                    ? 'all 0.2s ease-out'
                                    : 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.15))',
                            }}
                        >
                            <path
                                d="M 16 15 Q 70 55 124 15"
                                fill="none"
                                stroke="#5a2608"
                                strokeWidth="14"
                                strokeLinecap="round"
                            />
                        </svg>

                        <div
                            className="absolute overflow-hidden"
                            style={{
                                inset: 0,
                                backgroundColor: '#8c1e13',
                                borderRadius: '10px 10px 100px 100px',
                                boxShadow: 'inset 0 10px 14px rgba(0,0,0,0.4), 0 6px 10px -3px rgba(0,0,0,0.2)',
                                transformOrigin: 'center',
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? 'scaleY(1) scaleX(1)' : 'scaleY(0.1) scaleX(0.5)',
                                transition: isOpen
                                    ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    : 'all 0.25s ease-out',
                                border: 'none',
                            }}
                        >
                            <div
                                className="absolute left-1/2 -translate-x-1/2"
                                style={{
                                    width: '78%',
                                    height: '72%',
                                    borderRadius: '70px 70px 0 0',
                                    backgroundColor: '#ef4435',
                                    boxShadow: 'inset 0 8px 12px -5px rgba(0,0,0,0.3)',
                                    bottom: isOpen ? '-15%' : '-80%',
                                    transition: isOpen
                                        ? 'bottom 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
                                        : 'bottom 0.2s ease-out',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-black/80 text-white flex items-center justify-center shadow-lg">
                        <X size={16} />
                    </span>
                )}
            </button>

            {/* Chat Window with Iframe */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-4 md:right-6 w-[95vw] md:w-[400px] h-[70vh] md:h-[600px] bg-white rounded-2xl shadow-2xl z-[9999] overflow-hidden border border-gray-100"
                    >
                        <iframe
                            src="https://typebot.io/my-typebot-rz7tx5w"
                            style={{ border: "none", width: "100%", height: "100%" }}
                            title="N-Edu Chatbot"
                        ></iframe>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
