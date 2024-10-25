import { createContext, useEffect, useRef, useState } from 'react';
import { Button, IconButton } from '../index.jsx'
import { fetchBackendExercises, fetchBackendSchema } from '../../utils/fetchBackend.jsx';
import Fuse from 'fuse.js'
import { loadFromLocalStorage } from '../../utils/localStorageUtils.js';
export const planExercisesContext = createContext()

export default function Plan({
   userId,
   planId,
   planName,
   collectionId
}) {
   // importing backend Data
   const backendExercises = fetchBackendExercises()
   const [error, setError] = useState(null)
   const [visibleExercisesAddingList, setVisibleExercisesAddingList] = useState(false)
   const [foundExercises, setFoundExercises] = useState([])
   const searchInputText = useRef('')
   const [planExercisesElements, setPlanExercisesElements] = useState([])
   const [explanExercises, setPlanExercises] = useState([])

   async function renderPlanExercisesElement() {
      try {
         const url = `http://localhost:5000/api/v1/users/${userId}/collections/${collectionId}/plans/${planId}`
         const res = await fetch(url)
         const receivedData = await res.json()
         if (!receivedData.ok)
            if (!receivedData.success) {
               setError('ERROR')
               return []
            }
         const response = receivedData.response
         return response
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      const getPlanExercisesData = async () => {
         const planExercisesData = await renderPlanExercisesElement()
         const planExercisesJsx = planExercisesData.map(exercise => {
            return (
               <Plan.ExercisePanel key={exercise.databaseId} props={
                  {
                     databaseId: exercise.databaseId,
                     name: exercise.name,
                     planId: planId,
                     name: exercise.name,
                     exerciseInfosDatabaseId: exercise.databaseId,
                     weight: exercise.data.weight,
                     unit: exercise.data.unit,
                     currentReps: exercise.data.currentReps,
                     sets: exercise.data.currentReps.reps.length,
                  }
               } />
            )
         })
         setPlanExercisesElements(planExercisesJsx)
      }
      getPlanExercisesData()
   }, [0])

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

         return (
            <Plan.FoundExercise key={exercise.item.id} exercise={exercise} state={[explanExercises, setPlanExercises]} />
         )
      })
      setFoundExercises(exosJsx)
   }


   return (
      <planExercisesContext.Provider value={{ explanExercises, setPlanExercises }}>
         <div className='flex flex-col gap-2 border-2 border-gray-200 w-96 p-4 rounded-lg '>
            <h1 className='text-3xl font-bold'>{planName}</h1>
            {planExercisesElements}
            <Button onClick={toggleExercisesAddingList} primary={true}>Add Exercises</Button>
            {/*  // ! This is the Exercises Panel  */}
            {visibleExercisesAddingList &&
               <div className='fixed bg-black bg-opacity-30 top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
                  <div className=' w-5/6 h-5/6 bg-white p-6 pt-3 rounded-lg flex flex-col gap-2'>
                     <div className='w-full flex justify-end'>
                        <IconButton fill='white' bgcolor='red' onClick={toggleExercisesAddingList} >
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                        </IconButton>
                     </div>
                     <div className='stick top-0y w-full flex h-fit items-center justify-center  gap-2 pb-2'>
                        <input onChange={handleSearchInput} className='bg-graycolor shadow-inner shadow-gray-400 w-full h-9 rounded-lg p-2' type="text" />
                        <Button onClick={searchExercises} primary={true}>
                           Search
                        </Button>
                     </div>

                     <div className='flex-grow grid grid-cols-3 gap-3 overflow-y-scroll'>
                        {foundExercises}
                     </div>
                  </div>
               </div>}
         </div>
      </planExercisesContext.Provider>
   )
}