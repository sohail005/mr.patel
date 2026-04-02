"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowerData } from "./Flowers";
import FallingRoses from "@/components/effects/FallingRoses";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
    () => import("@/components/three/HeroScene"),
    { ssr: false }
);

const F_MAP = ["orchid", "tulip", "dahlia", "anemone", "carnation", "zinnia", "sunflower", "daisy", "rose"];

type Step = "picker" | "arranger" | "message" | "final";

interface SelectedFlower {
    id: string;
    typeId: string;
}

export default function InteractiveBuilder() {
    const [step, setStep] = useState<Step>("picker");
    const [selected, setSelected] = useState<SelectedFlower[]>([]);
    const [seed, setSeed] = useState(0);
    const [greenery, setGreenery] = useState(0);
    const [message, setMessage] = useState({ to: "", from: "", body: "" });
    const [isShared, setIsShared] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash.startsWith('#bouquet=')) {
            try {
                const hashParams = window.location.hash.slice(9);
                const base64Str = decodeURIComponent(hashParams);
                
                let data;
                try {
                    data = JSON.parse(decodeURIComponent(escape(atob(base64Str))));
                } catch (e) {
                    data = JSON.parse(decodeURIComponent(atob(base64Str)));
                }
                
                if (Array.isArray(data)) {
                    if (typeof data[0] === 'string') {
                        const [typesStr, sStr, g, msgTo, msgFrom, msgBody] = data;
                        if (typesStr) {
                            const types = typesStr.split('').map((c: string) => F_MAP[parseInt(c, 36)]).filter(Boolean);
                            setSelected(types.map((t: string, i: number) => ({ id: `${t}-${Date.now()}-${i}`, typeId: t })));
                        }
                        if (sStr) setSeed(parseInt(sStr, 36) / 100000);
                        if (g !== undefined) setGreenery(g);
                        setMessage({ to: msgTo || "", from: msgFrom || "", body: msgBody || "" });
                    } else {
                        const [types, s, g, msg] = data;
                        if (types) {
                            setSelected(types.map((t: string, i: number) => ({ id: `${t}-${Date.now()}-${i}`, typeId: t })));
                        }
                        if (s !== undefined) setSeed(s);
                        if (g !== undefined) setGreenery(g);
                        if (msg) {
                            setMessage({ to: msg[0] || "", from: msg[1] || "", body: msg[2] || "" });
                        }
                    }
                } else {
                    if (data.selected) setSelected(data.selected);
                    if (data.seed !== undefined) setSeed(data.seed);
                    if (data.greenery !== undefined) setGreenery(data.greenery);
                    if (data.message) setMessage(data.message);
                }
                
                setIsShared(true);
                setStep("final");
            } catch (error) {
                console.error("Failed to parse bouquet from URL", error);
            }
        }
    }, []);

    const addFlower = (typeId: string) => {
        if (selected.length < 10) {
            setSelected([...selected, { id: `${typeId}-${Date.now()}`, typeId }]);
        }
    };

    const removeFlower = (typeId: string) => {
        const lastIndex = selected.map(f => f.typeId).lastIndexOf(typeId);
        if (lastIndex !== -1) {
            const newSelected = [...selected];
            newSelected.splice(lastIndex, 1);
            setSelected(newSelected);
        }
    };

    return (
        <section className="relative w-full min-h-screen text-white overflow-hidden font-sans py-8 z-20">
            {/* Particle background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <HeroScene />
            </div>

            {/* Radial gradient glow */}
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
                <div className="w-[700px] h-[500px] rounded-full bg-[var(--color-primary)] opacity-[0.07] blur-[120px]" />
            </div>
            
            <div className="max-w-6xl mx-auto px-6 h-full flex flex-col items-center relative z-10">
                <motion.div layoutId="header" className="text-center mb-4" onClick={() => {if(step!=='picker') setStep('picker')}}>
                    <h2 className="text-4xl md:text-5xl font-serif tracking-tight gradient-text cursor-pointer inline-block">Digibouquet</h2>
                </motion.div>

                <div className="w-full flex-1 relative flex flex-col items-center justify-center min-h-[60vh]">
                    <AnimatePresence mode="wait">
                        {step === "picker" && (
                            <PickerView 
                                key="picker" 
                                selected={selected} 
                                addFlower={addFlower} 
                                removeFlower={removeFlower}
                                onNext={() => { setSeed(Math.random()); setStep("arranger"); }}
                            />
                        )}
                        {step === "arranger" && (
                            <ArrangerView 
                                key="arranger" 
                                selected={selected} 
                                seed={seed}
                                greenery={greenery}
                                onShuffle={() => setSeed(Math.random())}
                                onChangeGreenery={() => setGreenery((g) => (g + 1) % 3)}
                                onBack={() => setStep("picker")}
                                onNext={() => setStep("message")}
                            />
                        )}
                        {step === "message" && (
                            <MessageView 
                                key="message"
                                message={message}
                                setMessage={setMessage}
                                onBack={() => setStep("arranger")}
                                onNext={() => setStep("final")}
                            />
                        )}
                        {step === "final" && (
                            <FinalView 
                                key="final"
                                selected={selected}
                                seed={seed}
                                greenery={greenery}
                                message={message}
                                isShared={isShared}
                                onReset={() => {
                                    setSelected([]);
                                    setMessage({ to: "", from: "", body: "" });
                                    setIsShared(false);
                                    setStep("picker");
                                    window.history.replaceState(null, '', window.location.pathname);
                                    window.dispatchEvent(new Event('hashchange'));
                                }}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

// -------------------------------------------------------------
// CHILD VIEWS
// -------------------------------------------------------------



function PickerView({ selected, addFlower, removeFlower, onNext }: any) {
    const total = selected.length;
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center pb-20 mt-4"
        >
            <p className="uppercase tracking-widest font-mono text-sm mb-2 font-bold text-white">Pick 4 to 10 blooms</p>
            <p className="text-sm text-gray-400 mb-12">Click to select, click badge to remove.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-8 mb-16">
                {FlowerData.map((flower) => {
                    const count = selected.filter((s: any) => s.typeId === flower.id).length;
                    return (
                        <div key={flower.id} className="flex flex-col items-center group cursor-pointer" onClick={() => addFlower(flower.id)}>
                            <div className="relative w-28 h-28 mb-4 transition-transform group-hover:-translate-y-2 group-hover:drop-shadow-sm duration-300">
                                <flower.Component className="w-full h-full drop-shadow-sm" />
                                <AnimatePresence>
                                    {count > 0 && (
                                        <motion.div 
                                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                            className="absolute top-0 right-0 w-7 h-7 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold border-2 border-[#050816] z-10 hover:scale-110 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-lg"
                                            onClick={(e) => { e.stopPropagation(); removeFlower(flower.id); }}
                                        >
                                            {count}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <span className="text-xs font-mono uppercase tracking-wider text-gray-300">{flower.name}</span>
                        </div>
                    );
                })}
            </div>

            {/* Selected Pills */}
            <div className="flex flex-wrap gap-2 justify-center mb-12 max-w-2xl px-4 min-h-[36px]">
                {FlowerData.filter(f => selected.some((s:any) => s.typeId === f.id)).map(f => (
                    <motion.div layout key={f.id} className="px-4 py-1.5 border border-white/20 rounded-full text-xs font-mono uppercase bg-white/5 text-white font-medium shadow-[0_0_10px_rgba(108,99,255,0.2)]">
                        {f.name} x{selected.filter((s:any) => s.typeId === f.id).length}
                    </motion.div>
                ))}
            </div>

            <button 
                onClick={onNext}
                disabled={total < 4 || total > 10}
                className="px-16 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] border border-white/10 text-white uppercase tracking-widest font-bold disabled:opacity-20 disabled:cursor-not-allowed hover:scale-105 transition-all rounded-full"
            >
                Next
            </button>
            
            <p className="mt-4 text-xs font-mono text-gray-400 uppercase tracking-widest">{total} / 10 Selected</p>
        </motion.div>
    );
}

function pseudoRandom(seed: number) {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// -------------------------------------------------------------
// NEW REALISTIC & STRUCTURED GREENERY COMPONENTS
// -------------------------------------------------------------

const baseLeafClasses = "object-contain pointer-events-none drop-shadow-none";

const leafStyle = {
    filter: "brightness(0.8) contrast(1.5) saturate(1.2)"
};

function Eucalyptus({ className }: any) {
    return <img src="/flowers/eucalyptus.png" className={`${baseLeafClasses} ${className}`} style={leafStyle} alt="Eucalyptus" />;
}

function DarkFern({ className }: any) {
    return <img src="/flowers/fern.png" className={`${baseLeafClasses} ${className}`} style={leafStyle} alt="Fern" />;
}

function WispyGrass({ className, color }: any) {
    return <img src="/flowers/wispy.png" className={`${baseLeafClasses} ${className}`} style={leafStyle} alt="Wispy Grass" />;
}

function WatercolorSplotch({ color }: { color: string }) {
    return (
        <div className="absolute inset-0 rounded-full blur-[24px] opacity-40 mix-blend-screen scale-150" style={{ backgroundColor: color }} />
    );
}

// -------------------------------------------------------------
// ARRANGEMENT ALGORITHM
// -------------------------------------------------------------

function generateBouquetItems(selected: any[], seed: number, greeneryType: number) {
    const items: any[] = [];
    
    // Categorize flowers by role
    const anchorIds = ["anemone", "dahlia", "tulip"]; 
    const massIds = ["sunflower", "carnation", "rose"]; 
    const fillerIds = ["daisy", "zinnia", "orchid"];

    // Realistic Greenery Backbone
    const gType = greeneryType % 3;
    const showEuc = gType === 0 || gType === 1;
    const showFern = gType === 0 || gType === 2;
    const showWispy = gType === 1 || gType === 2;

    if (showEuc) {
        // Long sweeping branches reaching high and wide
        const eucPositions = [
            { rx: -90, ry: -80, rot: -45, scale: 1.6 },
            { rx: 90, ry: -60, rot: 40, scale: 1.5 },
            { rx: -110, ry: 10, rot: -75, scale: 1.4 },
            { rx: 110, ry: 30, rot: 75, scale: 1.4 }
        ];
        eucPositions.forEach((pos, i) => {
            items.push({
                id: `euc-${i}`, isLeaf: true, Component: Eucalyptus,
                x: pos.rx + (pseudoRandom(seed + i) - 0.5) * 20,
                y: pos.ry + (pseudoRandom(seed + 10 + i) - 0.5) * 20,
                rotate: pos.rot + (pseudoRandom(seed + 20 + i) - 0.5) * 20, 
                scale: pos.scale + pseudoRandom(seed + 30 + i) * 0.2,
                zIndex: 10 + i
            });
        });
    }

    if (showFern) {
        // Dense skirt bundled at the bottom
        const fernPositions = [
            { rx: -50, ry: 60, rot: -130, scale: 1.5 },
            { rx: -25, ry: 80, rot: -160, scale: 1.3 },
            { rx: 25, ry: 80, rot: 160, scale: 1.3 },
            { rx: 50, ry: 60, rot: 130, scale: 1.5 },
            { rx: 0, ry: 90, rot: 180, scale: 1.2 }
        ];
        fernPositions.forEach((pos, i) => {
            items.push({
                id: `fern-${i}`, isLeaf: true, Component: DarkFern,
                x: pos.rx + (pseudoRandom(seed + 40 + i) - 0.5) * 15,
                y: pos.ry + (pseudoRandom(seed + 50 + i) - 0.5) * 15,
                rotate: pos.rot + (pseudoRandom(seed + 60 + i) - 0.5) * 20, 
                scale: pos.scale + pseudoRandom(seed + 70 + i) * 0.2,
                zIndex: 15 + i
            });
        });
    }

    if (showWispy) {
        // Feathery accents radiating from the sides and top
        const wispyPositions = [
            { rx: -70, ry: -30, rot: -60, scale: 1.6 },
            { rx: 70, ry: -20, rot: 60, scale: 1.6 },
            { rx: -80, ry: 40, rot: -110, scale: 1.5 },
            { rx: 80, ry: 50, rot: 110, scale: 1.5 },
            { rx: 0, ry: -90, rot: 0, scale: 1.5 }
        ];
        wispyPositions.forEach((pos, i) => {
            items.push({
                id: `wispy-${i}`, isLeaf: true, Component: WispyGrass,
                x: pos.rx + (pseudoRandom(seed + 80 + i) - 0.5) * 20,
                y: pos.ry + (pseudoRandom(seed + 90 + i) - 0.5) * 20,
                rotate: pos.rot + (pseudoRandom(seed + 100 + i) - 0.5) * 20,
                scale: pos.scale + pseudoRandom(seed + 110 + i) * 0.2,
                zIndex: 20 + i 
            });
        });
    }

    // Flowers Processing
    const bouquetFlowers = [...selected].map((s) => {
        let role = "mass";
        if (anchorIds.includes(s.typeId)) role = "anchor";
        if (fillerIds.includes(s.typeId)) role = "filler";
        return { ...s, role };
    });

    const roleScore: Record<string, number> = { filler: 0, mass: 1, anchor: 2 };
    
    const N = bouquetFlowers.length;
    const slots: {x: number, y: number}[] = [];
    
    // Create exactly matched tall vertical zig-zag column structure
    for (let j = 0; j < N; j++) {
        const fraction = N > 1 ? j / (N - 1) : 0.5; // 0 (top/back) to 1 (bottom/front)
        
        // Tall Y distribution: top flowers are high (-75), bottom flowers are low (65)
        const yBase = -75 + fraction * 140; 
        
        // Alternating sides
        const isLeft = j % 2 === 0;
        
        // Triangle/Funnel width: significantly wider spread at top, tighter at bottom
        const width = 85 - fraction * 40; 
        const xSign = isLeft ? -1 : 1;
        const xBase = xSign * (width / 2);
        
        // Organic scatter
        const jitterX = (pseudoRandom(seed + 100 + j) - 0.5) * 25;
        const jitterY = (pseudoRandom(seed + 200 + j) - 0.5) * 25;
        
        slots.push({ x: xBase + jitterX, y: yBase + jitterY });
    }

    // Sort slots by Y ascending (lowest Y is visually top). 
    slots.sort((a, b) => a.y - b.y);

    // Sort flowers so fillers are first (top slots) and anchors are last (bottom slots)
    bouquetFlowers.sort((a, b) => {
        const scoreA = roleScore[a.role] + pseudoRandom(seed + a.typeId.length) * 0.5;
        const scoreB = roleScore[b.role] + pseudoRandom(seed + b.typeId.length) * 0.5;
        return scoreA - scoreB;
    });

    bouquetFlowers.forEach((flower, i) => {
        const flowerDef = FlowerData.find(f => f.id === flower.typeId);
        const slot = slots[i];
        
        // Larger presence to match the impressive reference image scale
        let scaleBase = flower.role === "anchor" ? 1.7 : (flower.role === "mass" ? 1.55 : 1.4);
        
        // Dynamically tilt outwards based on their placement
        const tilt = (slot.x / 60) * 25 + (pseudoRandom(seed + 300 + i) - 0.5) * 20;
        
        items.push({
            ...flower, 
            isLeaf: false, 
            Component: flowerDef?.Component,
            x: slot.x, 
            y: slot.y,
            rotate: tilt, 
            scale: scaleBase + (pseudoRandom(seed + 400 + i) - 0.5) * 0.15,
            zIndex: 100 + i 
        });
    });

    return items.sort((a, b) => a.zIndex - b.zIndex);
}

function ArrangerView({ selected, seed, greenery, onShuffle, onChangeGreenery, onBack, onNext }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center"
        >
            <p className="uppercase tracking-widest font-mono text-sm mb-6 font-bold">Customize your bouquet</p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button onClick={onShuffle} className="px-6 py-2.5 bg-white/10 text-white border border-white/20 rounded-full text-xs uppercase tracking-wider font-medium hover:bg-white/20 transition-colors">
                    Try new arrangement
                </button>
                <button onClick={onChangeGreenery} className="px-6 py-2.5 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-full text-xs uppercase tracking-wider font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                    Change Greenery
                </button>
            </div>

            {/* Canvas */}
            <div className="relative w-full max-w-[500px] min-h-[500px] mb-12 flex items-center justify-center mt-10">

                <AnimatePresence mode="popLayout">
                {generateBouquetItems(selected, seed, greenery).map((item: any, i: number) => {
                    const C = item.Component;

                    return (
                        <motion.div 
                            key={`${item.id}-${seed}-${greenery}`}
                            initial={{ y: -800 + (pseudoRandom(seed + i*11) * 200), x: item.x + (pseudoRandom(seed + i*7) - 0.5) * 400, opacity: 0, rotate: (pseudoRandom(seed + i*13) - 0.5) * 180, scale: item.scale * 0.5 }}
                            animate={{ y: item.y, x: item.x, opacity: 1, rotate: item.rotate, scale: item.scale }}
                            transition={{ type: "spring", bounce: 0.35, duration: 1.2, delay: i * 0.08 }}
                            className="absolute w-28 h-28 origin-center flex items-center justify-center"
                            style={{ zIndex: item.zIndex }}
                        >
                            <C className={`w-full h-full object-contain pointer-events-none ${item.isLeaf ? 'opacity-90' : ''}`} />
                        </motion.div>
                    );
                })}
                </AnimatePresence>
            </div>

            <div className="flex gap-4 mt-8">
                <button onClick={onBack} className="px-8 py-3 border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Back</button>
                <button onClick={onNext} className="px-12 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all z-10 relative">Next</button>
            </div>
        </motion.div>
    );
}

function Greenery({ type }: { type: number }) {
    // Deprecated component (replaced by generative leaves)
    return null;
}

function MessageView({ message, setMessage, onBack, onNext }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-lg flex flex-col items-center px-4"
        >
            <p className="uppercase font-mono text-sm mb-10 font-bold text-white tracking-widest">Write the card</p>

            <div className="w-full bg-[#fdfaf6] border-[3px] border-black p-8 md:p-12 shadow-[8px_8px_0_0_rgba(255,255,255,0.1)] mb-12 flex flex-col font-mono relative">
                
                <div className="flex items-center gap-4 mb-10">
                    <span className="font-bold text-black text-xl md:text-2xl whitespace-nowrap">Dear</span>
                    <input 
                        type="text" 
                        value={message.to} 
                        onChange={e => setMessage({...message, to: e.target.value})}
                        className="flex-1 bg-transparent border-none focus:outline-none text-gray-500 font-mono text-xl md:text-2xl placeholder-gray-300 w-full min-w-0"
                        placeholder="Beloved,"
                    />
                </div>

                <textarea 
                    value={message.body} 
                    onChange={e => setMessage({...message, body: e.target.value})}
                    rows={5}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-500 font-mono text-lg md:text-xl resize-none placeholder-gray-300 leading-[1.8] mb-10"
                    placeholder="I have so much to tell you..."
                />

                <div className="flex flex-col items-end gap-2 text-right">
                    <span className="font-bold text-black text-xl md:text-2xl">Sincerely,</span>
                    <input 
                        type="text" 
                        value={message.from} 
                        onChange={e => setMessage({...message, from: e.target.value})}
                        className="w-full bg-transparent border-none focus:outline-none text-gray-500 font-mono text-xl md:text-2xl placeholder-gray-300 text-right"
                        placeholder="Secret Admirer"
                    />
                </div>
                
                <div className="absolute bottom-32 right-10 text-gray-400 font-sans text-xs opacity-50 pointer-events-none select-none">
                    //
                </div>
            </div>

            <div className="flex gap-4">
                <button onClick={onBack} className="px-8 py-3 bg-[#fdfaf6] border-[3px] border-black text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-[4px_4px_0_0_rgba(255,255,255,0.1)]">Back</button>
                <button onClick={onNext} className="px-10 py-3 bg-black border-[3px] border-black text-[#e8dbb0] text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors shadow-[4px_4px_0_0_rgba(255,255,255,0.1)]">Next</button>
            </div>
        </motion.div>
    );
}

function FinalView({ selected, seed, greenery, message, isShared, onReset }: any) {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const typesStr = selected.map((s: any) => F_MAP.indexOf(s.typeId).toString(36)).join('');
        const sStr = Math.round(seed * 100000).toString(36);
        const dataArr = [
            typesStr,
            sStr,
            greenery,
            message.to,
            message.from,
            message.body
        ];
        
        const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(dataArr))));
        const encoded = encodeURIComponent(base64);
        
        const url = `${window.location.origin}${window.location.pathname}#bouquet=${encoded}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center w-full pb-16 pt-4 px-4"
        >
            {isShared && <FallingRoses />}
            <div className="flex flex-col md:flex-row items-center justify-center lg:gap-8 w-full mb-12">
                <div className="relative w-full max-w-[500px] min-h-[400px] lg:min-h-[600px] flex flex-col items-center justify-center drop-shadow-xl z-20">
                    <AnimatePresence mode="popLayout">
                    {generateBouquetItems(selected, seed, greenery).map((item: any, i: number) => {
                        const C = item.Component;

                        return (
                            <motion.div 
                                key={`${item.id}-${seed}-${greenery}`}
                                initial={{ y: -800 + (pseudoRandom(seed + i*11) * 200), x: item.x + (pseudoRandom(seed + i*7) - 0.5) * 400, opacity: 0, rotate: (pseudoRandom(seed + i*13) - 0.5) * 180, scale: item.scale * 0.5 }}
                                animate={{ y: item.y, x: item.x, opacity: 1, rotate: item.rotate, scale: item.scale }}
                                transition={{ type: "spring", bounce: 0.35, duration: 1.2, delay: i * 0.08 }}
                                className="absolute w-28 h-28 origin-center flex items-center justify-center"
                                style={{ zIndex: item.zIndex }}
                            >
                                <C className={`w-full h-full drop-shadow-md ${item.isLeaf ? 'opacity-90' : ''}`} />
                            </motion.div>
                        );
                    })}
                    </AnimatePresence>
                </div>

                {/* The Note Card */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                    className="w-full max-w-sm bg-[#fffefa] rounded-xl border border-white/10 p-8 shadow-[0_0_40px_rgba(255,255,255,0.05)] relative overflow-hidden"
                    style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '100% 32px', lineHeight: '32px', paddingTop: '42px', paddingBottom: '32px' }}
                >
                    {/* Red vertical margin line */}
                    <div className="absolute top-0 bottom-0 left-8 w-px bg-red-400/30" />
                    <div className="absolute top-0 bottom-0 left-[36px] w-px bg-red-400/30" />

                    <div className="font-serif text-xl text-gray-800 pl-8 relative z-10 break-words">
                        <p className="mb-6 font-bold">Dear {message.to || "Friend"},</p>
                        <p className="mb-10 min-h-[128px] whitespace-pre-wrap leading-[32px]">{message.body || "A digital bouquet curated just for you."}</p>
                        <p className="font-bold">Fondly,</p>
                        <p className="font-bold">{message.from || "Me"}</p>
                    </div>
                </motion.div>
            </div>

            {/* Restart button and Share button chronologically below */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4"
            >
                <button 
                    onClick={onReset} 
                    className="px-8 py-3.5 border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                    Build Another Bouquet
                </button>
                <button 
                    onClick={handleShare} 
                    className="px-8 py-3.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full text-white text-xs font-bold uppercase tracking-widest hover:scale-105 border border-white/10 transition-all min-w-[200px] shadow-[0_0_20px_rgba(108,99,255,0.4)]"
                >
                    {copied ? "Link Copied!" : "Copy Share Link"}
                </button>
            </motion.div>
        </motion.div>
    );
}
