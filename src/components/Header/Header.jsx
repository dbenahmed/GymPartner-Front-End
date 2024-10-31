import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'
import { Button } from '../../components/index.jsx'

export default function Header() {
   return (
      <div className="h-16 bg-white shadow-md flex items-center gap-2 justify-between pl-10 pr-10">
         <Link className='flex items-center gap-2 h-full' to={`/`}>
            <div className="h-2/4">
               <img className='h-full' src={logo} alt="Logo" />
            </div>
            <p className="font-bold text-xl ububtu">GymPartner</p>
         </Link>

         {/* <nav className='font-medium flex gap-4 hover:'>
            <Link to='exercises'>
               <Button secondary={true}>
                  Workouts Page
               </Button>
            </Link>
            <Link to='plan'>
               <Button secondary={true}>
                  Plan Page
               </Button>
            </Link>
         </nav> */}
      </div>
   )
}