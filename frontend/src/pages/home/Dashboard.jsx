import { useEffect, useRef, useState } from "react"
import { Button } from "../../components/Button"
import { Card } from "../../components/Card"
import { AddContentModal } from "../../components/AddContentModal"
import { PlusIcon } from "../../assets/icons/PlusIcon"
import { ShareIcon } from "../../assets/icons/ShareIcon"
import { Sidebar } from "../../components/Sidebar"
import { ShareLinkModal } from "../../components/ShareLinkModal"
import { useContentTypeAtom } from "../../store/atoms/ContentTypeAtom"
import useGetContents from "../../hooks/useGetContents"
import useGetHash from "../../hooks/useGetHash"

export const Dashboard = () =>{
  const [addContentModalOpen, setAddContentModalOpen] = useState(false);
  const [shareLinkModalOpen, setShareLinkModalOpen] = useState(false);
  const {contents, getContents} = useGetContents();
  const shareLinkRef = useRef();
  const {contentType} = useContentTypeAtom();
  const {getHash} = useGetHash()

  useEffect(() => {
    getContents()
  }, [addContentModalOpen]);

  function openAddContentBox(){
    setAddContentModalOpen(true);
  }

  function openShareLinkBox(){
    setShareLinkModalOpen(true);
    getHash(shareLinkRef);
  }

  async function copyLinkToClipboard() {
    await navigator.clipboard.writeText(shareLinkRef.current.value);
  }

  return <div>
          {<Sidebar logoutVisible = {true}/>}
          <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
            <AddContentModal open={addContentModalOpen} onClose={() => {
              setAddContentModalOpen(false);
            }}/>
            <ShareLinkModal open = {shareLinkModalOpen} onClose={() => {
              setShareLinkModalOpen(false);
            }} shareLinkRef = {shareLinkRef} copyLinkToClipboard={copyLinkToClipboard}/>
            <div className="flex justify-end gap-4">
              <Button text={"Add Content"} variant={"primary"} startIcon={<PlusIcon />} onClick={openAddContentBox}/>
              <Button text={"Share Brain"} variant={"secondary"} startIcon={<ShareIcon />} onClick={openShareLinkBox}/>
            </div>
            {contentType === "all" && <div className={"flex gap-4 flex-wrap"}>
              {contents.map(({type, link, title, _id}) => <Card title={title} type={type} link={link} contentId = {_id} icons = {true}/>)
              }
            </div>}
            {contentType !== "all" && <div className={"flex gap-4 flex-wrap"}>
              {contents.filter(({type}) => type === contentType).map(({type, link, title, _id}) => <Card title={title} type={type} link={link} contentId = {_id} icons = {true}/>)
              }
            </div>}
          </div>
         </div>

}



/*
vidthalai utube card
<Card title={"Viduthalai 2 tailer"} type={"youtube"} link={"https://www.youtube.com/watch?v=HOxXrrwa_8o"}/>
*/