import { useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { refreshAccessToken } from './api/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from './features/token/tokenSlice'
import type { RootState } from './app/store'

function App() {

  const token = useSelector((state: RootState) => state.token.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAccessTokenOnLoad = async () => {
      const tokenRes: any = await refreshAccessToken();
      console.log(tokenRes);
      dispatch(setToken(tokenRes.access_token));
    }
    getAccessTokenOnLoad();
  }, [])

  return (
    <>
      <NavBar />
    </>
  )
}

export default App
