import express, { Application } from "express"
import cors from "cors"
import { pokemonRoutes } from "./routers"

export const app: Application = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors())
    next()
})

app.use("/api", pokemonRoutes)

