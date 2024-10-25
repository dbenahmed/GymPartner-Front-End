import { useEffect, useRef, useState } from "react"
import { fetchBackendExercises, fetchBackendSchema } from "../../../utils/fetchBackend"
import { IconButton } from "../../index"

export default function ExercisePanel({ props }) {

   const {
      planId,
      databaseId,
      weight,
      name,
      unit,
      currentReps,
      sets
   } = props
   const [loading, setLoading] = useState(true)
   const exerciseData = useRef({})

   const repsString = currentReps.reps.join(', ')
   async function removeExerciseFromPlan(event) {
      const planId = event.target.id
   }

   return (
      <div className='bg-graycolor p-3'>
         <div className="flex items-center justify-between">
            <h2 className='text-lg font-semibold'>{name}</h2>
            <IconButton id={planId} bgcolor='red' fill='white' onClick={removeExerciseFromPlan} >
               <svg id={planId} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
            </IconButton>
         </div>
         <div className='flex gap-1 font-medium'>
            <p className='text-sm bg-orange-200 w-fit pl-2 pr-2 rounded-lg'>{repsString} reps, {sets} sets</p>
            <p className='text-sm bg-yellow-200 w-fit pl-2 pr-2 rounded-lg'>Weight : {weight} {unit}</p>
         </div>
      </div>
   )
}