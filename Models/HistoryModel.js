import mongoose from "mongoose";


const historySchema = mongoose.Schema({

    products: {
        type: Array,
        required: true
    },
    products_total_money: {
        type: String,
        required: true
    },
    products_wasool_money: {
        type: String,
        required: true
    },
    products_bakya_money: {
        type: String,
        required: true
    },
    kathaId: String,
    author: String

}, {
    timestamps: true
})

const historyModel = mongoose.model("History", historySchema);
export default historyModel;