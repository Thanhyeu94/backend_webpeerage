import { Request,Response, NextFunction } from "express";
import defineAbilityFor from "../users/users.ability";
import { responseFobidden } from "../../common/response";

class productsMiddleware{
   async checkPermission (req:Request,res:Response,next:NextFunction){
        try {
            console.log("req customers:",req.customers);
            console.log("reqComment: ",req.params.id);
            const ability = defineAbilityFor(req.customers);
            if(ability.can('addProduct', 'cart')){
                next();
            }
            else{
                return res.send(responseFobidden("user do not allow to access this resource")); 
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
export default new productsMiddleware();