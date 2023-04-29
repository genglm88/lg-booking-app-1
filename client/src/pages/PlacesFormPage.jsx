import React, { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import PhotoUploader from "../components/PhotoUploader"
import Perks from "../components/Perks"
import AccountNav from "../components/AccountNav"

const PlacesFormPage = () => {
  const { id } = useParams()

  const [placeData, setPlaceData] = useState({
    title: "",
    address: "",
    addedPhotos: [],
    photoLink: "",
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: "16",
    checkOut: "12",
    maxGuests: "4",
    price:"20"
  })
  const {
    title,
    address,
    addedPhotos,
    photoLink,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = placeData

  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const fetchIdData = async () => {
      if (!id) return
      try {
        const { data } = await axios.get("/places/" + id)

        const { _id, owner, _v, photos, ...inputData } = data

        setPlaceData({ ...inputData, addedPhotos: photos, photoLink: "" })
      } catch (err) {
        console.log(err)
      }
    }

    fetchIdData()
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setPlaceData((prev) => {
      if (type === "checkbox") {
        if (checked) {
          return { ...prev, perks: [...perks, name] }
        } else {
          return { ...prev, perks: perks.filter((perk) => perk !== name) }
        }
      } else {
        return { ...prev, [name]: value }
      }
    })
  }

  const inputHeader = (text) => <h2 className="text-2xl mt-4">{text}</h2>
  const inputDescription = (text) => (
    <p className="text-gray-500 text-small">{text}</p>
  )
  const preInput = (header, description) => (
    <>
      {inputHeader(header)}
      {inputDescription(description)}
    </>
  )

  const savePlace = async (e) => {
    e.preventDefault()
    const { photoLink, ...sendData } = placeData

    if (id) {
      // update
      try {
        await axios.put("/places", { id, ...sendData })

        setRedirect(true)
      } catch (err) {
        console.log(err)
      }
    } else {
      //new place

      try {
        await axios.post("/places", sendData)

        setRedirect(true)
      } catch (err) {
        console.log(err)
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "Title for your place, should be short and catchy as inadvertisement"
        )}
        <input
          type="text"
          placeholder="title, for example: My lovely apt"
          name="title"
          value={title}
          onChange={handleChange}
        />

        {preInput("Address", "Address to this place")}
        <input
          type="text"
          placeholder="address"
          name="address"
          value={address}
          onChange={handleChange}
        />

        {preInput("Photos", "more = better")}
        <PhotoUploader
          setPlaceData={setPlaceData}
          addedPhotos={addedPhotos}
          photoLink={photoLink}
          handleChange={handleChange}
        />

        {preInput("Description", "description of the place")}
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
        />

        {preInput("Perks", "select all the perks")}
        <Perks selectedPerks={perks} handleClick={handleChange} />

        {preInput("Extra info", "house rules, etc")}
        <textarea name="extraInfo" value={extraInfo} onChange={handleChange} />

        {preInput(
          "Check in & out times, max guests",
          "add check-in and check-out times, remember to have some time window form clearning the room between guests"
        )}

        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="16:00"
              name="checkIn"
              value={checkIn}
              onChange={handleChange}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="12:00"
              name="checkOut"
              value={checkOut}
              onChange={handleChange}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              placeholder="2"
              name="maxGuests"
              value={maxGuests}
              onChange={handleChange}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              placeholder="100"
              name="price"
              value={price}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  )
}

export default PlacesFormPage
