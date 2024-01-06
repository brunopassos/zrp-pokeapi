import express, { Application } from "express"
import cors from "cors"
import { pokemonRoutes } from "./routers"

const app: Application = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors())
    next()
})

app.use("/", pokemonRoutes)

const PORT: number = 3333

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})