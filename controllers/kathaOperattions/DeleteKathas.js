import CKModel from "../../Models/CreateKathaModel.js";

class DeleteInKhatas {
    static delKatha = async (req, res) => {
        try {
            let kathaId;
            req.params.kathaid ? kathaId = req.params.kathaid : res.status(400).json({ success: false, message: "Invilid Press" });


            // checking if this khata is exits or not 
            try {
                const deleteIsExistsKatha = await CKModel.findOneAndDelete({ author: req.userCnic},{id:kathaId});
                // const deleteIsExistsKatha = await CKModel.findOne({author:req.user})
                // console.log(deleteIsExistsKatha)

                return res.status(200).json({
                    success: true, message: "Katha has been deleted..", dbresponse: deleteIsExistsKatha
                })

            } catch (error) {
                return res.status(500).json({ success: false, message: "Internal Server Error DelKatha#2Trycatch" })
            }






        } catch (error) {
            return res.status(500).json({
                success: true, message: "Internal Server Error DeLKATHAOpErations."
            })
        }
    }
}

export default DeleteInKhatas