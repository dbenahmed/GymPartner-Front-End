import './App.css'
import './index.css'
import { Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom'
import { ExerciseInfosPage, Home, LoginPanel, PlanPage, WorkoutsPage } from './pages/index.jsx'
import { RoutesLayout } from './Layout/index.jsx'
import { planPageLoader } from './pages/PlanPage/PlanPage.jsx'
import { loginLoader } from './pages/Login/LoginPanel.jsx'
import { exerciseInfosPageLoader } from './pages/WorkoutsPage/ExerciseInfosPage.jsx'
import Error from './components/Error.jsx'

const router = createBrowserRouter(createRoutesFromElements(
	<Route>
		<Route path='/' element={<RoutesLayout />}>
			<Route index element={<Home />} />
			<Route path="exercises" element={<WorkoutsPage />} />
			<Route path='exercises/:exercise' loader={exerciseInfosPageLoader} errorElement={<Error />} element={<ExerciseInfosPage />} />
			<Route path="login" loader={loginLoader} element={<LoginPanel />} />
			<Route path="plan" loader={planPageLoader} element={<PlanPage />} />

		</Route >

	</Route>

))
function App() {
	return (
		<RouterProvider router={router} />
	)

}

export default App
