import { useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { refreshAccessToken } from './api/auth'

function App() {

  useEffect(() => {
    let token: any;
    const getAccessTokenOnLoad = async () => {
      token = await refreshAccessToken();
      token = token.access_token;
      console.log(token);
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
