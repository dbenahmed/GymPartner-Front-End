import React from "react";

export default function Button({
   children,
   onClick,
   primary,
   height,
   width,
   size,
   secondary,
   grow
}) {
   const primaryClasses = `${grow ? 'flex-grow' : ''} ${width !== undefined ? `w-${width}` : 'w - fit'} ${height !== undefined ? `h-${height}` : 'h - fit'} ${size !== undefined ? `text-${size}` : ''} flex items-center justify-center border-main border-2 text-white bg-main p-1 pl-4 pr-3 rounded-lg active:bg-main active:text-white  hover:bg-main hover:bg-opacity-0 hover:text-black hover:border-main hover:shadow-md transition-all`
   const secondaryClasses = `${grow ? 'flex-grow' : ''} ${width !== undefined ? `w-${width}` : 'w - fit'} ${height !== undefined ? `-h${height}` : 'h - fit'}  ${size !== undefined ? `text-${size}` : ''} flex items-center justify-center border-main border-2 p-1 pl-4 pr-3 rounded-lg hover:bg-main hover:text-white hover:shadow-md transition-all`

   return (
      <button onClick={onClick} className={
         primary ? primaryClasses : secondaryClasses
      } >
         {children}
      </button>
   )
}