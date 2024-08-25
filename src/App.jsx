import { useEffect, useState } from 'react'
import './App.css'
import backendSchema from "./data/schema.json"
import backendExercises from "./data/exercises.json"
import SelectMenu from "./components/SelectMenu"

function App() {

	// Getting the primaryMuscles Data into an Array
	const primMusclArray = backendSchema.properties.primaryMuscles;

	// Getting levels Data into an Array
	const levelsArray = backendSchema.properties.level;

	// Getting forces  Data into an Array
	const forcesArray = backendSchema.properties.force;

	// Getting categories Data into an Array
	const categoriesArray = backendSchema.properties.category;

	// Getting the Equipments Data into an Array
	const equipmentsArray = backendSchema.properties.equipment;

	const [searchParams, setSearchParams] = useState({
		primMuscle: undefined,
		level: undefined,
		force: undefined,
		category: undefined,
		equipment: undefined
	})

	const exercise = backendExercises[0]
	function handleClick(event) {
		const searchParams = {
			primMuscle: '',
			level: '',
			force: '',
			category: '',
			equipment: ''
		}
	}
	return (
		<div className='flex flex-col justify-center items-center h-full'>
			<div className='grid grid-cols-2 gap-2 w-3/6'>
				<SelectMenu
					placeholder={primMusclArray.name}
					name="equipment"
					optionsArray={primMusclArray.items.enum}
					searchParams={[searchParams, setSearchParams]}
				/>
				<SelectMenu
					placeholder={levelsArray.name}
					name="level"
					optionsArray={levelsArray.enum}
					searchParams={[searchParams, setSearchParams]}
				/>
				<SelectMenu
					placeholder={forcesArray.name}
					name="force"
					optionsArray={forcesArray.enum}
					searchParams={[searchParams, setSearchParams]}
				/>
				<SelectMenu
					placeholder={categoriesArray.name}
					name="category"
					optionsArray={categoriesArray.enum}
					searchParams={[searchParams, setSearchParams]}
				/>
				<SelectMenu
					placeholder={equipmentsArray.name}
					name="equipment"
					optionsArray={equipmentsArray.enum}
					searchParams={[searchParams, setSearchParams]}
				/>
			</div>
			<button
				className='p-1 mt-2 text-sm border-2 border-black w-3/6'
				onClick={handleClick}
			>Search</button>
			<div className='w-5/12 p-4 rounded-xl bg-slate-500 text-white'>
				<h1 className='text-3xl font-bold'>{exercise.name}</h1>
				<p className='text-lg'>{exercise.equipment}</p>
				<p className='text-lg'>{exercise.primaryMuscles}</p>
				<p className='text-sm'>{exercise.instructions}</p>
			</div>

		</div>
	)
}

export default App
