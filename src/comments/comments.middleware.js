"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentMidleware {
    checkPermission(req, res, next) {
        try {
            console.log("reqC:", req.customers);
            console.log("reqP: ", req.params);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
exports.default = new CommentMidleware();
