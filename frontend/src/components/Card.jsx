import { DeleteIcon } from "../assets/icons/DeleteIcon";
import { ShareIcon } from "../assets/icons/ShareIcon"
import { TwitterIcon } from "../assets/icons/TwitterIcon";
import { YoutubeIcon } from "../assets/icons/YoutubeIcon";
import { useRef, useState } from "react";
import { ShareLinkModal } from "./ShareLinkModal";
import useDeleteContent from "../hooks/useDeleteContent";
import useGetContents from "../hooks/useGetContents";

export const Card = ({title, link, type, contentId, icons}) => {

  const [shareLinkModalOpen, setShareLinkModalOpen] = useState(false);
  const shareLinkRef = useRef();
  const {deleteContent, loading} = useDeleteContent()
  const {getContents} = useGetContents()

  async function copyLinkToClipboard() {
    await navigator.clipboard.writeText(shareLinkRef.current.value);
  }

  function openShareLinkBox(){
    setShareLinkModalOpen(true);
    setTimeout(() => {
      shareLinkRef.current.value = link;
    }, 100);
  }

  const iconsObject = {
    "Twitter": <TwitterIcon />,
    "Youtube": <YoutubeIcon />
  }

  const hoverActiveStyles = "hover:bg-gray-200 rounded transition-all duration-150 active:bg-gray-400 rounded transition-all duration-150"


  return <div>
    <ShareLinkModal open = {shareLinkModalOpen} onClose={() => {
    setShareLinkModalOpen(false)
    }} shareLinkRef = {shareLinkRef} copyLinkToClipboard={copyLinkToClipboard}/>
    <div className={"p-4 bg-white rounded-md outline-state-200 max-w-72 border border-gray-200 min-h-48 min-w-72"}>
      <div className={"flex justify-between"}>
        <div className={"flex items-center text-md"}>
          <div className={"pr-2 text-gray-500"}>
            {iconsObject[type]}
          </div>
          {title}
        </div>

        {icons && <div className={"flex items-center"}>
          <div className={"pr-2 text-gray-500 cursor-pointer " + hoverActiveStyles} onClick={openShareLinkBox}>
              <ShareIcon/ >
          </div>
          <div className={"text-gray-500 cursor-pointer " + hoverActiveStyles} onClick={() => {
            deleteContent(contentId)
            getContents()
          }}>
          {loading ? <span className='loading loading-spinner'></span> : <DeleteIcon />}
          </div>
        </div>}
      </div>
      <div className="pt-4">
        {type === "Twitter" && <blockquote className="twitter-tweet">
          <a href={link.replace("x.com", "twitter.com")}></a> 
        </blockquote>}
        {type === "Youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
      </div>
    </div>
  </div>
  

}