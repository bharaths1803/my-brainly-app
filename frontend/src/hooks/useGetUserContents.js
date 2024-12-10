import { useState } from "react";

const useGetUserContents = () => {
  const [userContents, setUserContents] = useState([]);
  const [brainUser, setBrainUser] = useState("");
  const getUserContents = async (hash) => {
    const res = await fetch(`/api/share/${hash}`)
    const data = await res.json()
    setUserContents(data.contents)
    console.log(data)
    setBrainUser(data.username)
  }
  return {userContents, getUserContents, brainUser};
}

export default useGetUserContents

