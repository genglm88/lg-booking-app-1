import axios from "axios"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [err, setErr] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInputs((prev) => ({ ...prev, [name]: value }))
  }
  const navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault()

    try {
      await axios.post("/register", userInputs)
      navigate("/login")
    } catch (err) {
      setErr(err.response.data)
      alert("Registration failed. Please try again.")
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="your username"
            name="username"
            value={userInputs.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="your@email.com"
            name="email"
            value={userInputs.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={userInputs.password}
            onChange={handleChange}
          />
          {err && <p style={{ color: "red" }}>{err}</p>}

          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            <span>Already a member? </span>
            <Link
              className="underline text-gray-500 ml-2 font-bold"
              to={"/login"}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
