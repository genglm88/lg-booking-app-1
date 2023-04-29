import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import axios from "axios"

const IndexPage = () => {
  const [places, setPlaces] = useState([])

  const lastTwoAddress = (address) => {
    const splitAddr = address.split(',')
    const leng = splitAddr.length
    return splitAddr[leng-2]+splitAddr[leng-1]
  }

  useEffect(() => {
    const fecthAllPlaces = async () => {
      try {
        const { data } = await axios.get("/places")
        setPlaces(data)
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllPlaces()
  }, [])
  return (
    <div className="mt-8 w-full gap-x-6 gap-y-8 grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/place/" + place._id}
            key={place._id}
            className="flex flex-col  cursor-pointer gap-8 bg-gray-200 p-4 rounded-2xl"
          >
            <div className="mt-2">
              {place.photos.length > 0 && (
                <img
                  className=" bg-gray-300 rounded-2xl object-cover aspect-square bg-gray-300"
                  src={place.photos[0]}
                  alt=""
                />
              )}
            </div>
            <div className="flex-[6]">
            <p className="text-sm font-bold">{lastTwoAddress(place.address)}</p>
              <h2 className="text-sm text-gray-500 leading-4">{place.title}</h2>
            
              <p className="text-sm font-bold">${place.price} per night</p>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default IndexPage
