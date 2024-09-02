import React from "react";

export default function IconButton({
   children,
   onClick,
   height,
   width,
   color
}) {
   const primaryClasses = `${width ? `w-${width}` : 'w-6'} ${height ? `h-${height}` : 'h-6'} fill-white hover:bg-${color}-950 flex justify-center items-center rounded-full transition-all`
   return (
      <button onClick={onClick} className={
         `${primaryClasses} bg-${color}-500`
      } >
         {children}
      </button>
   )
}