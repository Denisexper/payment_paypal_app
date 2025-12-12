import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../config.js";

export const authRequired = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            msj: "token missing"
        })
    }

    try {
        
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({ msj: "Invalid token"})
    }

}  