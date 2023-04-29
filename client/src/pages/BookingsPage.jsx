import React, { useEffect, useState } from "react"
import AccountNav from "../components/AccountNav"
import axios from "axios"
import { Link } from "react-router-dom"

import BookingDetails from "../components/BookingDetails"

const BookingsPage = () => {
  const [bookings, setBookings] = useState("")
  useEffect(() => {
    const getUserBookings = async () => {
      try {
        const { data } = await axios.get("/user-bookings")
        setBookings(data)
      } catch (err) {
        console.log(err)
      }
    }
    getUserBookings()
  }, [])

  return (
    <div>
      <AccountNav />
      <div className="flex flex-col gap-4 mt-8 rounded-2xl overflow-hidden">
        {bookings?.length > 0 &&
          bookings.map((booking, index) => {
            const {
              place,
              checkIn,
              checkOut,
              numberOfGuests,
              name,
              mobile,
              price,
            } = booking
            return (
              <div
                key={index}
                className="flex gap-4 bg-gray-100 flex-col sm:flex-row"
              >
                <Link
                  to={`/account/bookings/${booking._id}`}
                  className="flex-[2] cursor-pointer"
                >
                  <img
                    src={
                      place.photos[0]
                    }
                    className="w-48 h-48 object-cover rounded-2xl"
                  />
                </Link>
                <div className="py-3 flex-[5]">
                  <h2 className="font-bold text-gray-500 leading-1">
                    {place.title}
                  </h2>
                  <p className="text-sm mb-2">{place.address}</p>

                  <BookingDetails checkIn={checkIn} checkOut={checkOut} />

                  <div className="mt-1 flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    Total Price: ${price}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default BookingsPage
