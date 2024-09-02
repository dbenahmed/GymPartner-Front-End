import React, { useState } from "react";

export default function ToggleBetweenOptions({
   children,
   options,
   onClick,
   height,
   width,
   activeOption
}) {



   const [value, setValue] = useState(options[0])
   const primaryClasses = `${width ? `w-${width}` : ''} ${height ? `h-${height}` : ''} border-main border-2 text-white bg-main p-1 pl-4 pr-3 rounded-lg active:bg-main  active:text-white  transition-all`
   function handleClick() {
      const index = options.findIndex(val => val === value)
      const newValue = (options.length - 1) === index ? options[0] : options[index + 1]
      setValue(newValue)
      onClick(newValue)
   }
   return (
      <button onClick={handleClick} className={
         primaryClasses
      } >
         {value}
      </button>
   )
}