import React from "react"

const HeadlinePhotos = ({ place, setShowAllPics }) => {
  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-2 relative">
        {place.photos.length > 0 && (
          <img
            className="cursor-pointer bg-gray-100 rounded-2xl object-cover aspect-square"
            src={place.photos[0]}
            alt=""
            onClick={() => {
                setShowAllPics(true)
              }}
          />
        )}
        <div className="grid gap-2 grid-cols-2">
          {place.photos.length > 0 &&
            place.photos.map((photo, index) => {
              if (index > 0 && index < 5)
                return (
                  <img
                    key={index}
                    className="cursor-pointer bg-gray-100 rounded-2xl object-cover aspect-square"
                    src={ photo}
                    alt=""
                    onClick={() => {
                      setShowAllPics(true)
                    }}
                  />
                )
            })}
        </div>
      </div>
      <button
        onClick={() => {
          setShowAllPics(true)
        }}
        className="cursor-pointer flex gap-2 text-sm absolute bottom-2  right-4 text-gray-800 bg-gray-100 py-1 px-4 rounded-lg shaddow shadow-md shaddow-gray-500"
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
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
        <span>Show all photos</span>
      </button>
    </div>
  )
}

export default HeadlinePhotos
