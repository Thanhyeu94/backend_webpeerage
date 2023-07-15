import { Request,Response, NextFunction } from "express";

class CommentMidleware{
    checkPermission (req:Request,res:Response,next:NextFunction){
        try {
            console.log("reqC:",req.customers);
            console.log("reqP: ",req.params);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
export default new CommentMidleware();