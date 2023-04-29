import React, { useState } from "react"

const Slider = ({ data: photos, sliderNum, setShowSlider }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(sliderNum)

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex(
      (currentPhotoIndex - 1 + photos.length) % photos.length
    )
  }

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((currentPhotoIndex + 1) % photos.length)
  }
  console.log(currentPhotoIndex)
  return (
    <div className=" bg-gray-900 absolute inset-0 text-gray-50 h-screen">
      <div className="p-16 bg-gray-900 flex flex-col w-full">
        <div className=" flex justify-between">
          <div
            className="cursor-pointer flex gap-1 mb-4"
            onClick={() => setShowSlider(false)}
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

            <span>close</span>
          </div>
          <div className="text-gray-50">
            {currentPhotoIndex + 1}/{photos.length}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_20fr_1fr] h-full ">
          <button
            onClick={handlePreviousPhoto}
            className="bg-gray-900 flex items-center justify-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8  text-gray-900 bg-gray-50 rounded-full "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <div className="max-w-full">
            <img
              className=" block h-auto w-full  object-contain"
              src={
                photos[currentPhotoIndex]
              }
              alt="carousel"
            />
          </div>

          <button
            onClick={handleNextPhoto}
            className="bg-gray-900 flex items-center justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8  text-gray-900 bg-gray-50 rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Slider
