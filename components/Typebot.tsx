'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MASCOT_IMAGE_SRC = '/picture/maskcode.svg';

const Z_LAYERS = {
    base: 'z-[1]',
    closeBadge: 'z-[5]',
} as const;

export default function Typebot() {
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [showHintBubble, setShowHintBubble] = useState(false);

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
