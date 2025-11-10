import mongoose from 'mongoose'

const URI = process.env.MONGO_URI

const connectDb = () => {
    mongoose 
    .connect(URI)
    .then(() => {
        console.log(`Mongoose connected successfully`)
    }).catch((err) => console.log(err))
}

export default connectDb

