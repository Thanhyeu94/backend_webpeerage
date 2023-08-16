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
const users_service_1 = __importDefault(require("../users/users.service"));
const response_1 = require("../../common/response");
class userController {
    checkUnique(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    res.send(false);
                }
                const isUnique = yield users_service_1.default.checkUnique(email);
                res.send(isUnique);
            }
            catch (error) {
                console.log("err đây", error);
                res.send(false);
            }
        });
    }
    checkEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    return res.send((0, response_1.responseBadRequest)('invalid params'));
                }
                const isEmail = yield users_service_1.default.checkUnique(email);
                if (!isEmail) {
                    res.send((0, response_1.responseBadRequest)("not email"));
                }
                res.send(email);
                console.log("email", isEmail);
            }
            catch (error) {
                console.log(error);
                res.send(error);
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorizationString = req.headers.authorization;
                if (!authorizationString) {
                    res.send((0, response_1.responseFobidden)("bạn k có quyền"));
                }
                res.send((0, response_1.responseSuccess)(authorizationString));
                console.log("authorizationString: ", authorizationString);
            }
            catch (error) {
                console.log(error);
                res.send(error);
            }
        });
    }
}
exports.default = new userController();
