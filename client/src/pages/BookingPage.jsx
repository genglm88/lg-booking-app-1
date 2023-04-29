import React, { useEffect, useState } from "react"
import AccountNav from "../components/AccountNav"
import { useParams } from "react-router-dom"
import axios from "axios"
import Address from "../components/Address"
import BookingWidget from "../components/BookingWidget"
import HeadlinePhotos from "../components/HeadlinePhotos"
import DisplayAllPhotos from "../components/DisplayAllPhotos"
import BookingDetails from "../components/BookingDetails"
import PlaceDesc from "../components/PlaceDesc"

const BookingPage = () => {
  const [booking, setBooking] = useState(null)
  const [showAllPics, setShowAllPics] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const { data } = await axios.get("/user-bookings")

        const foundBooking = data.find((booking) => booking._id === id)
        if (foundBooking) setBooking(foundBooking)
      } catch (err) {
        console.log(err)
      }
    }
    if (id) fetchAllBookings()
  }, [id])

  if (!booking) return
  const { place, checkIn, checkOut, numberOfGuests, name, mobile, price } =
    booking
  if (showAllPics) {
    return <DisplayAllPhotos place={place} setShowAllPics={setShowAllPics} />
  }

  return (
    <div>
      <AccountNav />

      <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8 rounded-2xl">
        <h1 className="text-xl font-semibold">{place.title}</h1>
        <Address>{place.address}</Address>

        <div className="bg-gray-200 flex flex-col sm:flex-row justify-between px-4 py-2 rounded-2xl my-2 ">
          <div>
            <h2 className="mb-1">Your Booking:</h2>
            <BookingDetails checkIn={checkIn} checkOut={checkOut} />
          </div>
          <div className="bg-primary w-32  text-gray-50 px-4 py-2 rounded-2xl mt-1 sm:mt-0">
            <h2>Total price</h2>
            <div>${price}</div>
          </div>
        </div>

        <HeadlinePhotos place={place} setShowAllPics={setShowAllPics} />
        {/* <BookingWidget place={place} /> */}
        <div className="mt-4 grid gap-8 grid-cols-1 md:grid-cols-[4fr_3fr]">
          <PlaceDesc place={place} />
          <div className="mt-4">
          <h2 className="font-semibold">Extra Info</h2>
          <div className="text-gray-600 text-sm ">{place.extraInfo}</div>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default BookingPage
