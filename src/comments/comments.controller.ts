import { responseBadRequest, responseErrorInternal, responseNotFound, responseSuccess } from "../../common/response";
import { Request,Response } from "express";
import commentsService from "./comments.service";
import commentService from "../comments/comments.service"

class CommentsController{
    async update(req:Request,res:Response){
        try {
            const {content} = req.body;
            if(!content){
                return res.send(responseBadRequest('invalid params'))
            }
            const contentComment = await commentsService.updateComment({
                id: Number(req.params.id),
                customers_id: Number(req.customers.id),
                content:String(content),
            });
            if(contentComment===null){
                return res.send(responseNotFound('not found comment'))
            }
            return res.send(responseSuccess(contentComment));
        } catch (error:any) {
            return res.send(responseErrorInternal(error.message));
        }
    }
}
export default new CommentsController();