import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../context/UserContext"

const LoginPage = () => {
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  })

  const{setCurrentUser} = useContext(UserContext)

  const [err, setErr] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInputs((prev) => ({ ...prev, [name]: value }))
  }

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // const res = await axios.post("/login", userInputs)
      // setCurrentUser(res.data.email)
      const {data} =  await axios.post("/login", userInputs)
      setCurrentUser(data)
      navigate("/")
    } catch (err) {
      setErr(err)
      alert("Login failed.")
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={"your@email.com"}
            name="email"
            value={userInputs.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder={"password"}
            name="password"
            value={userInputs.password}
            onChange={handleChange}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            <span>Don't have an account yet? </span>
            <Link
              className="underline text-gray-500 ml-2 font-bold"
              to={"/register"}
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
