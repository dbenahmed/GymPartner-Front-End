import { useState } from 'react'
import { Button, Plan } from '../../index.jsx'


export default function FoundExercise({ exercise, state }) {

   const [visibleExerciseMenu, setVisibleExerciseMenu] = useState(false)
   const [options, setOptions] = useState({
      reps: undefined,
      weight: undefined,
      unit: undefined,
      sets: undefined
   })
   

   function toggleExerciseMenu() {
      setVisibleExerciseMenu(prev => !prev)
   }

   const primaryMuscles = exercise.item.primaryMuscles.map((muscle, index) => {
      return (
         <p className='text-xs bg-red-200 w-fit pl-2 pr-2 rounded-lg' key={index}>{muscle}</p>
      )
   })
   const secondaryMuscles = exercise.item.secondaryMuscles.map((muscle, index) => {
      return (
         <p className='text-xs w-fit pl-2 pr-2 rounded-lg bg-yellow-200' key={index}>{muscle}</p>
      )
   })

   return (
      <div key={exercise.item.id} className='bg-graycolor rounded-lg p-4 flex flex-col gap-4'>
         {/* // ! Exercise Menu */}
         {visibleExerciseMenu &&
            <Plan.FoundExercise.ExerciseMenu setVisibleExerciseMenu={setVisibleExerciseMenu} exercise={exercise} setOptions={setOptions} toggleExerciseMenu={toggleExerciseMenu} />
         }
         <div className='flex flex-col gap-2 flex-grow'>
            <h1 className='text-xl font-semibold'>{exercise.item.name}</h1>
            <div className='flex flex-col gap-1'>
               {primaryMuscles}
               <p className='text-xs w-fit pl-2 pr-2 rounded-lg bg-orange-200'>{exercise.item.equipment}</p>
               <div className='flex flex-wrap'>
                  {secondaryMuscles.length !== 0 && secondaryMuscles}
               </div>
               <p className='text-xs w-fit pl-2 pr-2 rounded-lg bg-blue-200'>{exercise.item.level}</p>
            </div>
         </div>
         <Button onClick={toggleExerciseMenu} primary={true} size="sm" key={exercise.item.id}>
            Add Exercise
         </Button>
      </div>
   )
}