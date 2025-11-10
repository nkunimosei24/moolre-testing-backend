import express from 'express'
import cors from 'cors'
import connectDb from './config/connectdb.js'
const PORT = process.env.PORT || 3000
const app = express()
import transferRoute from './routes/TransferRoute.js'
import smsRoute from './routes/TransferRoute.js'
app.use(express.json())

app.use(
    cors({
        origin: 'http://localhost:5175',
        credentials: true
    })
)

app.use('/api/transfer', transferRoute )
app.use('/api/sms', smsRoute)

app.listen(PORT, () => {
    connectDb()
    console.log(`Server is listening on port ${PORT}`)
})