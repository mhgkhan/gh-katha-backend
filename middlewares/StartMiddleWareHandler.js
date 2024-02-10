import VisitorCollection from "../Models/VisitorCounter.js";
import crypto from 'crypto';



const SMH = async (req, res, next) => {
    const thisDate = new Date();
    const randomValue = crypto.randomBytes(110).toString("hex");  // this is for user that i identify this user is 

    let platForm;
    req.headers['sec-ch-ua-platform'] ? platForm = req.headers['sec-ch-ua-platform'] : "";

    try {
        const visitorColl = new VisitorCollection({
            url: req.url,
            date: thisDate.toLocaleDateString(),
            time: thisDate.toLocaleTimeString(),
            platform: platForm,
            userid: randomValue
        });

        await visitorColl.save();

        req.useridUnique = randomValue;
        return next();

    } catch (error) {
        return res.status(500).json({ error: "Server Error", message: JSON.stringify(error) })
    }

}
export default SMH;