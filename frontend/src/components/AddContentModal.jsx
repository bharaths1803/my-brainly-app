import { useRef, useState } from "react";
import { CrossIcon } from "../assets/icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import useAddContent from "../hooks/useAddContent";


export const AddContentModal = ({open, onClose}) => {
  const titleRef = useRef();
  const linkRef = useRef();
  const [type, setType] = useState("Youtube");
  const {addContent} = useAddContent()

  return <div>
    {open && 
    <div>

      <div className="w-screen h-screen bg-slate-600 fixed top-0 left-0 opacity-60 flex justify-center">
      </div>

      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
      <div className="flex items-center">
        <span className="bg-white opacity-100 p-4 rounded">
          <div className="flex justify-end">
            <div onClick={onClose} className="cursor-pointer hover:bg-gray-200 rounded transition-all duration-150 active:bg-gray-400 rounded transition-all duration-150">
              <CrossIcon />
            </div>
          </div>
          <div>
            <div>
              <Input placeholder = {"Title"} reference={titleRef}/>
              <Input placeholder = {"Link"} reference={linkRef}/>
            </div>
            <div>
              <h1>Type</h1>
              <div  className="flex gap-1 p-4">
                <Button text="Youtube" variant={type === "Youtube" ? "primary": "secondary"} onClick={() => {
                  setType("Youtube")
                }}></Button>
                <Button text="Twitter" variant={type === "Twitter" ? "primary": "secondary"} onClick={() => {
                  setType("Twitter")
              }}></Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Button text="Submit" variant="primary" onClick={() => {addContent(titleRef, linkRef, type, onClose)}}/>
            </div>
          </div>
        </span>
      </div>
      </div>

    </div>}

  </div>
}


