import mongoose from "mongoose"

const dbConnect = async () => {

    mongoose.connection.on("connected", () => {
        console.log("Db Connected")
    });
   
   await mongoose.connect(`${process.env.MONGODB_URI}`)
}

export default dbConnect;