'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MASCOT_IMAGE_SRC = '/opinion3.png';

const EYE_SLOTS = [
    { x: '31.2%', y: '38%' },
    { x: '50.5%', y: '38%' },
] as const;
const EYE_WIDTH = '18.5%';
const EYE_HEIGHT = '18.5%';
const SCLERA_SCALE = 0.44;
const PUPIL_SCALE = 0.8;
const MAX_PUPIL_TRAVEL_RATIO = 0.36;
const MOUTH_WRAPPER = { x: '40.6%', y: '54.8%', w: '18.7%', h: '7%' };

const Z_LAYERS = {
    base: 'z-[1]',
    eyes: 'z-[2]',
    frame: 'z-[3]',
    mouth: 'z-[4]',
    closeBadge: 'z-[5]',
} as const;

export default function Typebot() {
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [showHintBubble, setShowHintBubble] = useState(false);
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

                const scleraEl = eye.firstElementChild as HTMLElement | null;
                const scleraRadius = scleraEl ? scleraEl.clientWidth / 2 : eye.clientWidth * 0.28;
                const maxRadius = scleraRadius * MAX_PUPIL_TRAVEL_RATIO;
                const distanceToPointer = Math.hypot(dx, dy);
                const pupilDistance = Math.min(distanceToPointer * 0.15, maxRadius);

                const pupilX = Math.cos(angle) * pupilDistance;
                const pupilY = Math.sin(angle) * pupilDistance;

                pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
            });
        };

        const handlePointerMove = (event: PointerEvent) => {
            updatePupils(event.clientX, event.clientY);
        };

        const handlePointerLeave = () => {
            resetPupils();
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        document.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerleave', handlePointerLeave);
        };
    }, []);

    useEffect(() => {
        const showBubble = () => {
            setShowHintBubble(true);
            window.setTimeout(() => {
                setShowHintBubble(false);
            }, 3000);
        };

        const intervalId = window.setInterval(() => {
            if (!isOpen) {
                showBubble();
            }
        }, 7000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [isOpen]);

    return (
        <>
            <AnimatePresence>
                {showHintBubble && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.24, ease: 'easeOut' }}
                        className="fixed bottom-[2.1rem] right-[6.9rem] md:bottom-[2.5rem] md:right-[8.4rem] w-[10.5rem] md:w-[11rem] rounded-[18px] bg-white/95 px-3 py-3.5 text-[12px] md:text-[13px] font-bold leading-snug text-[#3b2a1a] shadow-[0_8px_32px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.28)] border border-[#f1e2cb] z-[10001] pointer-events-none whitespace-normal [text-shadow:0_1px_2px_rgba(0,0,0,0.15)]"
                        role="status"
                        aria-live="polite"
                    >
                        Hãy hỏi mình nếu như bạn cần hỗ trợ nhé!
                        <span className="absolute right-[-0.45rem] top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-white/95 border-t border-r border-[#f1e2cb]" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-0 right-0 md:bottom-0 md:right-0 translate-x-[12%] translate-y-[8%] w-[7rem] h-[8rem] md:w-[10rem] md:h-[10rem] bg-transparent hover:scale-105 active:scale-95 transition-transform z-[9999] flex items-center justify-center overflow-visible"
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {/* Layer 1: Mascot image */}
                {!imageError ? (
                    <img
                        src={MASCOT_IMAGE_SRC}
                        alt="Chat mascot"
                        className={`absolute inset-0 ${Z_LAYERS.base} w-full h-full object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.14)]`}
                        style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%' }}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <span className={`absolute inset-0 ${Z_LAYERS.base} w-full h-full bg-[#FDB913] text-white flex items-center justify-center`}>
                        <MessageCircle size={28} />
                    </span>
                )}

                {/* Layer 2: Animated eyes */}
                <div className={`absolute inset-0 ${Z_LAYERS.eyes} pointer-events-none`}>
                    {EYE_SLOTS.map((eye, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                eyeRefs.current[index] = el;
                            }}
                            className="absolute rounded-full bg-transparent"
                            style={{
                                left: eye.x,
                                top: eye.y,
                                width: EYE_WIDTH,
                                height: EYE_HEIGHT,
                            }}
                        >
                            <div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff8ea] shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)] overflow-hidden"
                                style={{
                                    width: `${SCLERA_SCALE * 100}%`,
                                    height: `${SCLERA_SCALE * 100}%`,
                                }}
                            >
                                <div
                                    ref={(el) => {
                                        pupilRefs.current[index] = el;
                                    }}
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_38%_30%,#bf7338_0%,#8b4a23_72%,#6a3518_100%)]"
                                    style={{
                                        width: `${PUPIL_SCALE * 100}%`,
                                        height: `${PUPIL_SCALE * 100}%`,
                                        transition: 'transform 0.08s ease-out',
                                        willChange: 'transform',
                                    }}
                                >
                                    <div className="absolute left-1/2 top-1/2 w-[58%] h-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1f120c]" />
                                    <div className="absolute top-[13%] left-[17%] w-[36%] h-[36%] rounded-full bg-white/95" />
                                    <div className="absolute bottom-[17%] right-[17%] w-[15%] h-[15%] rounded-full bg-white/75" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Layer 3: Glasses/frame overlay (exported transparent PNG of frame only) */}

                {/* Mouth overlay */}
                <div className={`absolute inset-0 ${Z_LAYERS.mouth} pointer-events-none`}>
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
                                transform: isOpen ? 'scaleY(0.82) scaleX(0.86)' : 'scaleY(0.1) scaleX(0.5)',
                                transition: isOpen
                                    ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    : 'all 0.25s ease-out',
                                border: 'none',
                            }}
                        >
                            <div
                                className="absolute left-1/2 -translate-x-1/2"
                                style={{
                                    width: isOpen ? '68%' : '78%',
                                    height: isOpen ? '64%' : '72%',
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
                    <span className={`absolute -top-1 -right-1 w-7 h-7 rounded-full bg-black/80 text-white flex items-center justify-center shadow-lg ${Z_LAYERS.closeBadge}`}>
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
                        className="fixed bottom-[6.75rem] right-[4.25rem] md:bottom-24 md:right-[7.5rem] w-[80vw] max-w-[300px] md:w-[360px] h-[56vh] max-h-[460px] md:h-[560px] bg-white rounded-2xl shadow-2xl z-[9998] overflow-hidden border border-gray-100"
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
