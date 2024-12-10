import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetContents = () => {
  const [contents, setContents] = useState([]);

  const getContents =  async() =>{
    try{
      const res = await fetch(`/api/content/`);

      const data = await res.json();
      console.log("Contents returned is ", data)
      if(data.error){
        throw new Error(data.error)
      }
      setContents(data)
    }catch(error){
      console.log(error.message)
    }
  }

  useEffect(() => {
    getContents();
    const interval = setInterval(() => {
      getContents();
    }, 5 * 1000)

    return () => clearInterval(interval)
  }, [])

  return {contents, getContents};
}

export default useGetContents




