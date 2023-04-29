import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AccountNav from "../components/AccountNav"
import axios from "axios"

const PlacesPage = () => {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    // axios.get('/places').then(({data}) => {
    //   setPlaces(data)
    const fetchPlacesData = async () => {
      try {
        const { data } = await axios.get("/user-places")
        setPlaces(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchPlacesData()
  }, [])

  return (
    <div>
      <AccountNav />

      <div className="text-center mt-8">
        list of all added places
        <br />
        <Link
          className="inline-flex gap-1 bg-primary text-gray-50 py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4 flex flex-col-reverse gap-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/account/places/'+ place._id} key={place._id} className="flex  flex-col sm:flex-row cursor-pointer gap-8 bg-gray-200 p-4 rounded-2xl">
              <div className="mt-2">
                {place.photos.length > 0 &&
                  (<img
                  className=" bg-gray-300 rounded-2xl object-cover w-[180px] h-[180px] bg-gray-300"
                  src={ place.photos[0]}
                  alt=""
                />
                  )}
 
              </div>
              <div className="flex-[6]">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
                <p className="text-sm mt-2">{place.address}</p>
              
              </div>
            
            </Link>
          ))}
      </div>
    </div>
  )
}

export default PlacesPage
