import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingWidget from "../components/BookingWidget"
import DisplayAllPhotos from "../components/DisplayAllPhotos"
import HeadlinePhotos from "../components/HeadlinePhotos"
import Address from "../components/Address"
//import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined"

const PlacePage = () => {
  const [place, setPlace] = useState(null)
  const [showAllPics, setShowAllPics] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const fetchOnePlace = async () => {
      if (!id) return
      try {
        const { data } = await axios.get("/place/" + id)

        setPlace(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchOnePlace()
  }, [id])

  if (!place) return

  if (showAllPics) {
    return <DisplayAllPhotos place={place} setShowAllPics={setShowAllPics} />
  }

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-xl font-semibold">{place.title}</h1>
      <Address>{place.address}</Address>

      <HeadlinePhotos place={place} setShowAllPics={setShowAllPics} />
      <BookingWidget place={place} />
    </div>
  )
}

export default PlacePage
