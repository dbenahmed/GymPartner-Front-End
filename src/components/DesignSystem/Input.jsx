export default function Input(
   {
      children,
      onChange,
      primary,
      height,
      width,
      secondary,
      id,
      type,
      min,
      max,
      index,
      name
   }
) {


   function handleInputChange(event) {
      const value = event.target.value
      onChange(value)
   }

   const primaryClasses = `${width ? `w-${width}` : ''} ${height ? `h-${height}` : ''} border-black border-2 p-3 pt-1 pb-1 rounded-lg  hover:border-main hover:shadow-inner transition-all`
   const secondaryClasses = `${width ? `w-${width}` : ''} ${height ? `h-${height}` : ''} border-main border-2 p-1 pl-4 pr-3 rounded-lg hover:bg-main hover:text-white hover:shadow-md transition-all`
   return (
      <input name={name} id={id} className={`${primaryClasses} flex-grow`} onChange={handleInputChange} type={type ? type : 'text'} min={min} max={max} />
   )
}