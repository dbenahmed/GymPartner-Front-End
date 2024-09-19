import { fetchBackendExercises, fetchBackendSchema } from "../../utils/fetchBackend"
import { IconButton } from "../index"

export default function ExercisePanel({ props }) {
   const backendExercises = fetchBackendExercises()
   const exerciseData = backendExercises.find((data) => data.id === props.exerciseInfosDatabaseId)
   const repsString = props.reps.join(', ')
   console.log(props)
   function removeExerciseFromPlan(event) {
      const id = event.target.id
      console.log(id);
      
      //console.log(id);

   }

   return (
      <div className='bg-graycolor p-3'>
         <div className="flex items-center justify-between">
            <h2 className='text-lg font-semibold'>{exerciseData.name}</h2>
            <IconButton bgcolor='red' fill='white' onClick={removeExerciseFromPlan} >
               <svg id={props.id} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
            </IconButton>
         </div>
         <div className='flex gap-1 font-medium'>
            <p className='text-sm bg-orange-200 w-fit pl-2 pr-2 rounded-lg'>{repsString} reps, {props.sets} sets</p>
            <p className='text-sm bg-yellow-200 w-fit pl-2 pr-2 rounded-lg'>Weight : {props.weight}{props.unit}</p>
         </div>
      </div>
   )
}