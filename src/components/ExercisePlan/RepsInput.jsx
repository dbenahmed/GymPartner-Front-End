import React, { useState } from "react";
import { Button, IconButton } from "../index"

export default function RepsInput(
   {
      children,
      onChange,
      onClick,
      primary,
      height,
      width,
      secondary,
      id,
      type,
      min,
      max,
      index
   }
) {

   function handleClick() {
      onClick(index)
   }
   function handleInputChange(event) {
      const value = event.target.value
      onChange(value, index)
   }

   const primaryClasses = `${width ? `w-${width}` : ''} ${height ? `h-${height}` : ''} border-black border-2 ${width !== undefined ? `pl-0 pr-0` : 'pl-3 pr-3'} ${height !== undefined ? 'pt-0 pb-0' : 'pt-1 pb-1'} rounded-lg  hover:border-main hover:shadow-inner transition-all`
   return (
      <div className="flex h-fit gap-1">
         <input id={id} className={`${primaryClasses} flex-grow`} onChange={handleInputChange} type={type ? type : 'text'} min={min} max={max} />
         <Button index={index} primary={true} onClick={handleClick} >
            <svg fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
         </Button>
      </div >

   )
}