import React from 'react'

const PlaceDesc = ({place}) => {
  return (
    <div className="flex flex-col">
          <div className="mt-4 mb-4">
            <h2 className="font-semibold">Description</h2>
            <div className="text-gray-600 text-sm">{place.description}</div>
          </div>
          <div className="flex gap-1 items-center">
            <h3 className="font-semibold">Check in time:</h3>
            {place.checkIn}
          </div>
          <div className="flex gap-1 items-center">
            <h3 className="font-semibold">Check out time:</h3>
            {place.checkOut}
          </div>
          <div className="flex gap-1 items-center">
            <h3 className="font-semibold">Max guests:</h3>
            {place.maxGuests}
          </div>
        </div>
  )
}

export default PlaceDesc