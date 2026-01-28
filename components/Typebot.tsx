'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Typebot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 p-4 bg-[#FDB913] text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-[9999] flex items-center justify-center"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
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
