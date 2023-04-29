import React, { useState } from "react"
import { differenceInCalendarDays } from "date-fns"
import axios from "axios"

const BookingPanel = ({ place, setRedirect }) => {
  const [booking, setBooking] = useState({
    checkIn: "",
    checkOut: "",
    numberOfGuests: 1,
    name: "",
    mobile: "",
  })
  const [bookingError, setBookingError] = useState(false)

  const { checkIn, checkOut, numberOfGuests, name, mobile } = booking

  const handleChange = (e) => {
    const { name, value } = e.target
    setBooking((prev) => ({ ...prev, [name]: value }))
  }

  let numberOfNights = 0
  if (checkIn && checkOut)
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    )

  const handleBooking = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/bookings", {
        place: place._id,
        ...booking,
        price: place.price * numberOfNights,
      })
      const bookingId = data._id
      setRedirect(`/account/bookings/${bookingId}`)
    } catch (err) {
      setBookingError(true)
      alert("Please login in first.")
      setRedirect('/login')
    }
  }
  return (
    <div className="mt-8 flex flex-col items-center justify-around bg-gray-50 border rounded-xl shadow p-4 gap-2">
      <div className="flex gap-1">
        <h3 className="font-semibold">Price:</h3>${place.price}/per night
      </div>
      <div className="border border-1 border-gray-800  rounded-2xl grid grid-cols-2 grid-rows-2 w-full ">
        <div className="flex flex-col p-2  border-r border-gray-800 ">
          <label className="border-0 p-0 uppercase text-sm">Check-in:</label>
          <input
            type="date"
            name="checkIn"
            value={checkIn}
            className=""
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col p-2  border-gray-800 ">
          <label className="border-0 p-0 uppercase text-sm">Check-out:</label>
          <input
            type="date"
            name="checkOut"
            value={checkOut}
            className=""
            onChange={handleChange}
          />
        </div>
        <div className="flex text-sm col-span-2 items-center gap-2 border-t border-gray-800 ">
          <label for="number-guests" className="uppercase py-0 border-0">
            number of guests
          </label>
          <select
            id="number-guests"
            name="numberOfGuests"
            value={numberOfGuests}
            className="ml-auto mr-2"
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
        {numberOfNights > 0 && (
          <div className="flex text-sm col-span-2 w-full px-0 gap-4 flex-col ">
            <div className="flex col-span-2 w-full  gap-4  pr-2">
              <label className="uppercase w-full  py-0 border-0">
                Your full name
              </label>
              <input
                type="text"
                value={name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="flex col-span-2 w-full  gap-4 pr-2 mb-2">
              <label className="uppercase w-full  py-0 border-0">
                Your phone number
              </label>
              <input
                type="tel"
                value={mobile}
                name="mobile"
                onChange={handleChange}
              />
            </div>
          </div>
        )}
      </div>
      <button className="primary" onClick={handleBooking}>
        Book this place
      </button>
      {bookingError ? (
        <p className="text-red-600">Please login in first.</p>
      ) : (
        numberOfNights > 0 && <p>${numberOfNights * place.price}</p>
      )}
    </div>
  )
}

export default BookingPanel
