import React from "react";

export interface FlowerProps extends React.HTMLAttributes<HTMLImageElement> {
    className?: string;
}

export const FlowerData = [
    { id: "orchid", name: "ORCHID", Component: Orchid },
    { id: "tulip", name: "TULIP", Component: Tulip },
    { id: "dahlia", name: "DAHLIA", Component: Dahlia },
    { id: "anemone", name: "ANEMONE", Component: Anemone },
    { id: "carnation", name: "CARNATION", Component: Carnation },
    { id: "zinnia", name: "ZINNIA", Component: Zinnia },
    { id: "sunflower", name: "SUNFLOWER", Component: Sunflower },
    { id: "daisy", name: "DAISY", Component: Daisy },
    { id: "rose", name: "ROSE", Component: Rose },
];

const baseClasses = "object-contain pointer-events-none drop-shadow-none cursor-pointer hover:scale-105 transition-transform duration-300";
const imageStyle = {
    // Crushes dark grey AI artifacts to pure black, boosts vividness
    filter: "brightness(0.85) contrast(1.4) saturate(1.2)"
};

function Orchid({ className, ...props }: FlowerProps) {
    return <img src="/flowers/orchid.png" className={`${baseClasses} ${className || ''}`} style={imageStyle} alt="Orchid" {...props} />;
}

function Tulip({ className, ...props }: FlowerProps) {
    return <img src="/flowers/tulip.png" className={`${baseClasses} ${className || ''}`} style={imageStyle} alt="Tulip" {...props} />;
}

function Dahlia({ className, ...props }: FlowerProps) {
    return <img src="/flowers/dahlia.png" className={`${baseClasses} ${className || ''}`} style={imageStyle} alt="Dahlia" {...props} />;
}

function Anemone({ className, ...props }: FlowerProps) {
    return <img src="/flowers/anemone.png" className={`${baseClasses} ${className || ''}`} style={imageStyle} alt="Anemone" {...props} />;
}

function Carnation({ className, ...props }: FlowerProps) {
    return <img src="/flowers/carnation.png" className={`${baseClasses} ${className || ''}`} style={imageStyle} alt="Carnation" {...props} />;
}

function Zinnia({ className, ...props }: FlowerProps) {
    return <img src="/flowers/zinnia.png" className={`${baseClasses} ${className || ''}`} style={imageStyle} alt="Zinnia" {...props} />;
}

function Sunflower({ className, ...props }: FlowerProps) {
    return <img src="/flowers/sunflower.png" className={`${baseClasses} ${className || ''}`} style={imageStyle} alt="Sunflower" {...props} />;
}

function Daisy({ className, ...props }: FlowerProps) {
    return <img src="/flowers/daisy.png" className={`${baseClasses} ${className || ''}`} style={imageStyle} alt="Daisy" {...props} />;
}

function Rose({ className, ...props }: FlowerProps) {
    return <img src="/flowers/rose.png" className={`${baseClasses} ${className || ''}`} style={imageStyle} alt="Rose" {...props} />;
}
