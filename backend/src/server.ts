import { app } from "./app"

const PORT: number = 3333
const HOST = '0.0.0.0'

app.get("/", (req, res) => {
    res.send("Server running on Docker")
})

app.listen(PORT, HOST)

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })