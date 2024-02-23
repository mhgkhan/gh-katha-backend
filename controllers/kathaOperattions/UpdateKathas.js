import CKModel from "../../Models/CreateKathaModel.js";

class UpdateKathas {
    static updateKatha = async (req, res) => {
        // console.log(req.body)
        try {
            let kathaId;
            req.params.kathaid ? kathaId = req.params.kathaid : res.status(400).json({ success: false, message: "Invilid Press" });

            // checking if katha is exists or not 
            const existsKatha = await CKModel.findOne({ _id: kathaId, author: req.userCnic });
            if (existsKatha && existsKatha !== null) {
                // updating katha info 

                const updatingKathaInfo = await CKModel.findOneAndUpdate({ author: req.userCnic, _id: kathaId }, {
                    $set: {
                        ...req.body
                    }
                })

                return res.status(200).json({
                    success: true,
                    message: "Katha has been updated..",
                    // dbResponse: updatingKathaInfo
                })

            }
            else {
                return res.status(400).json({ success: false, message: "katha of this credientials not found.." })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: "Internal Server Error Please Contact with Website Administrator" })
        }

    }
}

export default UpdateKathas