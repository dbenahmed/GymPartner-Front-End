import { fetchBackendExercises } from "./fetchBackend"

export default function searchForExercises(props) {

   const backendExercises = fetchBackendExercises()
   // Getting the seach parameters that the user selected (including the undefined ones (that the user did not select))
   const validSearchParams = props
   // Filtering only the parameters that the user selected ( removing the undefined ones )
   /* const validSearchParams = Object.entries(searchParameters).filter(([key, value]) => value !== undefined).reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
   }, {}) */
   // Turning the valid selected options into an Array ( it was an object before )
   const searchParametersArray = Object.entries(validSearchParams)
   // Starting to make the Exercises HTML based on the search parameters
   if (searchParametersArray.length !== 0) {
      const exercises = backendExercises.map((exercise) => {
         // Initializing a variable that help you check is an exercises is similar to the selected seach parameters

         // Checking inside the search parameters this Exercise if it suits the selected params
         // for Each parameter selected we check if it is inside the exercise data
         const similarsArray = searchParametersArray.map(([key, value]) => {
            // if the parameter data inside the exercise is inside an array
            // Example : if we try to check the primary muscles
            // there might be multiple primary muscles inside this exercise
            // if its an array then we check if the selected primary muscle in options is inside of the primMuscles inside the exercise data
            if (Array.isArray((exercise[key]))) {
               if ((exercise[key].find((element, index) => element === value)) !== undefined) {
                  //isSimilar = true;
                  return true
               } else return false
               // Else if it is not an array we just compare the values
            } else if (value === exercise[key]) {
               return true
            } else return false;
         });

         // we check if all the parameters are inside the exercise data ( the similarArray contain only true values )
         // If we found all the data similar
         const isSimilar = (similarsArray.find(value => value === false)) === undefined ? true : false;
         if (isSimilar) {
            return (
               exercise
            )
         } else {
            return null
         }
      })
      const validExercises = exercises.filter(value => value !== null)
      return validExercises
   }
}