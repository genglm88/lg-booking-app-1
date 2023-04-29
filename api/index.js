const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./models/User.js")
const Place = require("./models/Place.js")
const cookieParser = require("cookie-parser")
const imageDownloader = require("image-downloader")
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")
const multer = require("multer")
const fs = require("fs")
const mime = require("mime-types")
const Booking = require("./models/Booking.js")

require("dotenv").config()
const app = express()

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = "mnjkhfhfngnjdsds" //random
const bucket = "lg-booking-app"

app.use(express.json())

app.use(cookieParser())
app.use("/uploadedPics", express.static(__dirname + "/uploads"))

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
)

const uploadToS3 = async (path, originalFilename, mimetype) => {
  const client = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  })
  const parts = originalFilename.split(".")
  const ext = parts[parts.length - 1]
  const newFilename = Date.now() + "." + ext

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  )
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`
}

app.get("/api/test", (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  res.json("test ok")
})

app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { username, email, password } = req.body
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." })
  const duplicate = await User.findOne({ email }).exec()
  if (duplicate) return res.sendStatus(409)
  try {
    const result = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(result)
  } catch (err) {
    res.status(422).json(err)
  }
})

app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { email, password } = req.body
  //console.log(email, password)
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." })
  const foundUser = await User.findOne({ email }).exec()

  if (!foundUser) return res.status(401) // unauthorized
  //evaluate password
  const match = bcrypt.compareSync(password, foundUser.password)
  if (match) {
    jwt.sign(
      { email: foundUser.email, id: foundUser._id },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err
        res.cookie("access_token", token).json(foundUser)
      }
    )
  } else {
    res.status(422).json("pass not ok")
  }
})

app.get("/api/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { access_token } = req.cookies
  if (access_token) {
    jwt.verify(access_token, jwtSecret, {}, async (err, userDataInToken) => {
      //userDataInToken has no user name
      if (err) throw err
      //const currentUserData =  await User.findById(userDataInToken.id)
      // const {password, ...userData} = currentUserData
      // res.json(userData)
      const { username, email, _id } = await User.findById(userDataInToken.id)
      res.json({ username, email, _id })
    })
  } else res.json("no token")
})

app.post("/api/logout", (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  res.cookie("access_token", "").json("logged out!")
})

//console.log({__dirname})
app.post("/api/upload-by-link", async (req, res) => {
  const { photoLink } = req.body
  const newName = "photo-" + Date.now() + ".jpg"
  await imageDownloader.image({
    url: photoLink,
    dest: "/tmp/" + newName,
  })
  const filename = "/tmp/" + newName
  const url = await uploadToS3(filename, newName, mime.lookup(filename))

  res.json(url)
})

const pictureMiddleware = multer({ dest: "/tmp" }) //file storage location
app.post(
  "/api/upload-local-files",
  pictureMiddleware.array("pics", 100), // max count 100
  async (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
      console.log(req.files[i])
      const { path, originalname, mimetype } = req.files[i]
      const url = await uploadToS3(path, originalname, mimetype)
      //console.log(url)
      uploadedFiles.push(url)
      // const parts = originalname.split(".")
      // const ext = parts[parts.length - 1]
      // const newPath = path + "." + ext
      // fs.renameSync(path, newPath)
      // //uploadedFiles = [...uploadedFiles, newPath.replace('uploads/', '')]
      // uploadedFiles.push(newPath.replace("uploads/", ""))
    }
    res.json(uploadedFiles)
  }
)

app.post("/api/places", (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { access_token } = req.cookies
  const {
    title,
    address,
    addedPhotos: photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body

  jwt.verify(access_token, jwtSecret, {}, async (err, userDataInToken) => {
    //userDataInToken has no user name
    if (err) throw err
    const placeDoc = await Place.create({
      owner: userDataInToken.id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    })
    res.json(placeDoc)
  })
})

app.get("/api/user-places", (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { access_token } = req.cookies
  jwt.verify(access_token, jwtSecret, {}, async (err, userDataInToken) => {
    if (err) throw err
    const { id } = userDataInToken
    res.json(await Place.find({ owner: id }))
  })
})

app.get("/api/places/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { id } = req.params
  res.json(await Place.findById(id))
})

app.put("/api/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { access_token } = req.cookies
  const {
    id,
    title,
    address,
    addedPhotos: photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body

  jwt.verify(access_token, jwtSecret, {}, async (err, userDataInToken) => {
    if (err) throw err
    const placeDoc = await Place.findById(id)
    if (userDataInToken.id === placeDoc.owner.toString()) {
      //placeDoc.owner is an objectId
      placeDoc.set({
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      })
      await placeDoc.save()
      res.json(placeDoc)
    }
  })
})

app.get("/api/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  res.json(await Place.find())
})

app.get("/api/place/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { id } = req.params
  res.json(await Place.findById(id))
})

app.post("/api/bookings", (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { access_token } = req.cookies
  if (!access_token)
    return res.status(400).json({ message: "Please login in." })
  const { place, checkIn, checkOut, numberOfGuests, name, mobile, price } =
    req.body
  jwt.verify(access_token, jwtSecret, {}, async (err, userDataInToken) => {
    if (err) throw err

    const bookingDoc = await Booking.create({
      owner: userDataInToken.id,
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      mobile,
      price,
    })
    res.json(bookingDoc)
  })
})

app.get("/api/user-bookings", (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { access_token } = req.cookies
  jwt.verify(access_token, jwtSecret, {}, async (err, userDataInToken) => {
    if (err) throw err
    const { id } = userDataInToken
    res.json(await Booking.find({ owner: id }).populate("place"))
  })
})

app.listen(4000)
