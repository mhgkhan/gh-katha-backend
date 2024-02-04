import mongoose from "mongoose";

const netAmountSchema = mongoose.Schema({
    totalSell: Number,
    totalBakya: Number,
    kathaId: String,
    
}, {
    timestamps: true
})

const netAmountModel = mongoose.model("Net Amount", netAmountSchema);
export default netAmountModel;
