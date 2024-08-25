import { useState } from "react";

export default function SelectMenu({ searchParams: [searchParams, setSearchParams], placeholder, name, optionsArray }) {

   const optionsHTML = optionsArray.map((option, index) => {
      if (option) {
         return <option key={index} value={option}>{option}</option>
      }
   })

   function handleChange(event) {
      const value = event.target.value
      setSearchParams({
         ...searchParams,
         name : value
         
      })
      console.log(searchParams)
   }
   return (
      <div className="flex flex-col">
         <label htmlFor={name}></label>
         <select onChange={handleChange} className="border-2 border-black p-1 text-sm" name={name} id={name}>
            <option hidden value="">{placeholder}</option>
            {optionsHTML}
         </select>
      </div>
   )

}