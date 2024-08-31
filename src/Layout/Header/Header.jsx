import logo from '../../assets/images/logo.png'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export default function Header() {
   return (
      <div className="h-16 bg-white shadow-md flex items-center gap-2 justify-between pl-10 pr-10">
         <div className='flex items-center gap-2 h-full'>
            <div className="h-2/4">
               <img className='h-full' src={logo} alt="Logo" />
            </div>
            <p className="font-bold text-xl ububtu">GymPartner</p>
         </div>
         <nav className='font-medium flex gap-4 hover:'>
            <Link to='/'>
               <button className='hover:bg-whitecolor border-2 border-greycolor p-2 pl-4 pr-3 rounded-lg'>
                  Workouts Page
               </button></Link>
            <Link to='/plan'>
               <button className='hover:bg-whitecolor border-2 border-greycolor p-2 pl-4 pr-3 rounded-lg'>
                  Plan Page
               </button></Link>
         </nav>
      </div>
   )
}