import { useState } from "react";
import { useAuthAtom } from "../store/atoms/AuthAtom";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthAtom()
  const  signup = async(usernameRef, passwordRef) => {
    console.log("Called signup")
    setLoading(true)
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const success = handleInputErrors({username, password})
    if(!success) return;
    
    try{
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
      })

      const data = await res.json();

      if(data.error){
        throw new Error(data.error)
      }

      localStorage.setItem("brain-user", JSON.stringify(data));
      setAuthUser(data);

    }catch(error){
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
   }
  return {loading, signup}
}


function handleInputErrors({username, password}){
  if(!username || !password){
    toast.error('Please fill in all fields')
    return false
  }

  if(password.length < 6){
    toast.error('Password must be atleast 6 characters')
    return false
  }

  return true;
}

export default useSignup;



