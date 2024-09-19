import React from "react"
import { useRef, useState } from 'react'
import backendSchema from "../../data/schema.json"
import { SelectMenu, Button } from "../../components/index.jsx"
import { ExerciseBigContainer } from "../../components/index.jsx"
import searchForExercises from '../../utils/searchForExercises.jsx'
import { Link, useLoaderData, useNavigation, useSearchParams } from 'react-router-dom'


export const exercisesLoader = async ({ request }) => {
	try {
		const url = new URL(request.url)
		const searchParams = url.searchParams.toString()
		console.log(`http://localhost:5000/api/v1/exercises?${searchParams}`)
		const res = await fetch(`http://localhost:5000/api/v1/exercises?${searchParams}`)
		const data = await res.json()
		if (!res.ok) {
			throw ('Fetch Failed Response is not OK')
		}
		const resultExercises = data.response
		const exercisesJsx = resultExercises.map(exercise => {
			return <ExerciseBigContainer key={exercise._id} props={{ ...exercise }} />
		})
		return exercisesJsx
	} catch (error) {
		return []
	}
}

export default function WorkoutsPage() {
	const [exos, setExos] = useState(useLoaderData())
	// Getting the list of available options inside each search-type toggle
	const primaryMusclesOptions = backendSchema.properties.primaryMuscles;
	const levelsOptions = backendSchema.properties.level;
	const forcesOptions = backendSchema.properties.force;
	const categoriesOptions = backendSchema.properties.category;
	const equipmentsOptions = backendSchema.properties.equipment;
	const [searchParameters, setSearchParameters] = useSearchParams()


	const searchParamsData = useRef({})

	function searchFunction(event) {
		const searchParametersData = searchParamsData.current
		setSearchParameters(searchParametersData)
		const exercises = searchForExercises(searchParametersData)
		//console.log(exercises);

		const exercisesJsx = exercises.map(exercise => {
			return <ExerciseBigContainer key={exercise.id} props={{ ...exercise }} />
		})
		setExos(exercisesJsx)

	}
	return (
		<div className='w-full flex flex-col items-center'>
			<div className='w-3/6 pt-8 flex flex-col gap-4'>
				<Link className='underline text-main underline-offset-8' to={`..`}>
					<p> Home </p>
				</Link>
				<div className='grid grid-cols-2 gap-2'>
					<SelectMenu
						placeholder={primaryMusclesOptions.name}
						name="primaryMuscles"
						optionsArray={primaryMusclesOptions.items.enum}
						searchParamsData={searchParamsData}
						text='sm'
					/>
					<SelectMenu
						placeholder={levelsOptions.name}
						name="level"
						optionsArray={levelsOptions.enum}
						searchParamsData={searchParamsData}
						text='sm'
					/>
					<SelectMenu
						placeholder={forcesOptions.name}
						name="force"
						optionsArray={forcesOptions.enum}
						searchParamsData={searchParamsData}
						text='sm'
					/>
					<SelectMenu
						placeholder={categoriesOptions.name}
						name="category"
						optionsArray={categoriesOptions.enum}
						searchParamsData={searchParamsData}
						text='sm'
					/>
					<SelectMenu
						placeholder={equipmentsOptions.name}
						name="equipment"
						optionsArray={equipmentsOptions.enum}
						searchParamsData={searchParamsData}
						text='sm'
					/>
				</div>
				<Button primary={true} width='full' onClick={searchFunction}>
					Search Exercises
				</Button>
			</div>


			<div className='grid  grid-cols-4 gap-4 p-8'>
				{exos}
			</div>
		</div>
	)
}