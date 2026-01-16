'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, X, Send, Bot, Loader2, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

type ActivityStatus = 'idle' | 'thinking' | 'speaking' | 'navigating';

export default function ChatBox() {
    const router = useRouter();
    const { language, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; content: string }>>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activityStatus, setActivityStatus] = useState<ActivityStatus>('idle');

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, activityStatus]);

    const handleSend = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMessage = { id: Date.now().toString(), role: 'user' as const, content: text };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setActivityStatus('thinking');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messages
                        .concat(userMessage)
                        .filter(m => m.content && m.content.trim() !== '')
                        .map(m => ({ role: m.role, content: m.content })),
                    language: language // Pass current language to backend
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantContent = '';

            // Create placeholder for assistant message
            const assistantId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

            setActivityStatus('speaking');

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    assistantContent += chunk;

                    // Check for navigation command
                    const navMatch = assistantContent.match(/\[NAVIGATE: (.*?)\]/);
                    if (navMatch) {
                        const path = navMatch[1];
                        setActivityStatus('navigating');
                        // Remove the command from displayed text
                        const cleanContent = assistantContent.replace(/\[NAVIGATE:.*?\]/g, '');

                        setMessages(prev => prev.map(m =>
                            m.id === assistantId
                                ? { ...m, content: cleanContent }
                                : m
                        ));

                        // Short delay for visual effect then navigate
                        setTimeout(() => {
                            router.push(path);
                            setActivityStatus('idle'); // Reset after nav
                        }, 1500);
                    } else {
                        // Update UI with stream normal text
                        setMessages(prev => prev.map(m =>
                            m.id === assistantId
                                ? { ...m, content: assistantContent.replace(/\[NAVIGATE:.*?\]/g, '') }
                                : m
                        ));
                    }
                }
            }

        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg = language === 'vi'
                ? 'Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.'
                : 'Sorry, I am having connection issues. Please try again later.';
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: errorMsg }]);
        } finally {
            setIsLoading(false);
            if (activityStatus !== 'navigating') {
                setActivityStatus('idle');
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend(input);
    };

    // Helper to get status text based on language
    const getStatusText = (status: ActivityStatus) => {
        if (language === 'vi') {
            switch (status) {
                case 'thinking': return 'Đang suy nghĩ...';
                case 'speaking': return 'Đang trả lời...';
                case 'navigating': return 'Đang điều hướng...';
                default: return '';
            }
        } else {
            switch (status) {
                case 'thinking': return 'Thinking...';
                case 'speaking': return 'Typing...';
                case 'navigating': return 'Navigating...';
                default: return '';
            }
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 p-4 bg-[#F7B418] text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-[9999] flex items-center justify-center animate-pulse-slow"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-4 right-4 md:right-6 w-[95vw] md:w-[450px] h-[80vh] md:h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-[9999] overflow-hidden border border-gray-100 font-sans"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-[#F7B418] to-yellow-600 text-white flex items-center justify-between shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight text-white m-0">
                                        {language === 'vi' ? 'Trợ Lý N-EDU' : 'N-EDU Assistant'}
                                    </h3>
                                    <p className="text-xs text-yellow-50 m-0 opacity-90">
                                        {language === 'vi' ? 'Luôn sẵn sàng hỗ trợ bạn' : 'Always here to help'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scroll-smooth"
                        >
                            {messages.length === 0 && (
                                <div className="text-center py-10 px-4 flex flex-col items-center justify-center h-full">
                                    <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                        <Bot size={40} />
                                    </div>
                                    <p className="text-gray-600 font-medium text-lg mb-6">
                                        {language === 'vi'
                                            ? 'Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?'
                                            : 'Hello! How can I assist you today?'}
                                    </p>
                                    <div className="flex flex-wrap gap-2 justify-center w-full max-w-xs">
                                        {(language === 'vi'
                                            ? ['Khoá học 30 ngày', 'Thông tin N-EDU', 'Đăng ký tư vấn']
                                            : ['30 Day Challenge', 'About N-EDU', 'Register for advice']
                                        ).map(q => (
                                            <button
                                                key={q}
                                                onClick={() => handleSend(q)}
                                                className="text-sm bg-white border border-yellow-200 text-yellow-700 px-4 py-2 rounded-xl hover:bg-yellow-50 hover:shadow-sm transition-all"
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {messages.map((message) => {
                                // Parse suggestions from assistant messages
                                let displayContent = message.content;
                                let suggestions: string[] = [];

                                if (message.role === 'assistant') {
                                    const suggestMatch = message.content.match(/\[SUGGESTIONS:\s*(.*?)\]/);
                                    if (suggestMatch) {
                                        suggestions = suggestMatch[1].split('|').map(s => s.trim()).filter(s => s);
                                        displayContent = message.content.replace(/\[SUGGESTIONS:.*?\]/g, '').trim();
                                    }
                                }

                                return (
                                    <div key={message.id} className="space-y-2">
                                        <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div
                                                className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${message.role === 'user'
                                                    ? 'bg-[#F7B418] text-white rounded-tr-none'
                                                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                                    }`}
                                            >
                                                <div className="whitespace-pre-wrap">{displayContent}</div>
                                            </div>
                                        </div>

                                        {/* Suggestion Chips */}
                                        {suggestions.length > 0 && message.role === 'assistant' && !isLoading && (
                                            <div className="flex flex-wrap gap-2 pl-2">
                                                {suggestions.map((suggestion, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleSend(suggestion)}
                                                        className="text-xs bg-white border border-yellow-200 text-yellow-700 px-3 py-1.5 rounded-full hover:bg-yellow-50 hover:border-yellow-300 transition-all shadow-sm"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Activity Status Indicator */}
                            {activityStatus !== 'idle' && (
                                <div className="flex justify-start w-full">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/80 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm animate-pulse">
                                        {activityStatus === 'thinking' && <Loader2 size={14} className="animate-spin" />}
                                        {activityStatus === 'navigating' && <Compass size={14} className="animate-spin" />}
                                        {activityStatus === 'speaking' && <Bot size={14} />}
                                        <span>{getStatusText(activityStatus)}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                            <input
                                value={input || ''}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={language === 'vi' ? "Nhập câu hỏi của bạn..." : "Type your question..."}
                                className="flex-1 bg-gray-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[#F7B418] transition-all outline-none"
                            />
                            <button
                                type="submit"
                                disabled={!input?.trim() || isLoading}
                                className="bg-[#F7B418] text-white p-3 rounded-2xl hover:bg-yellow-600 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-md active:scale-95 flex items-center justify-center"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
