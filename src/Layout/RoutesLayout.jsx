import { Outlet } from "react-router-dom"
import {Header} from "../components/index"

export default function RoutesLayout() {


   return (
      <>
         <Header />
         <Outlet />
      </>
   )
}