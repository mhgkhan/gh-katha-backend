import CKModel from "../../Models/CreateKathaModel.js";
import historyModel from "../../Models/HistoryModel.js";
import netAmountModel from "../../Models/NetAmonts.js";
import { postDataValidation } from "../../middlewares/utilityFunctions.js";

class KathasPostHandlers {
    static createKathaHandler = async (req, res) => {

        try {
            let checkCnic;

            req.userCnic ? checkCnic = req.userCnic : res.status(401).json({ success: false, message: "user is unauthorized" })

            const { fullname, father, cnic, area, address, phone } = req.body;

            const checkValidation = postDataValidation([fullname, father, cnic, area, address, phone]);

            if (checkValidation) {

                // checking if katha man cnic is already exists ornot 
                const checkExists = await CKModel.findOne({ cnic: cnic });
                if (checkExists == null || checkExists == "null" || checkExists == []) {
                    // save the customer data to databse

                    const savingKatha = new CKModel({
                        fullname,
                        fathername: father,
                        cnic,
                        area, address, phone,
                        author: checkCnic,
                        sellAmount: 0
                    })

                    try {
                        await savingKatha.save();
                        return res.status(201).json({ success: true, message: "Katha has been created .." })
                    } catch (error) {
                        console.log(error)
                        return res.status(500).json({ success: false, message: "Internal Server Error please try again later.." })
                    }

                }
                else return res.status(400).json({ success: false, message: "User of this cnic is already exists please try again on another cnic" })

            }
            else return res.status(400).json({ success: false, message: "Please enter valid data to save" })

        } catch (error) {
            return res.status(500).json({ success: false, message: "Some error occured please try again later.." })
        }

    }



    static addNewBill = async (req, res) => {
        try {

            // console.log(req.body);

            try {

                const { allBillData, total, wasool, netTotal, kathaid } = req.body
                // console.log(kathaid)

                // reading the netAmountModel user data
                const netAmount = await netAmountModel.findOne({ kathaId: kathaid });
                // console.log(netAmount)

                // reading the total sell form CKModel
                const authorDetails = await CKModel.findOne({ author: req.userCnic });
                // console.log(authorDetails)

                if (netAmount == null || netAmount == "null") {
                    const addedToNetAmount = new netAmountModel({
                        totalSell: total,
                        totalBakya: wasool >= total ? 0 : total - wasool,
                        kathaId: kathaid
                    });
                    await addedToNetAmount.save();
                }
                else {
                    // console.log("and the else option", netAmount)
                    const findAndUpdate = await netAmountModel.findOneAndUpdate({ kathaId: kathaid }, {
                        $set: { totalSell: netAmount.totalSell + total, totalBakya: netAmount.totalBakya + (total - wasool) }
                    })
                }



                const appendtoHistoryModel = new historyModel({
                    products: allBillData,
                    products_total_money: total,
                    products_wasool_money: wasool,
                    products_bakya_money: total - wasool,
                    kathaId: kathaid,
                    author:req.userCnic
                })
                await appendtoHistoryModel.save();

                return res.status(200).json({ success: true, message: "Created..." })

            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: "some error occured please try again later.." })
            }



        } catch (error) {
            return res.status(500).json({
                success: false, message: "Internal Server Error please try again later..."
            })
        }
    }







}



export default KathasPostHandlers;
