import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const UserContentTypeAtom = atom({
  key: 'UserContentType',
  default : "all"
})

export const useUserContentTypeAtom = () => {
  const userContentType = useRecoilValue(UserContentTypeAtom)
  const setUserContentType = useSetRecoilState(UserContentTypeAtom)
  return {userContentType, setUserContentType}
}