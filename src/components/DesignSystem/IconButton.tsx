import React from "react";

export default function IconButton({
   children,
   onClick,
   height,
   width,
   color,
   fill,
   bgcolor,
   id
}) {

   const fillClassname = `fill-${fill}`
   const colorClassname = `color-${color}`
   const bgcolorClassname = `bg-${bgcolor}-500`
   const widthClassname = width ? `w-${width} ` : 'w-6'
   const heightClassname = height ? `h-${height} ` : 'h-6'
   const hoverBgcolorClassname = `hover:bg-${bgcolor}-900`

   const primaryClasses = `${widthClassname} ${heightClassname} ${fillClassname} ${bgcolorClassname} ${hoverBgcolorClassname} ${colorClassname} flex justify-center items-center rounded-full transition-all`
   return (
      <button id={id} onClick={onClick} className={
         `${primaryClasses}`
      } >
         {children}
      </button>
   )
}