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
const auth_service_1 = __importDefault(require("./auth.service"));
class AuthMiddleware {
    jwtAccessToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorizeString = req.headers.authorization;
                if (!authorizeString) {
                    // console.log("auth:",authorizeString);
                    return res.send((0, response_1.responseFobidden)("user do not allow to access this resource"));
                }
                const tmp = authorizeString === null || authorizeString === void 0 ? void 0 : authorizeString.split(' ');
                const decodeData = yield auth_service_1.default.verifyToken(tmp === null || tmp === void 0 ? void 0 : tmp[1]);
                // console.log("decode", req);
                req.customers = decodeData;
                next();
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.default = new AuthMiddleware();
