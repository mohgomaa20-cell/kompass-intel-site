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
      src="https://ckrdgxlakkyrzajkmmwy.supabase.co/storage/v1/object/public/Kompass/logo,png.png" 
      alt="Kompass Intelligence Logo" 
      width={width} 
      height={height} 
      className={className} 
      priority={priority}
    />
  );
};
export default Logo;
