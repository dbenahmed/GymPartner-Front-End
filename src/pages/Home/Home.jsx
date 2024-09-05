import { Link } from "react-router-dom"
import { Button } from "../../components/index"

export default function Home() {
   return (
      <div className="w-full flex flex-col justify-center items-center gap-4 h-full">
         <p className="text-3xl font-medium ">
            Welcome to the Home Page
         </p>
         <div className="flex gap-2">
            <Link to='exercises'>
               <Button primary={true} >
                  Exercises Page
               </Button>
            </Link>
            <Link to='plan'>
               <Button primary={true}>
                  Plan Page
               </Button>
            </Link>
         </div>

      </div>
   )
}