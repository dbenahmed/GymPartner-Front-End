import { useState } from "react"
import { Button, Input } from "../../components/index.jsx"





export default function LoginPanel() {

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   function handleChange(event) {
      event.target.name = 'email' ? setEmail(event.target.value) : setPassword(event.target.value)
   }
   function Submit() {

   }

   return (
      <div className="">
         <Input name='email' onChange={handleChange} />
         <Input name='password' onChange={handleChange} />
         <Button onClick={Submit}>Hello</Button>
      </div>
   )
}