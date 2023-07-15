import { Request,Response,NextFunction } from "express";
import { responseFobidden } from "../../common/response";
import authService from "./auth.service";

class AuthMiddleware {
    async jwtAccessToken (req:Request, res:Response, next:NextFunction) {
        try {
            const authorizeString = req.headers.authorization;
            if(!authorizeString) {
                // console.log("auth:",authorizeString);
                return res.send(responseFobidden("user do not allow to access this resource"));
            }
            const tmp = authorizeString?.split(' ');
            const decodeData = await authService.verifyToken(tmp?.[1])
            // console.log("decode", req);
            req.customers = decodeData;
            next();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
export default new AuthMiddleware();