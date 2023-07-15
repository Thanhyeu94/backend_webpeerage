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
const users_service_1 = __importDefault(require("../users/users.service"));
const auth_service_1 = __importDefault(require("./auth.service"));
const crypto_1 = __importDefault(require("crypto"));
class authController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, phone, email, password } = req.body;
                if (!name || !phone || !email || !password) {
                    return res.send((0, response_1.responseBadRequest)('invalid params'));
                }
                const checkEmail = yield users_service_1.default.checkUnique(email);
                if (checkEmail) {
                    return res.send((0, response_1.responseBadRequest)('email already exists'));
                }
                const secret = process.env.HASHING_KEY;
                if (!secret) {
                    return res.send((0, response_1.responseNotFound)());
                }
                const hashpass = crypto_1.default.createHmac("sha256", secret || '').update(password).digest('hex');
                const verifiedToken = yield auth_service_1.default.genVerifiedTocken({ email, phone });
                if (verifiedToken == '') {
                    return res.send((0, response_1.responseErrorInternal)());
                }
                const link = `http://localhost:3000/api/v1/auth/verify?email=${email}&token=${verifiedToken}`;
                console.log(link);
                const customer = yield users_service_1.default.insert({
                    email: email,
                    phone: phone,
                    password: hashpass,
                    name: name,
                    vetify_token: String(verifiedToken),
                    status_token: false,
                });
                yield auth_service_1.default.sendMail(email, link);
                return res.send((0, response_1.responseSuccess)(customer));
            }
            catch (err) {
                return res.send((0, response_1.responseErrorInternal)(err.message));
            }
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, token } = req.query;
                console.log("req: ", req.query);
                const customer = yield users_service_1.default.findOne({
                    email: String(email),
                    token: String(token),
                });
                if (customer === null) {
                    console.log("hihi");
                    return res.send((0, response_1.responseBadRequest)('invalid params'));
                }
                const decodeData = yield auth_service_1.default.verifyToken(String(token));
                if (customer.email !== decodeData.email) {
                    return res.send((0, response_1.responseBadRequest)('invalid params'));
                }
                const active = yield auth_service_1.default.activeAccout(String(email));
                return res.send((0, response_1.responseSuccess)(active));
            }
            catch (err) {
                return res.send((0, response_1.responseErrorInternal)(err.message));
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.send((0, response_1.responseBadRequest)('invalid email or password'));
                }
                const secret = process.env.HASHING_KEY;
                if (!secret) {
                    return res.send((0, response_1.responseNotFound)());
                }
                const hashpass = crypto_1.default.createHmac("sha256", secret || '').update(password).digest('hex');
                const checkCustome = yield users_service_1.default.checkCustomer({
                    email,
                    password: hashpass,
                });
                console.log("gffd", checkCustome);
                if (checkCustome === null) {
                    return res.send((0, response_1.responseBadRequest)("invalid email or password"));
                }
                const accessToken = yield auth_service_1.default.genAccessToken({
                    id: checkCustome.id,
                    email: checkCustome.email
                });
                if (accessToken === "") {
                    return res.send((0, response_1.responseErrorInternal)());
                }
                return res.send((0, response_1.responseSuccess)({ accessToken }));
            }
            catch (err) {
                return res.send((0, response_1.responseErrorInternal)(err.message));
            }
        });
    }
}
exports.default = new authController();
