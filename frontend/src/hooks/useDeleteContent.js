import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteContent = () => {
   const [loading, setLoading] = useState(false);
   const deleteContent = async(contentId) => {
    console.log(contentId, "Is the content id in deleteing")
    try{
      setLoading(true)
      await fetch('/api/content', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          contentId
        })
      });
    }catch(error){
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }


  return {deleteContent, loading}
}

export default useDeleteContent;