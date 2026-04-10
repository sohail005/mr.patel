"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchInstagramReel } from "@/app/actions/instaDownloader";

export default function InstagramDownloader() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await fetchInstagramReel(url);
            setResult(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch video. Please check the URL and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative py-24 px-6 overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">
            {/* Background Accents */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-secondary)] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-3xl w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text tracking-tight leading-tight">
                        Insta Reel <br />
                        <span className="text-white">Downloader</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto leading-relaxed">
                        Download Instagram Reels in high quality instantly. No login, no watermarks, just pure video.
                    </p>
                </motion.div>

                <motion.form 
                    onSubmit={handleDownload}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative group p-2 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] backdrop-blur-3xl shadow-2xl flex flex-col md:flex-row gap-2"
                >
                    <input
                        type="text"
                        placeholder="Paste Instagram Reel link here..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-1 bg-transparent px-6 py-4 text-white focus:outline-none placeholder:text-white/20 text-lg"
                    />
                    <motion.button
                        disabled={loading || !url}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold text-lg shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Fetching...</span>
                            </div>
                        ) : "Download"}
                    </motion.button>
                </motion.form>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.08] backdrop-blur-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="relative w-48 h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                                    <img 
                                        src={result.thumbnailUrl} 
                                        alt="Thumbnail" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]" />
                                        <span className="font-semibold text-white/90">@{result.username}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">
                                        {result.title}
                                    </h3>
                                    
                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
                                        <a
                                            href={result.videoUrl}
                                            download={`insta_reel_${Date.now()}.mp4`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-colors shadow-lg"
                                        >
                                            Save Video
                                        </a>
                                        <button
                                            onClick={() => {
                                                setUrl("");
                                                setResult(null);
                                            }}
                                            className="px-8 py-3 rounded-full bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 transition-colors font-medium"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Info Text */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    {[
                        { title: "Fast", desc: "Ultra-fast extraction from public links." },
                        { title: "Secure", desc: "No login or account access required." },
                        { title: "HD Quality", desc: "Downloads in original MP4 resolution." }
                    ].map((item, i) => (
                        <div key={i} className="text-center group">
                            <h4 className="text-white font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors">{item.title}</h4>
                            <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
