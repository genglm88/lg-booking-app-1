import React, { useState } from "react"

import { Navigate } from "react-router-dom"
import BookingPanel from "./BookingPanel"
import PlaceDesc from "./PlaceDesc"

const BookingWidget = ({ place }) => {
  const [redirect, setRedirect] = useState("")

  if (redirect) return <Navigate to={redirect} />

  // const select = document.getElementById("number-guests");
  // console.log(select)
  // for (let i = 1; i <= place.maxGuests; i++) {
  //   const option = document.createElement("option");
  //   option.value = i;
  //   option.text = i;
  //   select.appendChild(option);
  // }

  return (
    <div>
      <div className="mt-4 grid gap-8 grid-cols-1 md:grid-cols-[4fr_3fr]">
        <PlaceDesc place={place} />
        <BookingPanel place={place} setRedirect={setRedirect} />
      </div>
      <div className="mt-4">
        <h2 className="font-semibold">Extra Info</h2>
        <div className="text-gray-600 text-sm ">{place.extraInfo}</div>
      </div>
    </div>
  )
}

export default BookingWidget
