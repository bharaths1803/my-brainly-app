import { useRef, useState } from "react"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import useSignup from "../../hooks/useSignup";
import { Link } from "react-router-dom";


export const SignUp = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const {signup, loading} = useSignup();

  const handleSubmit = async() => {
    console.log("Called handle submit")
    await signup(usernameRef, passwordRef)
  }

  return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
    <div className="bg-white rounded-xl border min-w-48 p-8">
      <Input placeholder="Username" reference={usernameRef}/>
      <Input placeholder="Password" reference={passwordRef}/>
      <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
       </Link>
      <div className="flex justify-center pt-4">
        <Button variant="primary" text="Signup" fullWidth = {true} loading = {loading} onClick={handleSubmit}/>
      </div>
    </div>
  </div>
}
