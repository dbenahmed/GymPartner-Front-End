import { useEffect, useRef, useState } from 'react';
import { ExercisePlanPanel } from '../../components/index.jsx'
import { fetchBackendExercises, fetchBackendSchema } from '../../utils/fetchBackend.jsx';
import { useAsyncError } from 'react-router-dom';
import searchForExercises from '../../utils/searchForExercises.jsx';
import Fuse from 'fuse.js'
import { User } from '../../data/user.js';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils.js';
import { v4 as uuidv4 } from 'uuid';

export default function PlanPage() {
   // importing backend Data
   const backendExercises = fetchBackendExercises()
   const backendSchema = fetchBackendSchema()


   const [visibleExercisesAddingList, setVisibleExercisesAddingList] = useState(false)
   const [foundExercises, setFoundExercises] = useState([])
   const searchInputText = useRef('')
   const [planExercises, setPlanExercises] = useState(loadFromLocalStorage('user'))
   function toggleExercisesAddingList() {
      setVisibleExercisesAddingList(prev => !prev)
   }

   function handleSearchInput(event) {
      const value = event.target.value
      searchInputText.current = value
   }

   function searchExercises() {
      const fuseOptions = {
         keys: [
            "name"
         ]
      }
      const fuse = new Fuse(backendExercises, fuseOptions);

      const exos = fuse.search(searchInputText.current, { limit: 10 })

      const exosJsx = exos.map(exercise => {
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
            <div key={exercise.item.id} className='bg-graycolor rounded-lg p-4 flex flex-col gap-2'>
               <h1 className='text-xl font-semibold'>{exercise.item.name}</h1>
               <div className='flex flex-col gap-1'>
                  {primaryMuscles}
                  <p className='text-xs w-fit pl-2 pr-2 rounded-lg bg-orange-200'>{exercise.item.equipment}</p>
                  <div className='flex flex-wrap'>
                     {secondaryMuscles.length !== 0 && secondaryMuscles}
                  </div>
                  <p className='text-xs w-fit pl-2 pr-2 rounded-lg bg-blue-200'>{exercise.item.level}</p>
                  <button>Add Exercise</button>
               </div>
            </div>
         )
      })
      setFoundExercises(exosJsx)
   }


   return (
      <div className='p-10'>
         <div className='flex flex-col gap-2 border-2 border-gray-200 w-96 p-4 rounded-lg '>
            <h1 className='text-3xl font-bold'>Today</h1>
            {
               planExercises.exercises.map(exercise => {
                  return (
                     <ExercisePlanPanel key={exercise.id} props={
                        {
                           id: exercise.id,
                           exerciseInfosDatabaseId: exercise.exerciseInfosDatabaseId,
                           weight: exercise.weight,
                           unit: exercise.unit,
                           reps: exercise.reps,
                           sets: exercise.sets,
                           split: exercise.split
                        }
                     } />
                  )
               })}
            <button onClick={toggleExercisesAddingList} className=' border-greycolor border-2 hover:border-opacity-100 hover:bg-graycolor p-1 pl-4 pr-3 rounded-lg'>Add Exercise</button>
            {/*  // ! This is the Exercises Panel  */}
            {visibleExercisesAddingList &&
               <div className='fixed flex justify-center items-center bg-black bg-opacity-30 top-0 left-0 right-0 bottom-0'>
                  <div className='relative w-5/6 gap-4 bg-white h-5/6 flex flex-col  p-6 rounded-lg'>
                     <button onClick={toggleExercisesAddingList} className='absolute transition-all  hover:bg-gray-600 hover:fill-white rounded-full top-0 right-0 p-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                     </button>
                     <div className='w-full flex h-fit items-center justify-center'>
                        <input onChange={handleSearchInput} className='bg-graycolor shadow-inner shadow-gray-400 w-full h-9 rounded-lg p-2' type="text" />
                        <button onClick={searchExercises} className='ml-2 border-greycolor border-2 hover:border-opacity-100 hover:bg-graycolor h-full pl-4 pr-3 rounded-lg'>Search</button>
                     </div>
                     <div className='grid grid-cols-3 gap-3 overflow-y-scroll'>
                        {foundExercises}
                     </div>
                  </div>
               </div>}
         </div>
      </div>
   )
}