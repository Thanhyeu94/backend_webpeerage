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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("../config/pg");
class userService {
    checkUnique(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield pg_1.pool.query(`
              SELECT *
              FROM customers
              WHERE email = $1
              LIMIT 1
            `, [email]);
                if (customer.rows.length === 0) {
                    return false;
                }
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
                // throw err
            }
        });
    }
    insert(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield pg_1.pool.query(`
          INSERT INTO customers (name, phone, email, password, vetify_token,status_token)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email
        `, [payload.name, payload.phone, payload.email, payload.password, payload.vetify_token, payload.status_token]);
                if (customer.rows.length === 0) {
                    return null;
                }
                return customer.rows[0];
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    findOne(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield pg_1.pool.query(`
            SELECT *
            FROM customers
            WHERE email = $1
              AND vetify_token = $2
              AND status_token = $3
            LIMIT 1
          `, [payload.email, payload.token, false]);
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
    checkCustomer(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield pg_1.pool.query(`
            SELECT *
            FROM customers
            WHERE email = $1
            LIMIT 1
          `, [payload.email]);
                if (data.rows.length === 0) {
                    return null;
                }
                const customer = data.rows[0];
                if (customer.password !== payload.password) {
                    return null;
                }
                return customer;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
}
exports.default = new userService();
