import AllRoutes from './AllRoutes'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";

function App() {
  const gettoken = sessionStorage.getItem("token")

  useEffect(() => {
    if (!gettoken) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      logoutHere()
    }
  }, [])

  const logoutHere = async () => {
    try {
      let url = import.meta.env.VITE_APP_BASEURL + "adminusers/logout"
      const token = localStorage.getItem("token")
      if (token) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        const result = await response.json();
        if (result.status === 1) {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <ToastContainer />
      <AllRoutes />
    </>
  )
}

export default App
