import { fetchBackendExercises, fetchBackendSchema } from "../../utils/fetchBackend"

export default function ExercisePlanPanel({ props }) {
   const backendExercises = fetchBackendExercises()
   const backendSchema = fetchBackendSchema()

   const exerciseData = backendExercises.find((data) => data.id === props.exerciseInfosDatabaseId)
   const repsString = props.reps.join(', ')
   return (
      <div className='bg-graycolor p-3'>
         <div className="flex items-center justify-between">
            <h2 className='text-lg font-semibold'>{exerciseData.name}</h2>
         </div>
         <div className='flex gap-1 font-medium'>
            <p className='text-sm bg-orange-200 w-fit pl-2 pr-2 rounded-lg'>{repsString} reps, {props.sets} sets</p>
            <p className='text-sm bg-yellow-200 w-fit pl-2 pr-2 rounded-lg'>Weight : {props.weight}{props.unit}</p>
         </div>
      </div>
   )
}