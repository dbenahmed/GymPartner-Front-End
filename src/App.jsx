import { useEffect, useRef, useState } from 'react'
import './App.css'
import backendSchema from "./data/schema.json"
import backendExercises from "./data/exercises.json"
import { SelectMenu as SelectMenu } from "./components/index.jsx"
import { ExerciseBigContainer as ExerciseBigContainer } from "./components/index.jsx"

function App() {
	const [exos, setExos] = useState([])
	// Getting the list of available options inside each search-type toggle
	const primaryMusclesOptions = backendSchema.properties.primaryMuscles;
	const levelsOptions = backendSchema.properties.level;
	const forcesOptions = backendSchema.properties.force;
	const categoriesOptions = backendSchema.properties.category;
	const equipmentsOptions = backendSchema.properties.equipment;

	const searchParams = useRef({
		primaryMuscles: undefined,
		level: undefined,
		force: undefined,
		category: undefined,
		equipment: undefined
	})

	function searchFunction(event) {
		// Getting the seach parameters that the user selected (including the undefined ones (that the user did not select))
		const searchParameters = searchParams.current
		// Filtering only the parameters that the user selected ( removing the undefined ones )
		const validSearchParams = Object.entries(searchParameters).filter(([key, value]) => value !== undefined).reduce((obj, [key, value]) => {
			obj[key] = value
			return obj
		}, {})
		// Turning the valid selected options into an Array ( it was an object before )
		const searchParametersArray = Object.entries(validSearchParams)

		// Starting to make the Exercises HTML based on the search parameters
		const exercisesJsx = backendExercises.map((exercise) => {
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
					<ExerciseBigContainer key={exercise.id} props={{ ...exercise }} />
				)
			} else {
				return null
			}
		})
		const validExercisesJsx = exercisesJsx.filter(value => value !== null)
		setExos(validExercisesJsx)
	}
	return (
		<div className='w-full flex flex-col items-center'>
			<div className='w-3/6 pt-8'>
				<div className='grid grid-cols-2 gap-2'>
					<SelectMenu
						placeholder={primaryMusclesOptions.name}
						name="primaryMuscles"
						optionsArray={primaryMusclesOptions.items.enum}
						searchParams={searchParams}
					/>
					<SelectMenu
						placeholder={levelsOptions.name}
						name="level"
						optionsArray={levelsOptions.enum}
						searchParams={searchParams}
					/>
					<SelectMenu
						placeholder={forcesOptions.name}
						name="force"
						optionsArray={forcesOptions.enum}
						searchParams={searchParams}
					/>
					<SelectMenu
						placeholder={categoriesOptions.name}
						name="category"
						optionsArray={categoriesOptions.enum}
						searchParams={searchParams}
					/>
					<SelectMenu
						placeholder={equipmentsOptions.name}
						name="equipment"
						optionsArray={equipmentsOptions.enum}
						searchParams={searchParams}
					/>
				</div>
				<button
					className='p-1 mt-2 text-sm border-2 border-black w-full'
					onClick={searchFunction}
				>Search</button>
			</div>


			<div className='grid  grid-cols-4 gap-4 p-8'>
				{exos}
			</div>
		</div>
	)
}

export default App
