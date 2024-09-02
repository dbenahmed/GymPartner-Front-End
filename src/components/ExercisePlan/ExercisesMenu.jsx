import { useContext, useRef, useState } from "react"
import { Button, IconButton, Input, ToggleBetweenOptions, Plan } from "../index"
import { planExercisesContext } from "./Plan"
import { v4 as uuidv4 } from 'uuid';
import { saveToLocalStorage } from "../../utils/localStorageUtils";



export default function ExerciseMenu(
   {
      toggleExerciseMenu,
      exercise,
      setVisibleExerciseMenu
   }
) {

   const planExos = useContext(planExercisesContext)
   const [weight, setWeight] = useState(undefined)
   const [unit, setUnit] = useState('kg')
   const [reps, setReps] = useState([])
   const sets = useRef(reps.length)

   function repsChange(value, index) {
      setReps(prev => {
         let newReps = prev.map(val => val)
         newReps[index] = value;
         return newReps
      })
   }
   function removeRep(index) {
      setReps(prev => {
         let newReps = prev.map(rep => rep)
         newReps.splice(index, 1)
         return newReps
      })
      sets.current = sets.current - 1;
   }
   function addReps() {
      setReps(prev => [
         ...prev,
         1
      ])
      sets.current = sets.current + 1
   }

   function addToPlan() {
      planExos.setPlanExercises(prev => {
         let prevData = JSON.parse(JSON.stringify(prev))
         prevData.exercises.push({
            id: `${uuidv4()}`,
            exerciseInfosDatabaseId: exercise.item.id,
            weight,
            unit,
            reps,
            sets: sets.current,
         })
         return prevData
      })
      setVisibleExerciseMenu(prev => !prev)
      // TODO : Fix This Save to Local Storage
      saveToLocalStorage(planExos.planExercises.username, planExos.planExercises)

   }

   return (
      <div className='fixed bg-black bg-opacity-20 bottom-0 top-0 left-0 right-0 flex items-center justify-center'>
         <div className='p-3 bg-graycolor rounded-lg flex flex-col gap-2 '>
            <IconButton width={`full`} color='red' onClick={toggleExerciseMenu} >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
            </IconButton>
            <div className='flex flex-col'>
               <label className='text-sm font-bold' htmlFor={`weight`}>Weight:</label>
               <div className="flex gap-1">
                  <Input width={`1/2`} onChange={setWeight} id={`weight`} />
                  <ToggleBetweenOptions width={`1/2`} onClick={setUnit} activeOption={unit} options={['kg', 'pound', 'test']} />
               </div>
               <label className='text-sm font-bold' htmlFor={`sets`}>reps:</label>
               <div className="flex gap-1 flex-col">
                  {
                     reps.map((rep, index) =>
                        <Plan.FoundExercise.ExerciseMenu.RepsInput onClick={removeRep} onChange={repsChange} className="primary-button" key={index} index={index} type="number" />
                     )
                  }
                  <Button primary={true} onClick={addReps} size={'xs'} width={'full'}>Add Rep</Button>
               </div>
            </div>
            <Button onClick={addToPlan} grow={true} primary={true}>
               Add Exercise
            </Button>
         </div>
      </div>
   )
}