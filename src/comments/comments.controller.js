"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../../common/response");
const comments_service_1 = __importDefault(require("./comments.service"));
class CommentsController {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { content } = req.body;
                if (!content) {
                    return res.send((0, response_1.responseBadRequest)('invalid params'));
                }
                const contentComment = yield comments_service_1.default.updateComment({
                    id: Number(req.params.id),
                    customers_id: Number(req.customers.id),
                    content: String(content),
                });
                if (contentComment === null) {
                    return res.send((0, response_1.responseNotFound)('not found comment'));
                }
                return res.send((0, response_1.responseSuccess)(contentComment));
            }
            catch (error) {
                return res.send((0, response_1.responseErrorInternal)(error.message));
            }
        });
    }
}
exports.default = new CommentsController();
