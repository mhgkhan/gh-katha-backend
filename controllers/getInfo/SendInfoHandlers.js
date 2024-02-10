import CKModel from "../../Models/CreateKathaModel.js";
import historyModel from "../../Models/HistoryModel.js";


class sendInfoHandlers {
    static getKathasHandler = async (req, res) => {
        try {
            let cnic;
            req.userCnic ? cnic = req.userCnic : res.status(401).json({ success: false, message: "User is not authorized" })

            const getUserKathas = await CKModel.find({ author: cnic });

            if (getUserKathas == "null" || getUserKathas == null) return res.status(400).json({ success: false, message: "No Katha here" })
            else return res.status(200).json({
                success: true,
                message: "Katha is here",
                kathas: getUserKathas
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }


    static getKathasHistory = async (req,res) =>{
        try {
            const kathaId = req.params.id;
            console.log(kathaId)

            // reading the history of the katha on this id (kathaId)
            
            const historyKathas = await historyModel.find({kathaId});
            // console.log(historyKathas)
            return res.status(200).json({success:true,historyKathas});

        } catch (error) {
            return res.status(500).json({success:false,message:"Internal Server Error please Try again later.."})
        }
    }

}

export default sendInfoHandlers