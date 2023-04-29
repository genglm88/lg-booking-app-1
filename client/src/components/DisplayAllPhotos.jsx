import React, { useState } from "react"
import  Slider  from "./Slider"

const DisplayAllPhotos = ({ place, setShowAllPics }) => {
    const [showSlider, setShowSlider] = useState(false)
    const [sliderNum, setSliderNum] = useState(0)
 
    const handleSlider= (index) =>{
        setShowSlider(true)
        setSliderNum(index)
    }
    
    if (!place) return

    if (showSlider) return (<Slider data = {place.photos} sliderNum={sliderNum} setShowSlider={setShowSlider}/>)

  return (
    <div className="mt-8 font-bold">
      <div className="flex gap-8 justify-between items-center">
        <h2 className="">{place.title}</h2>
        <button
          className="cursor-pointer sticky top-[20px]  flex gap-2 bg-gray-200 text-gray-800 px-4 py-1 rounded-lg shadow shadow-gray-900 "
          onClick={() => {
            setShowAllPics(false)
          }}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <span className="">Close</span>
        </button>
      </div>
      <div className="mt-2  grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
        {place.photos.length > 0 &&
          place.photos.map((photo, index) => {
            return (
              <img
                key={index}
                className=" bg-gray-100 rounded-lg object-cover aspect-square"
                src={ photo}
                alt=""
                onClick = {() => {
                    handleSlider(index)
                }}
              />
            )
          })}
      </div>
    </div>
  )
}

export default DisplayAllPhotos
