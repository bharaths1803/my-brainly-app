import { Logo } from "../assets/icons/Logo"
import { TwitterIcon } from "../assets/icons/TwitterIcon"
import { YoutubeIcon } from "../assets/icons/YoutubeIcon"
import { Button } from "./Button"
import { SidebarItem } from "./SidebarItem"
import { AllIcon } from "../assets/icons/AllIcon"
import useLogout from "../hooks/useLogout"
import { useContentTypeAtom } from "../store/atoms/ContentTypeAtom"
import { useUserContentTypeAtom } from "../store/atoms/UserContentTypeAtom"

export const Sidebar = ({logoutVisible}) => {
  const {contentType, setContentType} = useContentTypeAtom()
  const {userContentType, setUserContentType} = useUserContentTypeAtom()

  const {logout, loading} = useLogout()

  const activeStyles = "bg-gray-400 rounded max-w-48 pl-4";

  return <div className="h-screen border-r w-72 bg-white fixed left-0 top-0 pl-6 flex flex-col justify-between">
    <div>
      <div className="flex text-2xl pt-8 items-center">
        <div className="pr-2 text-purple-600">
          <Logo/ >
        </div>
        Brainly
      </div>
      <div className="pt-8 pl-4">
          <SidebarItem isActive = {contentType === "all"} text={"Tweets and Vedios"} icon={<AllIcon />} onClick = {() => {
            setContentType("all")
            setUserContentType("all")
          }}/>
          <SidebarItem isActive = {contentType === "Twitter"} text={"Tweets"}  icon={<TwitterIcon />} onClick = {() => {
            setContentType("Twitter")
            setUserContentType("Twitter")
          }}/>
          <SidebarItem isActive = {contentType === "Youtube"} text={"Vedios"}  icon={<YoutubeIcon />} onClick = {() => {
            setContentType("Youtube")
            setUserContentType("Youtube")
          }}/>
      </div>
    </div>
    {logoutVisible && <div className="pt-8 pl-4 pb-4">
        <Button variant="primary" text="Logout" onClick={logout} loading={loading}/>
    </div>}
  </div>
}