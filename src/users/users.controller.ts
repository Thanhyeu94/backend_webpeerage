import { Request,Response } from "express";
import userService from "../users/users.service"
import { responseBadRequest, responseFobidden, responseSuccess } from "../../common/response";
class userController{
   async checkUnique(req:Request,res:Response){
       try {
           const {email} = req.body;
           if(!email){
            res.send(false)
           }
           const isUnique = await userService.checkUnique(email)
           res.send(isUnique);
       } catch (error) {
           console.log("err đây",error);
           res.send(false);
       }
    }
    async checkEmail(req:Request,res:Response){
        try {
            const {email} = req.body;
            if(!email){
                return res.send(responseBadRequest('invalid params'))
            }
            const isEmail = await userService.checkUnique(email)
            if(!isEmail){
                res.send(responseBadRequest("not email"))
            }
            res.send(email);
            console.log("email",isEmail)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    async profile(req:Request,res:Response){
        try {
            const authorizationString  = req.headers.authorization ;
            if(!authorizationString){
                res.send(responseFobidden("bạn k có quyền"))
            }
            res.send (responseSuccess(authorizationString))
            console.log("authorizationString: ",authorizationString)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}
export default new userController();