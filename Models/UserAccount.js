import mongoose from "mongoose";

const userAccountSchema = mongoose.Schema({
    username: String,
    cnic: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }, 
    fullname: String,
    phone: String,
    easypisanumber: String,
    jezzcash: String,
    email: String,
    businessname: String,
    businessaddress: String,
    image: String,
    description: String,
    verified: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})
const UserAccountModel = mongoose.model("User Account", userAccountSchema);
export default UserAccountModel;