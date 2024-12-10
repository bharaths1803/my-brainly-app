import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js"
import contentRoutes from "./routes/content.routes.js"
import shareRoutes from "./routes/share.routes.js"
import cookieParser from "cookie-parser";
import path from "path";


const app = express()

app.use(express.json())
app.use(cookieParser())

dotenv.config()

const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use("/api/auth", authRoutes)
app.use("/api/content", contentRoutes)
app.use("/api/share", shareRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  connectToMongoDB();
})


