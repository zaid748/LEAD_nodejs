import React from "react";
import { Avatar } from "@material-tailwind/react";

export function CustomAvatar({ src, alt, size = "md", className = "" }) {
  // Determinar dimensiones según el tamaño
  const getDimensions = () => {
    switch(size) {
      case "xs": return { width: "24px", height: "24px", iconSize: "w-4 h-4" };
      case "sm": return { width: "32px", height: "32px", iconSize: "w-5 h-5" };
      case "md": return { width: "40px", height: "40px", iconSize: "w-6 h-6" };
      case "lg": return { width: "48px", height: "48px", iconSize: "w-7 h-7" };
      case "xl": return { width: "64px", height: "64px", iconSize: "w-9 h-9" };
      case "xxl": return { width: "80px", height: "80px", iconSize: "w-12 h-12" };
      default: return { width: "40px", height: "40px", iconSize: "w-6 h-6" };
    }
  };

  // Si hay una imagen válida, mostrar el Avatar normal
  if (src && src.trim() !== "") {
    return (
      <Avatar
        src={src}
        alt={alt}
        size={size}
        className={className}
      />
    );
  }
  
  // Si no hay imagen, mostrar el SVG
  const { width, height, iconSize } = getDimensions();
  
  return (
    <div 
      className={`${className} flex items-center justify-center bg-blue-gray-100 rounded-lg shadow-md overflow-hidden`}
      style={{ width, height, minWidth: width, minHeight: height }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 384 512" 
        className={`${iconSize} text-blue-gray-700`}
      >
        <path 
          fill="currentColor" 
          d="M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"
        />
      </svg>
    </div>
  );
}

export default CustomAvatar; 