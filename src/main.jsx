import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { PlanPage, WorkoutsPage } from './pages/index.jsx'
import { Header } from './Layout/index.jsx'



createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<WorkoutsPage />} />
				<Route path="/plan" element={<PlanPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
