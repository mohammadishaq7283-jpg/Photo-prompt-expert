'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Image as ImageIcon, Loader2, Download, MessageSquare, Plus, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { role: 'user' | 'assistant'; content: string; image?: string; generatedImage?: string; };
type Session = { id: string; title: string; messages: Message[] };

export default function ChatInterface({ locale }: { locale: string }) {
  const t = useTranslations('Common');
  
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem('pixel_sessions');
    if (saved) setSessions(JSON.parse(saved));
    const savedTheme = localStorage.getItem('pixel_theme');
    if (savedTheme === 'light') { setIsDark(false); document.documentElement.setAttribute('data-theme', 'light'); }
    startNewChat();
  }, []);

  // Save Data
  useEffect(() => {
    localStorage.setItem('pixel_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('pixel_theme', newTheme ? 'dark' : 'light');
  };

  const startNewChat = () => {
    const id = Date.now().toString();
    const newSession = { id, title: t('newChat'), messages: [] };
    setSessions(prev => [newSession, ...prev]);
    setCurrentId(id);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const currentMessages = sessions.find(s => s.id === currentId)?.messages || [];

  const handleSend = async () => {
    if ((!input && !image) || loading || !currentId) return;

    const userMsg: Message = { role: 'user', content: input, image: image || undefined };
    
    // Update UI immediately
    setSessions(prev => prev.map(s => s.id === currentId ? { ...s, messages: [...s.messages, userMsg] } : s));
    setInput(''); setImage(null); setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: [...currentMessages, userMsg], image: userMsg.image, locale })
      });
      const data = await res.json();
      
      const aiMsg: Message = { role: 'assistant', content: data.reply, generatedImage: data.generatedImageUrl };
      
      setSessions(prev => prev.map(s => s.id === currentId ? { ...s, messages: [...s.messages, aiMsg] } : s));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="w-72 bg-theme-card border-r border-theme-border flex flex-col z-20 absolute md:relative h-full">
            <div className="p-4 border-b border-theme-border flex justify-between">
              <span className="font-bold text-theme-primary">HISTORY</span>
              <button onClick={() => setSidebarOpen(false)} className="md:hidden"><X /></button>
            </div>
            <div className="p-4">
              <button onClick={startNewChat} className="w-full flex items-center gap-2 p-3 rounded-lg border border-dashed border-theme-primary text-theme-text hover:bg-white/5">
                <Plus className="w-4 h-4" /> {t('newChat')}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {sessions.map(s => (
                <button key={s.id} onClick={() => setCurrentId(s.id)} className={`w-full text-left p-3 rounded-lg text-sm truncate flex items-center gap-2 ${currentId === s.id ? 'bg-theme-primary/20 text-theme-primary' : 'text-theme-text hover:bg-white/5'}`}>
                  <MessageSquare className="w-4 h-4" /> {s.messages[0]?.content || s.title}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-theme-border">
              <button onClick={toggleTheme} className="flex items-center gap-2 text-theme-text w-full p-2 hover:bg-white/5 rounded">
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} {t('theme')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col h-full bg-theme-bg relative">
        <div className="h-16 border-b border-theme-border flex items-center px-4 justify-between bg-theme-bg/90 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            {!sidebarOpen && <button onClick={() => setSidebarOpen(true)}><Menu className="text-theme-text" /></button>}
            <span className="font-bold text-xl text-theme-primary">{t('title')}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {currentMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[80%] space-y-2">
                {msg.image && <img src={msg.image} className="w-48 rounded-lg border border-theme-border" />}
                {msg.content && <div className={`p-3 rounded-xl ${msg.role === 'user' ? 'bg-theme-primary text-black' : 'bg-theme-card text-theme-text border border-theme-border'}`}>{msg.content}</div>}
                {msg.generatedImage && (
                  <div className="relative group">
                    <img src={msg.generatedImage} className="w-full rounded-lg shadow-lg" />
                    <a href={msg.generatedImage} download target="_blank" className="absolute bottom-2 right-2 bg-black/70 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition"><Download className="w-4 h-4" /></a>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && <div className="flex justify-start"><Loader2 className="w-6 h-6 animate-spin text-theme-primary" /></div>}
          <div ref={scrollRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-theme-card border-t border-theme-border">
          {image && <div className="mb-2 relative w-fit"><img src={image} className="h-12 rounded border border-theme-primary" /><button onClick={() => setImage(null)} className="absolute -top-2 -right-2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white">×</button></div>}
          <div className="flex gap-2 items-center">
            <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
            <button onClick={() => fileRef.current?.click()} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-theme-text"><ImageIcon className="w-5 h-5" /></button>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={t('placeholderInput')} className="flex-1 bg-theme-bg border border-theme-border rounded-lg p-3 text-theme-text focus:border-theme-primary outline-none" />
            <button onClick={handleSend} disabled={loading} className="p-3 bg-theme-primary rounded-lg text-black hover:opacity-90"><Send className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
