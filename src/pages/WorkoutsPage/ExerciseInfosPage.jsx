import { useLoaderData, useParams } from "react-router-dom";

export async function exerciseInfosPageLoader({ request }) {
   try {
      const res = await fetch("/src/data/exercises.json")
      console.log('fetched');
      console.log(res);
      if (res.ok) {
         const data = await res.json()
         return data
      }
   } catch (error) {
      console.log(error);
   }
}

export default function ExerciseInfosPage() {

   const params = useParams()
   const id = params.exercise

   const exercisesData = useLoaderData()

   const exercise = exercisesData.find((exo) => exo.id === id)

   const imagesSrc = exercise.images.map((img, index) => {
      return `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${img}`
   })



   return (
      <div className="flex flex-col items-center justify-center h-full mt-5">
         <div className="flex h-5/6 w-2/3 bg-gradient-to-tr from-blue-600 to-blue-200 p-6 rounded-lg border-2 border-gray-200 text-sm">

            <div>
               <h1 className="font-bold text-3xl">
                  {exercise.name}
               </h1>
               <p>
                  <span className="font-bold ">Category: </span>
                  {exercise.equipment}
               </p>
               <p>
                  <span className="font-bold ">Equipment: </span>
                  {exercise.category}
               </p>
               <p>
                  <span className="font-bold ">Force: </span>
                  {exercise.force}
               </p>
               <p>
                  <span className="font-bold ">level: </span>
                  {exercise.level}
               </p>
               <p>
                  <span className="font-bold ">Mechanic: </span>
                  {exercise.mechanic}
               </p>
               <p>
                  <span className="font-bold ">Primary Muscles: </span>
                  {exercise.primaryMuscles.map((muscle, index) => {
                     return (
                        <span key={index}>{muscle} </span>
                     )
                  })}
               </p>
               {
                  (exercise.secondaryMuscles.length !== 0) &&
                  <p>
                     <span className="font-bold ">Secondary Muscles: </span>
                     {exercise.secondaryMuscles.map(muscle => {
                        return (
                           <span key={muscle.index}>{muscle} </span>
                        )
                     })}
                  </p>
               }

               <div>
                  <p className="font-bold ">Instructions: </p>
                  {
                     exercise.instructions.map((inst, index) => {
                        return (
                           <p key={index} className="text-base">
                              <span className="font-bold">{index}. </span>{inst}
                           </p>
                        )
                     })
                  }
               </div>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
               {
                  imagesSrc.map((img, index) => {
                     return <img className="rounded-lg hover:cursor-pointer" key={index} src={img} alt={img} />
                  })
               }
            </div>
            <div>

            </div>
         </div>
      </div>

   )
}