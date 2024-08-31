import { useRef, useState } from 'react';
import { ExercisePlanPanel } from '../../components/index.jsx'
import { fetchBackendExercises, fetchBackendSchema } from '../../utils/fetchBackend.jsx';
import { useAsyncError } from 'react-router-dom';
import searchForExercises from '../../utils/searchForExercises.jsx';

export default function PlanPage() {
   const backendExercises = fetchBackendExercises()
   const backendSchema = fetchBackendSchema()
   class User {
      constructor() {

      }
      exercises = [
         {
            exerciseId,
            day,
            index,
            weight,
            unit,
            reps: [],
            sets,
         }
      ];
   }

   const [addExercisePanel, setAddExercisePanel] = useState(false)
   function toggleAddExercisePanel() {
      setAddExercisePanel(prev => !prev)
   }

   const searchInputText = useRef('')
   function handleSearchInput(event) {
      const value = event.target.value
      searchInputText.current = value
   }
   function searchExercises() {
      const exos = searchForExercises({
         name: searchInputText.current
      })

   }
   return (
      <div className='p-10'>


         <div className='flex flex-col gap-2 border-2 border-gray-200 w-96 p-4 rounded-lg '>
            <h1 className='text-3xl font-bold'>Today</h1>
            <ExercisePlanPanel props={
               {
                  exerciseId: '3_4_Sit-Up',
                  weight: 35,
                  unit: 'kg',
                  reps: [
                     12, 10, 4
                  ],
                  sets: 3
               }
            } />
            <button onClick={toggleAddExercisePanel} className=' border-greycolor border-2 hover:border-opacity-100 hover:bg-graycolor p-1 pl-4 pr-3 rounded-lg'>Add Exercise</button>
            <div className='fixed flex justify-center items-center bg-black bg-opacity-30 top-0 left-0 right-0 bottom-0'>
               <div className='w-5/6 bg-white h-5/6 flex flex-col items-center p-6 rounded-lg'>
                  <div className='w-5/6 flex gap-2 h-fit'>
                     <input onChange={handleSearchInput} className='bg-graycolor shadow-inner shadow-gray-400 w-5/6 h-9 rounded-lg p-2' type="text" />
                     <button onClick={searchExercises} className='border-greycolor border-2 hover:border-opacity-100 hover:bg-graycolor h-full pl-4 pr-3 rounded-lg'>Search</button>
                  </div>
                  <div>

                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}