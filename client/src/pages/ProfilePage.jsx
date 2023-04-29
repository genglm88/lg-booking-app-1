import React, { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios"
import PlacesPage from "./PlacesPage"
import AccountNav from "../components/AccountNav"

const ProfilePage = () => {
  const { setCurrentUser, currentUser, ready } = useContext(UserContext)
  const [loggedOut, setLoggedOut] = useState(false)

  let { subpage } = useParams()
  if (subpage === undefined) subpage = "profile"

  const logout = async () => {
    await axios.post("/logout")
    setCurrentUser(null)
    setLoggedOut(true)
  }

  if (!ready) return "Loading"

  if (!currentUser && !loggedOut) return <Navigate to={"/login"} />

  if (loggedOut) return <Navigate to={"/"} />

  return (
    <div>
      <AccountNav />

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto mt-8">
          Logged in as {currentUser.username} ({currentUser.email}) <br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  )
}

export default ProfilePage
