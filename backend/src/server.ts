import { app } from "./app"

const PORT: number = 3333

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})