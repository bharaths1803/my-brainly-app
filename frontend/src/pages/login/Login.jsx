import { useRef, useState } from "react"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import useLogin from "../../hooks/useLogin";
import { Link } from "react-router-dom";


export const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const {login, loading} = useLogin();

  const handleSubmit = async() => {
    console.log("Called handle submit")
    await login(usernameRef, passwordRef)
  }

  return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
    <div className="bg-white rounded-xl border min-w-48 p-8">
      <Input placeholder="Username" reference={usernameRef}/>
      <Input placeholder="Password" reference={passwordRef}/>
      <Link to='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            {"Don't"} have an account?
       </Link>
      <div className="flex justify-center pt-4">
        <Button variant="primary" text="Login" fullWidth = {true} loading = {loading} onClick={handleSubmit}/>
      </div>
    </div>
  </div>
}
