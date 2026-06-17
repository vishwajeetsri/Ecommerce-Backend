import mongoose from "mongoose"
import dns from "dns";

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
])

const dbConnect = async () => {

    mongoose.connection.on("connected", () => {
        console.log("Db Connected")
    });
   
   await mongoose.connect(`${process.env.MONGODB_URI}`)
}

export default dbConnect;