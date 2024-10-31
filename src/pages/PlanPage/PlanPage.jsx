import { useEffect, useRef, useState } from 'react';
import { Loader, Plan } from '../../components/index.jsx'
import { Link, redirect, useLoaderData, useSearchParams } from 'react-router-dom';

export async function planPageLoader() {
   const tempId = '66ec1a771a2caa2699e8f507'
   const loggedIn = true;
   if (!loggedIn) {
      return redirect('/login?message=Please Log In')
   }
   return null
}

export default function PlanPage() {
   const userId = '6714309c5c46ed2fff4a290a'
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)
   const [plans, setPlans] = useState([])
   const data = useRef([])
   const [searchParams, setSeachParams] = useSearchParams()
   // GET ALL COLLECTIONS TO DISPLAY

   function updateActiveCollectionPlansJsx() {
      const activeCollectionId = searchParams.get('collection')
      let activeCollection = undefined
      if (!activeCollectionId) {
         activeCollection = data.current[0]
      } else {
         activeCollection = data.current.find(val => val._id === activeCollectionId)
      }
      if (activeCollection) {
         const activeCollectionPlanElements = activeCollection.plans.map(plan => {
            //< Plan key={plan._id} collectionId={activeCollection._id} plan={plan._id} planName={plan.planName} exercises={plan.planExercises} />
            return (
               < Plan key={plan._id} userId={userId} collectionId={activeCollection._id} planId={plan._id} planName={plan.planName} planExercisesArray={plan.planExercises} />
            )
         })
         return { success: true, response: activeCollectionPlanElements }
      }
      return { success: false }
   }

   // FETCH FROM BACKEND 
   const func = async () => {
      setLoading(true)
      const fetchUserCollectionsNamesAndExercises = async () => {
         try {
            const url = `http://localhost:5000/api/v1/users/${userId}/collections`
            const res = await fetch(url)
            const receivedData = await res.json()
            if (receivedData.success) {
               const responseData = receivedData.response.map((collection, index) => {
                  if (index === 0) { return { ...collection } } else { return { ...collection } }
               })
               data.current = responseData
            }
            return { success: true }
         } catch (e) {
            console.error(e)
            return { success: false, response: e }
         }

      }
      const fetchStatus = await fetchUserCollectionsNamesAndExercises()
      if (fetchStatus.success) {
         setLoading(false)
         const updatedActiveCollectionPlans = await updateActiveCollectionPlansJsx()
         if (!updatedActiveCollectionPlans.success) {
            console.error('error')
            setError('Error updatedActiveCollectionPlans')
         }
         setPlans(updatedActiveCollectionPlans.response)
      } else {
         console.error('error')
         setError('ERROR')
      }
   }
   useEffect(() => {
      func()
   }, [searchParams])

   /* useEffect(() => {
      // todo: to fix re-rendering when data.current changes 
      //console.log('dataC', data.current)
      const newPlans = updateActiveCollectionPlansJsx()
      if (!newPlans.success) {
         console.error('error')
         setError('ERROR')
      }
      setPlans(newPlans.response)
      //console.log('dataC', data.current)
   }, [0]) */



   const collectionsElements = data.current.map((collection, i) => {
      return (
         <Link key={i} className='underline text-main underline-offset-8' to={`?collection=${collection._id}`}>
            {
               collection.active ? <p className='text-blue-900'> {collection.name} </p> : <p> {collection.name} </p>
            }
         </Link>
      )
   })

   if (error) {
      return (
         <div>
            {error}
         </div>
      )
   }

   if (loading) {
      return (
         <Loader />
      )
   }
   return (
      <div className='p-10 flex flex-col gap-5'>
         <div className='flex gap-4'>
            {collectionsElements}
         </div>

         {/* < Plan key='6714309c5c46ed2fff4a290d' userId='6714309c5c46ed2fff4a290a' collectionId='6714309c5c46ed2fff4a290c' planId='6714309c5c46ed2fff4a290d' planName='newName' /> */}
         {plans}
      </div>
   )
}