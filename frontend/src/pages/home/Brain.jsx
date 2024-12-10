import { useParams } from "react-router-dom"
import { Sidebar } from "../../components/Sidebar";
import { Card } from "../../components/Card";
import { useEffect } from "react";
import { useUserContentTypeAtom } from "../../store/atoms/UserContentTypeAtom";
import useGetContents from "../../hooks/useGetContents";
import useGetUserContents from "../../hooks/useGetUserContents";

export const Brain = () => {
  const params = useParams();
  const hash = params.hash
  const {contents} = useGetContents();
  const {userContentType} = useUserContentTypeAtom();
  const {userContents, getUserContents, brainUser} = useGetUserContents()

  useEffect(() => {
    console.log("Inside use effect")
    getUserContents(hash)
  }, [contents]);

  return <div>
          <Sidebar logoutVisible = {false} />
          <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
            <div className="text-2xl">
              {brainUser}'s Brain
            </div>
            {userContentType === "all" && <div className={"flex gap-4 flex-wrap"}>
              {userContents.map(({type, link, title, _id}) => <Card title={title} type={type} link={link} contentId = {_id} icons = {false}/>)
              }
            </div>}
            {userContentType !== "all" && <div className={"flex gap-4 flex-wrap"}>
              {userContents.filter(({type}) => type === userContentType).map(({type, link, title, _id}) => <Card title={title} type={type} link={link} contentId = {_id} icons = {false}/>)
              }
            </div>}
          </div>
         </div>
}