import mongoose from "mongoose";

const connectToDb = async (arg) => {
    try {
        await mongoose.connect(`${arg}`);
        console.log(`DATABASE CONNECTED`)
    } catch (error) {
        return new Error("DATABASE CONNECTION ERROR : \N " + error)
    }
}

export default connectToDb;
