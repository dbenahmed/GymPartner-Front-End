import { useState } from "react";

// This is a menu component
// Placeholder is the title of the menu
// searchParamsData is the state that contains the data of this Menu Items
// Whenever you select an option from the menu, the corresponding State that contains this value should be inside the seachParams Ref
// the name is the name of the value that is changing
// OptionsArray is the array the contain this menu options

export default function SelectMenu({
   searchParamsData,
   placeholder,
   name,
   optionsArray,
   grow,
   width,
   height,
   size

}) {
   // Making the html for the Menu
   const optionsHTML = optionsArray.map((option, index) => {
      if (option) {
         return <option key={index} value={option}>{option}</option>
      }
   })

   const secondaryClasses = `${grow ? 'flex-grow' : ''} ${width !== undefined ? `w-${width}` : 'w - fit'} ${height !== undefined ? `-h${height}` : 'h - fit'}  ${size !== undefined ? `text-${size}` : ''} flex items-center justify-center border-main border-2 p-1 pl-4 pr-3 rounded-lg hover:bg-main hover:text-white hover:shadow-md transition-all`


   /* function handleChange(event) {
      const value = event.target.value
      searchParamsData.current = {
         ...searchParamsData.current,
         [name]: value === "undefined" ? undefined : value
      }
   } */

   function handleChange(event) {
      const value = event.target.value
      if (value === "undefined") {
         const newObj = Object.entries(searchParamsData.current).filter((key) => key[0] !== name).reduce((prev, key) => { return { ...prev, [key[0]]: key[1] } }, {})
         searchParamsData.current = newObj

      } else {
         searchParamsData.current = {
            ...searchParamsData.current,
            [name]: value
         }
      }
   }
   return (
      <div className="flex flex-col">
         <label htmlFor={name}></label>
         <select onChange={handleChange} className={secondaryClasses} name={name} id={name}>
            <option value="undefined">{placeholder}</option>
            {optionsHTML}
         </select>
      </div>
   )

}