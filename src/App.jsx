import './App.css'
import './index.css'
import { Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom'
import { ExerciseInfosPage, Home, LoginPanel, PlanPage, WorkoutsPage } from './pages/index.jsx'
import { Header } from './Layout/index.jsx'
import Loader from './components/Loader.jsx'
import { exercisesPageLoader } from './pages/WorkoutsPage/WorkoutsPage.jsx'

const router = createBrowserRouter(createRoutesFromElements(
	<Route>
		<Route path='/' element={<>
			<Header />
			<Outlet />
		</>}>
			<Route index element={<Home />} />
			<Route path="exercises" loader={exercisesPageLoader} element={<WorkoutsPage />} />
			<Route path='exercises/exercise' element={<ExerciseInfosPage />} />
			<Route path="plan" element={<PlanPage />} />
		</Route >
		<Route path="/login" element={<LoginPanel />} />
	</Route>

))
function App() {
	return (
		<RouterProvider router={router} />
	)

}

export default App
