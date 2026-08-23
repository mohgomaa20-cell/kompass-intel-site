import React from "react";

export const Logo: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
      <defs>
        {/* Silver metallic gradient */}
        <linearGradient id="silverMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#E6E6E6" />
          <stop offset="50%" stopColor="#8A95A5" />
          <stop offset="75%" stopColor="#E6E6E6" />
          <stop offset="100%" stopColor="#5C6672" />
        </linearGradient>
        
        {/* Teal-to-Silver gradient for blade */}
        <linearGradient id="tealBladeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8A95A5" />
          <stop offset="45%" stopColor="#008B8B" />
          <stop offset="80%" stopColor="#00D6C6" />
          <stop offset="100%" stopColor="#00FFFF" />
        </linearGradient>
        
        {/* Outer Glow for Teal Accents */}
        <filter id="tealGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Centered and Scaled K-Mark logo */}
      <g transform="translate(256, 256) scale(1.7) translate(-260, -210)">
        
        {/* 1. DATA / SIGNALS (Peak wave of teal equalizer bars at bottom-left of spine) */}
        <g filter="url(#tealGlow)">
          <rect x="192" y="305" width="3" height="20" rx="1.5" fill="#00D6C6" />
          <rect x="198" y="285" width="3" height="40" rx="1.5" fill="#00D6C6" />
          <rect x="204" y="260" width="3" height="65" rx="1.5" fill="#00D6C6" />
          <rect x="210" y="280" width="3" height="45" rx="1.5" fill="#00D6C6" />
          <rect x="216" y="295" width="3" height="30" rx="1.5" fill="#00D6C6" />
        </g>

        {/* 2. INTELLIGENCE / DECISION (Solid Silver K Body) */}
        <path d="M 200 100 L 232 100 L 232 180 L 285 135 L 268 155 L 232 205 L 320 325 L 288 325 L 232 245 L 200 270 Z" fill="url(#silverMetal)" />
        
        {/* 3. DIRECTION / EDGE (Teal Blade Tip on Upper-Right Branch) */}
        <path d="M 285 135 L 330 95 L 295 145 L 268 155 Z" fill="url(#tealBladeGradient)" filter="url(#tealGlow)" />
      </g>
    </svg>
  );
};
export default Logo;
