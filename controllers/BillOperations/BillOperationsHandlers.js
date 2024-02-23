import { response } from "express";
import CKModel from "../../Models/CreateKathaModel.js";
import historyModel from "../../Models/HistoryModel.js";
import UserAccountModel from "../../Models/UserAccount.js";

class BillOperations {
    static openBill = async (req, res) => {
        try {
            // return res.status(200).json({success:true,message:"Hello"})
            let billId;
            req.params.billid ? billId = req.params.billid : res.status(400).json({
                success: false, message: "Bill Not Found."
            })

            // fetching this bill data from kathahistory model 
            const billInfo = await historyModel.findOne({ author: req.userCnic, _id: billId });
            if (billInfo && billInfo !== null) {
                // fetching Bill katha 
                const billAuthor = await CKModel.findOne({ author: req.userCnic, _id: billInfo.kathaId })
                if (billAuthor && billAuthor !== null) {
                    // fetching the katha author of this katha 
                    const kathaAuthor = await UserAccountModel.findOne({ cnic: req.userCnic });
                    if (kathaAuthor && kathaAuthor !== null) {
                        return res.status(200).json({
                            success: true,
                            billData: billInfo,
                            kathaInfo: billAuthor,
                            kathaAuthorInfo: kathaAuthor
                        })
                    }
                    else {
                        return res.status(400).json({ success: false, message: "BILL AND KATHA FOUND BUT USER IS NOT FOUND .. {SOM WENT WRONG}" })
                    }
                }
                else {
                    return res.status(400).json({ success: false, message: "Bill found but katha of this bill are not found {SOME WENT WRONG}" })
                }
            }
            else {
                return res.status(400).json({
                    success: false, message: "No bill found."
                })
            }




            return res.status(200).json({ success: true, message: req.userCnic })




        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Some Error occured .." })
        }
    }
}

export default BillOperations