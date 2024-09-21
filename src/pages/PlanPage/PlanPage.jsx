import { useEffect, useRef, useState } from 'react';
import { Plan } from '../../components/index.jsx'
import { Link, redirect } from 'react-router-dom';

export async function planPageLoader() {
   const loggedIn = true;
   if (!loggedIn) {
      return redirect('/login?message=Please Log In')
   }
   return null
}

export default function PlanPage() {
   return (
      <div className='p-10 flex flex-col gap-4'>
         <Link className='underline text-main underline-offset-8' to={`..`}>
            <p> Home </p>
         </Link>

         <Plan />
      </div>
   )
}