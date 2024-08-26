import { useState } from "react";

// This is a menu component
// Placeholder is the title of the menu
// searchParams is the state that contains the data of this Menu Items
// Whenever you select an option from the menu, the corresponding State that contains this value should be inside the seachParams Ref
// the name is the name of the value that is changing
// OptionsArray is the array the contain this menu options

export default function SelectMenu({ searchParams, placeholder, name, optionsArray }) {
   // Making the html for the Menu
   const optionsHTML = optionsArray.map((option, index) => {
      if (option) {
         return <option key={index} value={option}>{option}</option>
      }
   })
   function handleChange(event) {
      const value = event.target.value
      searchParams.current = {
         ...searchParams.current,
         [name]: value === "undefined" ? undefined : value
      }
   }
   return (
      <div className="flex flex-col">
         <label htmlFor={name}></label>
         <select onChange={handleChange} className="border-2 border-black p-1 text-sm" name={name} id={name}>
            <option value="undefined">{placeholder}</option>
            {optionsHTML}
         </select>
      </div>
   )

}