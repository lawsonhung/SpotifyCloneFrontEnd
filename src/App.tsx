import { useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { getToken } from './api/services/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from './features/token/tokenSlice'
import type { RootState } from './app/store'
import WebPlayback from './components/WebPlayback/WebPlayback'
import Login from './components/Login/Login'

function App() {

  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.token.value);

  useEffect(() => {

    console.log("token on load", token)

    async function getTokenOnLoad() {
      const token = await getToken();
      dispatch(setToken(token));
    }
    getTokenOnLoad();
  }, [])

  console.log("token from app", token);

  return (
    <>
      <NavBar />
      {(!token)
        ? < Login />
        : <WebPlayback />
      }
    </>
  )
}

export default App
