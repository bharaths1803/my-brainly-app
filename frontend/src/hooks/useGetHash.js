import toast from "react-hot-toast";

const useGetHash = () => {
  const getHash =  async(shareLinkRef) =>{
    try{
      const res = await fetch("/api/share", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
      })
      const data = await res.json();
      if(data.error){
        throw new Error(data.error)
      }
      else{
        shareLinkRef.current.value = `https://my-brainly-app.onrender.com/share/${data}`
      }
    }catch(error){
      toast.error(error.message)
    }
    
  }

  return {getHash};
}

export default useGetHash