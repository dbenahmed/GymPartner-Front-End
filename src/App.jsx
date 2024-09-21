import './App.css'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { ExerciseInfosPage, Home, LoginPanel, PlanPage, WorkoutsPage } from './pages/index.jsx'
import { RoutesLayout } from './Layout/index.jsx'
import { Error } from './components/index.jsx'
import { loginLoader } from './pages/Login/LoginPanel.jsx'
import { exerciseInfosPageLoader } from './pages/WorkoutsPage/ExerciseInfosPage.jsx'
import { planPageLoader } from './pages/PlanPage/PlanPage.jsx'
import { exercisesLoader } from './pages/WorkoutsPage/WorkoutsPage.jsx'

const router = createBrowserRouter(createRoutesFromElements(
    < Route>
        <Route path='/' element={<RoutesLayout />}>
            <Route index element={<Home />} />
            <Route loader={exercisesLoader} path="exercises" element={<WorkoutsPage />} />
            <Route path='exercises/:exercise' loader={exerciseInfosPageLoader} errorElement={<Error />}
                element={<ExerciseInfosPage />} />
            <Route path="login" loader={loginLoader} element={<LoginPanel />} />
            <Route path="plan" loader={planPageLoader} element={<PlanPage />} />
        </Route>

    </Route>
))

function App() {

    return (
        <RouterProvider router={router} />
    )

}

export default App
