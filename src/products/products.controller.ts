import { responseBadRequest, responseErrorInternal, responseNotFound, responseSuccess } from "../../common/response";
import { Request,Response } from "express";
import productService from "../products/products.service";

class productController{
    async listAllProduct(req:Request,res:Response){
        try {
            const listAllProduct = await productService.listAllProduct()
            console.log("list:", listAllProduct)
            if(listAllProduct===null){
                res.send(responseBadRequest("don't value!"))
            }
            return res.send(responseSuccess("success"))
        } catch (error:any) {
            return res.send(responseErrorInternal(error.message));
        }
    }
    async listFindProduct(req:Request,res:Response){
        try {
            const {name_product,name_color,name_Size,unitPrice,categories} = req.query
            if(!name_product && !name_color && !name_Size && !unitPrice && !categories) {
                res.send(responseBadRequest("not found param!"))
            }

        const listFindProduct = await productService.listFindProduct({
            productName:String(name_product),
            colorName:String(name_color),
            sizeName:String(name_Size),
            product_price:String(unitPrice),
            product_categories:String(categories)
        })
            console.log("lisF:", listFindProduct)
            if(listFindProduct===null){ 
              return res.send(responseBadRequest("don't value!")) 
            }
            return res.send(responseSuccess("success"))
        } catch (error:any) {
            return res.send(responseErrorInternal(error.message));
        }
    }
    async detailProduct(req:Request,res:Response){
        try {
            const {id} = req.query
            if(!id){
                res.send(responseBadRequest("not found param!"))
            }
            const detailProduct = await productService.detailProduct({
                id:Number(id),
            })
            console.log("list:", detailProduct)
            if(detailProduct===null){
                res.send(responseBadRequest("don't value!"))
            }
            return res.send(responseSuccess("success",Object(detailProduct)))
        } catch (error:any) {
            return res.send(responseErrorInternal(error.message));
        }
    }
    async productCart(req:Request,res:Response){
        try {
            const {id,size,color,quantity} = req.body
            if(!id||!color||!size||!quantity){
                if(quantity<=0){
                    res.send(responseBadRequest("Quantity <=0 ! "))
                }
                res.send(responseBadRequest("not found param!"))
            }
            const producCart = await productService.producCart({
                id:Number(id),
                size:size,
                color:color,
                quantity:quantity,
            })
            console.log("list:", producCart)
            if(producCart===null){
                res.send(responseBadRequest("don't value!"))
            }
            return res.send(responseSuccess("success",Object(producCart)))
        } catch (error:any) {
            return res.send(responseErrorInternal(error.message));
        }
    }
}
export default new productController();