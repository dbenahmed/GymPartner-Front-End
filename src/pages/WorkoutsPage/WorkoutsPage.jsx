import {  useState } from 'react'
import backendSchema from "../../data/schema.json"
import { SelectMenu, Button } from "../../components/index.jsx"
import { ExerciseBigContainer } from "../../components/index.jsx"
import { Link, useLoaderData, useSearchParams } from 'react-router-dom'


export const exercisesLoader = async ({ request }) => {
	try {
		const url = new URL(request.url)
		const searchParams = url.searchParams.toString()
		if (searchParams === '') {
			return []
		}
		const res = await fetch(`http://localhost:5000/api/v1/exercises?${searchParams}`)
		const data = await res.json()
		if (!res.ok) {
			throw ('Fetch Failed Response is not OK')
		}
		const resultExercises = data.response
		return resultExercises
	} catch (error) {
		console.error(error)
		return []
	}
}

export default function WorkoutsPage() {

	const [exos, setExos] = useState(useLoaderData())

	const primaryMusclesOptions = backendSchema.properties.primaryMuscles;
	const levelsOptions = backendSchema.properties.level;
	const forcesOptions = backendSchema.properties.force;
	const categoriesOptions = backendSchema.properties.category;
	const equipmentsOptions = backendSchema.properties.equipment;
	const [searchParameters, setSearchParameters] = useSearchParams()

	function handleChange(event) {
		const value = event.target.value
		const name = event.target.name
		console.log(name, value)
		if (value === "undefined") {
			const newObj = Object.entries(searchParameters).filter((key) => key[0] !== name).reduce((prev, key) => { return { ...prev, [key[0]]: key[1] } }, {})
			console.log(newObj)
			setSearchParameters(newObj)
		} else {
			const prev = Object.fromEntries(searchParameters)
			setSearchParameters({
				...prev,
				[name]: value
			}
			)
		}
	}


	async function searchFunction(event) {
		try {
			const res = await fetch(`http://localhost:5000/api/v1/exercises?${searchParameters.toString()}`)
			const data = await res.json()
			if (!res.ok) {
				throw ('Fetch Failed Response is not OK')
			}
			const resultExercises = data.response
			setExos(resultExercises)
		} catch (error) {
			console.error(error)
		}
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
						onChange={handleChange}
						text='sm'
					/>
					<SelectMenu
						placeholder={levelsOptions.name}
						name="level"
						optionsArray={levelsOptions.enum}
						onChange={handleChange}
						text='sm'
					/>
					<SelectMenu
						placeholder={forcesOptions.name}
						name="force"
						optionsArray={forcesOptions.enum}
						onChange={handleChange}
						text='sm'
					/>
					<SelectMenu
						placeholder={categoriesOptions.name}
						name="category"
						optionsArray={categoriesOptions.enum}
						onChange={handleChange}
						text='sm'
					/>
					<SelectMenu
						placeholder={equipmentsOptions.name}
						name="equipment"
						optionsArray={equipmentsOptions.enum}
						onChange={handleChange}
						text='sm'
					/>
				</div>
				<Button primary={true} width='full' onClick={searchFunction}>
					Search Exercises
				</Button>
			</div>


			<div className='grid  grid-cols-4 gap-4 p-8'>
				{exos.map(exercise => {
					return <ExerciseBigContainer key={exercise._id} props={{ ...exercise }} />
				})}
			</div>
		</div>
	)
}