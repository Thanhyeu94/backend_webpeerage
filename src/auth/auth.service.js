"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const pg_1 = require("../config/pg");
const nodemailer_1 = require("../config/nodemailer");
class authService {
    genVerifiedTocken(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!process.env.JWT_KEY)
                    return '';
                const verifiedToken = jwt.sign(customer, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                return verifiedToken;
            }
            catch (err) {
                console.log(err);
                return false;
                // throw err
            }
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!process.env.JWT_KEY)
                    return null;
                const customer = jwt.verify(token, process.env.JWT_KEY || '');
                return customer;
            }
            catch (err) {
                console.log(err);
                return false;
                throw err;
            }
        });
    }
    activeAccout(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield pg_1.pool.query(`
          UPDATE customers
          SET status_token = true
          WHERE email = $1
          RETURNING id, email
        `, [email]);
                if (customer.rows.length === 0) {
                    return null;
                }
                return customer.rows[0];
            }
            catch (err) {
                throw err;
            }
        });
    }
    sendMail(email, link) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: 'thanh@gmail.com',
                to: email,
                subject: 'ACTIVE ACCOUNT',
                text: link,
                html: `<a href="${link}">Click here to active your account</a>`,
            };
            nodemailer_1.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return false;
                }
                console.log('Message sent: %s', info.messageId);
                return true;
            });
        });
    }
    genAccessToken(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!process.env.JWT_KEY)
                return '';
            const accessToken = jwt.sign(customer, process.env.JWT_KEY, { expiresIn: 604800 });
            return accessToken;
        });
    }
}
exports.default = new authService();
