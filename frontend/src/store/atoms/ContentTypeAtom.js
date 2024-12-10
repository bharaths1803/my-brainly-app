import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const ContentTypeAtom = atom({
  key: 'ContentType',
  default : "all"
})

export const useContentTypeAtom = () => {
  const contentType = useRecoilValue(ContentTypeAtom)
  const setContentType = useSetRecoilState(ContentTypeAtom)
  return {contentType, setContentType}
}