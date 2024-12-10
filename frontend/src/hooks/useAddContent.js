import toast from "react-hot-toast";
const useAddContent = () => {
  const addContent = async(titleRef, linkRef, type, onClose) => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    try{
      const res = await fetch("/api/content/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({link, title, type}),
      })

      const data = await res.json();

      if(data.error){
        throw new Error(data.error)
      }
      }catch(error){
        toast.error(error.message)
      }
      onClose()
  }
      return {addContent}
}

export default useAddContent




