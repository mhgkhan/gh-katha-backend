import mongoose from "mongoose";

const VsitorSchema = mongoose.Schema({
    url:String,
    date: String,
    time: String,
    platform: String,
    counter: Number,
    userid:String,
})

const VisitorCollection = mongoose.model("Visitor", VsitorSchema);
export default VisitorCollection;
