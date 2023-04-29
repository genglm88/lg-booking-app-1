import React from "react"
import Header from "./Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="py-4 px-12 flex flex-col min-h-screen w-full max-w-6xl ">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
