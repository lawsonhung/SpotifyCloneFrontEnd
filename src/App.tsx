import { useEffect } from 'react'
import './App.css'
import { getToken } from './api/services/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from './features/token/tokenSlice'
import type { RootState } from './app/store'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

function App() {

  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.token.value);

  useEffect(() => {

    async function getTokenOnLoad() {
      const token = await getToken();
      dispatch(setToken(token));
    }
    getTokenOnLoad();
  }, [])

  return (
    <>
      {(!token)
        ? <Login />
        : <Home />
      }
    </>
  )
}

export default App
