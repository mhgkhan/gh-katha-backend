import mongoose from "mongoose";

const ContactusSchema = mongoose.Schema({
    fullname: {
        type: String,
        requried: true
    },
    country: {
        type: String,
        requried: true
    },
    phone: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        requried: true
    },
    message: {
        type: String,
        requried: true
    }
}, {
    timestamps: true
})

const ContactUsModel = mongoose.model("Contactus Message", ContactusSchema);
export default ContactUsModel;
