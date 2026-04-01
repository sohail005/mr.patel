"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowerData } from "./Flowers";

type Step = "landing" | "picker" | "arranger" | "message" | "final";

interface SelectedFlower {
    id: string;
    typeId: string;
}

export default function InteractiveBuilder() {
    const [step, setStep] = useState<Step>("landing");
    const [selected, setSelected] = useState<SelectedFlower[]>([]);
    const [seed, setSeed] = useState(0);
    const [greenery, setGreenery] = useState(0);
    const [message, setMessage] = useState({ to: "", from: "", body: "" });

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash.startsWith('#bouquet=')) {
            try {
                const hashParams = window.location.hash.slice(9);
                const decoded = decodeURIComponent(atob(decodeURIComponent(hashParams)));
                const data = JSON.parse(decoded);
                
                if (data.selected) setSelected(data.selected);
                if (data.seed !== undefined) setSeed(data.seed);
                if (data.greenery !== undefined) setGreenery(data.greenery);
                if (data.message) setMessage(data.message);
                
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
        <section className="relative w-full min-h-screen text-white overflow-hidden font-sans py-24 z-20">
            
            <div className="max-w-6xl mx-auto px-6 h-full flex flex-col items-center relative z-10">
                <motion.div layoutId="header" className="text-center mb-12" onClick={() => {if(step!=='landing') setStep('landing')}}>
                    <h2 className="text-4xl md:text-5xl font-serif tracking-tight gradient-text cursor-pointer inline-block">Digibouquet</h2>
                </motion.div>

                <div className="w-full flex-1 relative flex flex-col items-center justify-center min-h-[60vh]">
                    <AnimatePresence mode="wait">
                        {step === "landing" && (
                            <LandingView key="landing" onNext={() => setStep("picker")} />
                        )}
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
                                onReset={() => {
                                    setSelected([]);
                                    setMessage({ to: "", from: "", body: "" });
                                    setStep("landing");
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

function LandingView({ onNext }: { onNext: () => void }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-10 mt-8"
        >
            <p className="text-sm md:text-lg uppercase tracking-widest text-center font-medium max-w-md text-gray-300">Craft a digital arrangement to share as a unique virtual gift.</p>
            <button 
                onClick={onNext}
                className="px-10 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-sm md:text-base uppercase tracking-widest font-bold hover:scale-105 transition-all duration-300 rounded-full"
            >
                Build a Bouquet
            </button>
        </motion.div>
    );
}

function PickerView({ selected, addFlower, removeFlower, onNext }: any) {
    const total = selected.length;
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center pb-20 mt-4"
        >
            <p className="uppercase tracking-widest font-mono text-sm mb-2 font-bold text-white">Pick 6 to 10 blooms</p>
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
                disabled={total < 6 || total > 10}
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

// Elliptical mask keeps the long stems intact while fading the corners
const leafStyle = {
    filter: "brightness(0.8) contrast(1.5) saturate(1.2)", 
    WebkitMaskImage: "radial-gradient(ellipse at center, black 65%, transparent 85%)",
    maskImage: "radial-gradient(ellipse at center, black 65%, transparent 85%)"
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
    const items = [];
    
    // Categorize flowers by role for structural diamond logic
    // Anchor: Big bottom focal point. Mass: Backdrop volume. Filler: Fills gaps.
    const anchorIds = ["anemone", "dahlia", "tulip"]; 
    const massIds = ["sunflower", "carnation", "rose"]; 
    const fillerIds = ["daisy", "zinnia", "orchid"];

    // Watercolor Background Glows (acts as color canvas behind flowers)
    for (let i=0; i<3; i++) {
        const rSeed = seed + i * 11;
        const colors = ["#ffcc80", "#f48fb1", "#81d4fa", "#ce93d8"];
        items.push({
            id: `bg-color-${i}`,
            isLeaf: true,
            Component: (props: any) => <WatercolorSplotch color={colors[Math.floor(pseudoRandom(rSeed)*colors.length)]} />,
            x: (pseudoRandom(rSeed) - 0.5) * 60,
            y: (pseudoRandom(rSeed+1) - 0.5) * 60 - 20,
            rotate: 0,
            scale: 1.5 + pseudoRandom(rSeed+2),
            zIndex: 0
        });
    }

    // Tall Background Vines (Eucalyptus stretch top-left and top-right)
    items.push({
        id: "euc-1", isLeaf: true, Component: Eucalyptus,
        x: -55 - pseudoRandom(seed)*20, y: -70, rotate: -45 + (pseudoRandom(seed)-0.5)*15, scale: 1.3, zIndex: 10
    });
    items.push({
        id: "euc-2", isLeaf: true, Component: Eucalyptus,
        x: 55 + pseudoRandom(seed+1)*20, y: -70, rotate: 45 + (pseudoRandom(seed+1)-0.5)*15, scale: 1.3, zIndex: 11
    });

    // Thick Dark Fern Base (Shooting downwards and outwards)
    for (let i=0; i<4; i++) {
        items.push({
            id: `fern-${i}`, isLeaf: true, Component: DarkFern,
            x: (i%2===0?-1:1) * (30 + pseudoRandom(seed+3+i)*25),
            y: 50 + pseudoRandom(seed+4+i)*20,
            rotate: (i%2===0?-1:1) * (110 + pseudoRandom(seed+5+i)*30), 
            scale: 1.1 + pseudoRandom(seed+6+i)*0.4,
            zIndex: 15 + i
        });
    }

    // Wispy Seed Pod Strands (Radiating unpredictably)
    const wispyColors = ["#ce93d8", "#b2dfdb", "#ffcc80"];
    const wColor = wispyColors[greeneryType % 3];
    for (let i=0; i<7; i++) {
        const angle = pseudoRandom(seed+10+i) * Math.PI * 2;
        items.push({
            id: `wispy-${i}`, isLeaf: true, Component: (props: any) => <WispyGrass {...props} color={wColor} />,
            x: Math.cos(angle) * 55,
            y: Math.sin(angle) * 65,
            rotate: (angle*180)/Math.PI + 90,
            scale: 1.2 + pseudoRandom(seed+12+i)*0.5,
            zIndex: Math.random() > 0.5 ? 25 : 300 
        });
    }

    // Organize selected flowers into roles
    const anchors: any[] = [];
    const masses: any[] = [];
    const fillers: any[] = [];

    // Make a shallow copy and randomly assign roles based on hardcoded lists
    [...selected].forEach(s => {
        if (anchorIds.includes(s.typeId)) anchors.push(s);
        else if (massIds.includes(s.typeId)) masses.push(s);
        else fillers.push(s);
    });

    // Ensure we have at least 1 anchor by stealing from mass/filler if needed
    if (anchors.length === 0 && masses.length > 0) anchors.push(masses.pop());
    if (anchors.length === 0 && fillers.length > 0) anchors.push(fillers.pop());
    
    // ANCHORS: The focal point at the bottom center
    anchors.forEach((a, i) => {
        const flowerDef = FlowerData.find(f => f.id === a.typeId);
        items.push({
            ...a, isLeaf: false, Component: flowerDef?.Component,
            x: (i%2===0?1:-1) * i * 15,
            y: 55 + i*15, // Anchored low
            rotate: (pseudoRandom(seed+20+i) - 0.5) * 20,
            scale: 1.4 + pseudoRandom(seed+21+i)*0.3, // Giant hero scale
            zIndex: 400 + i // Front and center
        });
    });

    // MASS BACKBONE: Upper fan structure
    masses.forEach((m, i) => {
        const flowerDef = FlowerData.find(f => f.id === m.typeId);
        const slots = [
            {x: -35, y: -45}, {x: 35, y: -45}, {x: 0, y: -30}, 
            {x: -50, y: -10}, {x: 50, y: -10}
        ];
        const slot = slots[i % slots.length];
        items.push({
            ...m, isLeaf: false, Component: flowerDef?.Component,
            x: slot.x + (pseudoRandom(seed+30+i)-0.5)*15,
            y: slot.y + (pseudoRandom(seed+31+i)-0.5)*15,
            rotate: (pseudoRandom(seed+32+i) - 0.5) * 35,
            scale: 1.2 + pseudoRandom(seed+33+i)*0.2,
            zIndex: 100 + Math.floor(slot.y)
        });
    });

    // FILLERS: Central gap filling
    fillers.forEach((f, i) => {
        const flowerDef = FlowerData.find(flower => flower.id === f.typeId);
        const angle = pseudoRandom(seed+40+i) * Math.PI * 2;
        const radius = pseudoRandom(seed+41+i) * 35;
        const x = Math.cos(angle) * (radius * 1.5);
        const y = Math.sin(angle) * (radius) + 15;
        
        items.push({
            ...f, isLeaf: false, Component: flowerDef?.Component,
            x, y,
            rotate: (pseudoRandom(seed+42+i) - 0.5) * 50,
            scale: 0.9 + pseudoRandom(seed+43+i)*0.3,
            zIndex: 200 + Math.floor(y) 
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
            <div className="relative w-80 lg:w-96 min-h-[400px] mb-12 flex items-center justify-center mt-10">

                {generateBouquetItems(selected, seed, greenery).map((item: any, i: number) => {
                    const C = item.Component;

                    return (
                        <motion.div 
                            key={item.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ x: item.x, y: item.y, rotate: item.rotate, scale: item.scale, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 80, damping: 14, delay: i * 0.04 }}
                            className="absolute w-28 h-28 origin-center flex items-center justify-center mix-blend-lighten"
                            style={{ zIndex: item.zIndex }}
                        >
                            <C className={`w-full h-full object-contain pointer-events-none ${item.isLeaf ? 'opacity-90' : ''}`} />
                        </motion.div>
                    );
                })}
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

function FinalView({ selected, seed, greenery, message, onReset }: any) {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const data = { selected, seed, greenery, message };
        const encoded = encodeURIComponent(btoa(encodeURIComponent(JSON.stringify(data))));
        const url = `${window.location.origin}${window.location.pathname}#bouquet=${encoded}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-32 w-full pb-32 pt-10"
        >
            {/* The Bouquet */}
            <div className="relative w-80 h-96 flex flex-col items-center justify-center -mt-10 md:mt-0 drop-shadow-xl z-20">
                {generateBouquetItems(selected, seed, greenery).map((item: any, i: number) => {
                    const C = item.Component;

                    return (
                        <motion.div 
                            key={item.id}
                            initial={{ x: item.x, y: item.y + 20, opacity: 0, rotate: item.rotate }}
                            animate={{ x: item.x, y: item.y, rotate: item.rotate, scale: item.scale, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.05 }}
                            className="absolute w-28 h-28 origin-center flex items-center justify-center"
                            style={{ zIndex: item.zIndex }}
                        >
                            <C className={`w-full h-full drop-shadow-md ${item.isLeaf ? 'opacity-90' : ''}`} />
                        </motion.div>
                    );
                })}
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
                    <p className="font-bold">{message.from || "Sohail"}</p>
                </div>
            </motion.div>

            {/* Restart button and Share button absolutely positioned at the bottom */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                className="absolute bottom-10 flex flex-col sm:flex-row gap-4 w-full justify-center px-4"
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
