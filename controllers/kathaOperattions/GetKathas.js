import CKModel from "../../Models/CreateKathaModel.js";
import netAmountModel from "../../Models/NetAmonts.js";


class GetKatha {

    static getKathaInfo = async (req, res) => {
        try {
            let userCnic;
            req.userCnic ? userCnic = req.userCnic : res.status(401).json({ success: false, message: "user is not authorized" });
            const kathaId = req.params.id;


            // fetching user katha information 
            const thisKatha = await CKModel.findOne({ _id: kathaId, author: userCnic });
            // console.log(thisKatha)
            // fetching the total sell of this katha 
            const fetchTotalAmounts = await netAmountModel.findOne({ kathaId: kathaId });
            if (fetchTotalAmounts == null || fetchTotalAmounts == "null") {
                return res.status(200).json({
                    success: true, message: "your katha is here",
                    info: thisKatha,
                    totalSell: 0,
                    bakya: 0
                })
            }
            else { }

            // console.log("the user id is : ", req.params.id)
            return res.status(200).json({
                success: true, message: "your katha is here",
                info: thisKatha,
                totalSell: fetchTotalAmounts == null ? 0 : fetchTotalAmounts.totalSell,
                totalBakya: fetchTotalAmounts == null ? 0 : fetchTotalAmounts.totalBakya
            })

        } catch (error) {
            return res.status(500).json({ success: true, message: "INTERNAL SERVER ERROR" })
        }
    }

}

export default GetKatha;