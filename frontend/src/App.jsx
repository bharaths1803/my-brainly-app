import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthAtom } from './store/atoms/AuthAtom.js'
import { Login } from './pages/login/Login.jsx';
import { Toaster } from 'react-hot-toast';
import { SignUp } from './pages/signup/SignUp.jsx';
import { Brain } from './pages/home/Brain.jsx';
import { Dashboard } from './pages/home/Dashboard.jsx';

function App() {
  const {authUser} = useAuthAtom();
  console.log("Auth User is", authUser)

  return <div>
    <Routes>
      <Route path='/' element = {authUser ? <Dashboard /> : <Navigate to="/login"/>} />
      <Route path='/login' element = {authUser ? <Navigate to="/"/> : <Login />} />
      <Route path='/signup' element = {authUser ? <Navigate to="/"/> : <SignUp />} />
      <Route path='/share/:hash' element = {<Brain />}/>
    </Routes>
    <Toaster />
    </div>
}

export default App
