import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()
export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!currentUser) {
      axios.get("/profile").then(({ data }) => {
        setCurrentUser(data)
        setReady(true)
      })
    }
  }, [])

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, ready }}>
      {children}
    </UserContext.Provider>
  )
}
