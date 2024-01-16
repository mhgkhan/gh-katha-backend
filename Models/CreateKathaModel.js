import mongoose from 'mongoose';

const creteKathaModel = mongoose.model({
    cimage: String,
    ccnic: String,
    fullname: {
        type: String, required: true
    },
    fathername: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const CKModel = mongoose.model("customer Katha", creteKathaModel);
export default CKModel
