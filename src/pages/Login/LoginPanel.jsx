import { useState } from "react"
import { Button, Input } from "../../components/index.jsx"
import { useLoaderData } from "react-router-dom";



export function loginLoader({ request }) {
   const url = new URL(request.url)
   const message = url.searchParams.get('message')
   console.log(message);
   return message
}

export default function LoginPanel() {
   const message = useLoaderData()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   function handleChange(event) {
      event.target.name = 'email' ? setEmail(event.target.value) : setPassword(event.target.value)
   }
   function Submit() {

   }

   return (
      <div className="">
         {
            message && <p>Please Log In</p>
         }
         <Input name='email' onChange={handleChange} />
         <Input name='password' onChange={handleChange} />
         <Button onClick={Submit}>Hello</Button>
      </div>
   )
}