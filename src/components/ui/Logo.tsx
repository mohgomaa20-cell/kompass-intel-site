import React from "react";
import Image from "next/image";

export const Logo: React.FC<{ className?: string; priority?: boolean; width?: number; height?: number }> = ({ 
  className = "object-contain", 
  priority = false,
  width = 40,
  height = 40
}) => {
  return (
    <Image 
      src="/logo.png" 
      alt="Kompass Intelligence Logo" 
      width={width} 
      height={height} 
      className={className} 
      priority={priority}
    />
  );
};
export default Logo;
