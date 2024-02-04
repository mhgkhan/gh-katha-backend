import CKModel from "../../Models/CreateKathaModel.js";

class fetchShorts {

    static handleFetchUniqueAreas = async (req, res) => {
        const Areas = [];
        let userCnic;
        req.userCnic ? userCnic = req.userCnic : res.status(401).json({ success: false, message: "user is not authorized" })

        try {
            const fetchKathasByCnic = await CKModel.find({ author: userCnic }).select({ area: true });
            // console.log(fetchKathasByCnic)

            for (let i = 0; i < fetchKathasByCnic.length; i++) {
                const element = fetchKathasByCnic[i];
                if (Areas.includes(element.area.toLowerCase())) continue
                else Areas.push(element.area.toLowerCase());
            }

            // console.log(Areas)
            return res.status(200).json({ success: true, areas: Areas })

        } catch (error) {
            return res.status(500).json({ success: false, message: "Some error occured ..." })
        }

    }

}
export default fetchShorts;
