import { Link } from "react-router-dom"
import wordsToUpperCase from "../../utils/wordsToUpperCase"

export default function ExerciseBigContainer({ props }) {
   const { name } = props
   const { force } = props
   const { level } = props
   const { mechanic } = props
   const { equipment } = props
   const { primaryMuscles } = props
   const { secondaryMuscles } = props
   const { instructions } = props
   const { category } = props
   const { images } = props
   const { id } = props
   const imageSrc = `/src/data/exercises/${images[0]}`

   function arrayToJsx(array) {
      const jsx = array.map(string => {
         return `${wordsToUpperCase(string)}`
      })
      return jsx
   }

   return (
      <Link to={`?${props.id}`}>
         <div className="flex flex-col w-full h-full p-4 rounded-xl bg-gradient-to-tr from-main to-blue-500 text-gray-100 gap-4">
            <div className=" h-1/3 w-full">
               <img className="h-full rounded-lg w-full object-cover " src={imageSrc} alt={name} />
            </div>
            <div key={id} className='w-full'>
               <h1 className='text-3xl font-bold'>{name}</h1>
               <p className='text-md'>
                  <span className="font-bold">Equipment: </span>
                  {wordsToUpperCase(equipment)}
               </p>
               <p className='text-md'>
                  <span className="font-bold">Primary Muscles: </span>
                  {arrayToJsx(primaryMuscles)}
               </p>
               <p className='text-xs overflow-hidden'>
                  <span className="font-bold text-md">Instructions: </span>
                  {instructions}
               </p>
            </div>
         </div>
      </Link>


   )
}