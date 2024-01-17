import ContactUsModel from "../Models/ContactusModel.js";
import { postDataValidation } from "../middlewares/utilityFunctions.js";

class ExtraRoutesHanlders {
    static handleContacts = async (req, res) => {
        try {
            // console.log(req.body)
            const { fullname, country, phone, email, message } = req.body;
            const checkValidation = postDataValidation([fullname, country, phone, email, message]);
            if (checkValidation) {
                // console.log(checkValidation)
                const addingData = new ContactUsModel({ ...req.body });
                try {
                    await addingData.save();
                    return res.status(201).json({ success: true, messagee: "Thanks for contactus " })
                } catch (error) {
                    return res.status(500).json({ success: false, message: "Some error occured try again later.." })
                }
            }
            else {
                return res.status(400).json({ success: false, message: "Invilid data please try to valid" })
            }

        } catch (error) {
            return res.status(500).json({ success: false, message: "Some Error Occured Try Again" })
        }
    }
}

export default ExtraRoutesHanlders