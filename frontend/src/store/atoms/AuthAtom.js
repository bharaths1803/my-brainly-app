import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const AuthAtom = atom({
  key : 'auth',
  default : JSON.parse(localStorage.getItem("brain-user"))|| null
});

export const useAuthAtom = () => {
  const authUser = useRecoilValue(AuthAtom)
  const setAuthUser = useSetRecoilState(AuthAtom)
  return {authUser, setAuthUser}
}

