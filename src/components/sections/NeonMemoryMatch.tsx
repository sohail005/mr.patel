"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARDS = ["🚀", "💻", "🛸", "👾", "🌌", "💎", "🔮", "⚡"];

type Card = {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
};

export default function NeonMemoryMatch() {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matches, setMatches] = useState(0);
    const [moves, setMoves] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    const initializeGame = () => {
        const shuffled = [...CARDS, ...CARDS]
            .sort(() => Math.random() - 0.5)
            .map((value, index) => ({
                id: index,
                value,
                isFlipped: false,
                isMatched: false,
            }));
        setCards(shuffled);
        setFlippedIndices([]);
        setMatches(0);
        setMoves(0);
        setIsChecking(false);
        setGameWon(false);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    const handleCardClick = (index: number) => {
        if (
            isChecking ||
            cards[index].isFlipped ||
            cards[index].isMatched ||
            flippedIndices.length === 2
        ) {
            return;
        }

        const newFlippedIndices = [...flippedIndices, index];
        setFlippedIndices(newFlippedIndices);

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        if (newFlippedIndices.length === 2) {
            setIsChecking(true);
            setMoves((m) => m + 1);

            const [firstIndex, secondIndex] = newFlippedIndices;
            if (newCards[firstIndex].value === newCards[secondIndex].value) {
                // Match found
                setTimeout(() => {
                    const matchedCards = [...newCards];
                    matchedCards[firstIndex].isMatched = true;
                    matchedCards[secondIndex].isMatched = true;
                    setCards(matchedCards);
                    setFlippedIndices([]);
                    setMatches((m) => {
                        const newMatches = m + 1;
                        if (newMatches === CARDS.length) {
                            setGameWon(true);
                        }
                        return newMatches;
                    });
                    setIsChecking(false);
                }, 500);
            } else {
                // No match
                setTimeout(() => {
                    const resetCards = [...newCards];
                    resetCards[firstIndex].isFlipped = false;
                    resetCards[secondIndex].isFlipped = false;
                    setCards(resetCards);
                    setFlippedIndices([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    };

    return (
        <section className="relative w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-primary)] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-10 z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <p className="text-[var(--color-primary)] font-mono text-sm tracking-widest uppercase mb-2">
                        System Test
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold font-outfit text-white">
                        Memory <span className="gradient-text">Match</span>
                    </h2>
                </div>

                <div className="flex gap-6 font-mono text-sm bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                    <div>
                        <span className="text-[var(--color-text-muted)]">Moves:</span>{" "}
                        <span className="text-white font-bold">{moves}</span>
                    </div>
                    <div>
                        <span className="text-[var(--color-text-muted)]">Matches:</span>{" "}
                        <span className="text-[var(--color-accent)] font-bold">{matches}/{CARDS.length}</span>
                    </div>
                </div>
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 z-10 w-full max-w-2xl perspective-1000">
                {cards.map((card, idx) => (
                    <motion.div
                        key={card.id}
                        className="relative aspect-square cursor-pointer transform-style-3d"
                        onClick={() => handleCardClick(idx)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <motion.div
                            className="w-full h-full relative preserve-3d"
                            animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                        >
                            {/* Front of card (Back side visibly) - UNFLIPPED */}
                            <div className={`absolute w-full h-full backface-hidden rounded-xl border flex items-center justify-center
                                ${card.isFlipped ? "opacity-0" : "opacity-100"}
                                bg-white/5 border-white/10 glass-panel hover:bg-white/10 transition-colors duration-300
                            `}>
                                <div className="w-12 h-12 rounded-full border border-white/5 bg-[var(--color-primary)]/10 flex items-center flex-col justify-center opacity-50">
                                    <div className="w-6 h-6 rounded-full border border-[var(--color-primary)]/30 border-t-transparent animate-spin" />
                                </div>
                            </div>

                            {/* Back of card (Front side visibly) - FLIPPED */}
                            <div className={`absolute w-full h-full backface-hidden rounded-xl border flex items-center justify-center rotate-y-180
                                ${card.isMatched ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-[0_0_20px_rgba(0,212,255,0.2)]" : "border-[var(--color-primary)] bg-[var(--color-primary)]/10"}
                            `}>
                                <span className="text-3xl sm:text-4xl md:text-5xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                    {card.value}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Win State Overlay */}
            <AnimatePresence>
                {gameWon && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm rounded-3xl"
                    >
                        <div className="bg-[#0f1115]/90 border border-[var(--color-accent)]/30 p-10 rounded-3xl shadow-[0_0_50px_rgba(0,212,255,0.2)] text-center max-w-md w-full glass-panel">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                                className="text-6xl mb-6"
                            >
                                🏆
                            </motion.div>
                            <h3 className="text-3xl font-bold text-white mb-2 font-outfit">
                                System <span className="text-[var(--color-accent)]">Restored</span>
                            </h3>
                            <p className="text-[var(--color-text-muted)] mb-8">
                                You matched all sequences in {moves} moves.
                            </p>
                            <button
                                onClick={initializeGame}
                                className="px-8 py-4 rounded-full bg-[var(--color-primary)] text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all duration-300 hover:-translate-y-1"
                            >
                                PLAY AGAIN
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
