import mongoose from "mongoose";

const userAccountSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    cnic:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const UserAccountModel = mongoose.model("User Account", userAccountSchema);
export default UserAccountModel;