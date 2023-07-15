"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_controller_1 = __importDefault(require("./users/users.controller"));
const auth_controller_1 = __importDefault(require("./auth/auth.controller"));
const auth_middleware_1 = __importDefault(require("./auth/auth.middleware"));
const comments_middleware_1 = __importDefault(require("./comments/comments.middleware"));
const { Pool } = require('pg');
const bodyparser = require('body-parser');
const cors = require('cors');
/*assuming an express app is declared here*/
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.post("/api/v1/auth/check-email", users_controller_1.default.checkEmail);
app.post('/api/v1/auth/check-unique', users_controller_1.default.checkUnique);
app.post('/api/v1/auth/register', auth_controller_1.default.register);
app.get('/api/v1/auth/verify', auth_controller_1.default.verify);
app.post('/api/v1/auth/login', auth_controller_1.default.login);
app.use(auth_middleware_1.default.jwtAccessToken);
app.get('/api/v1/user/profile', users_controller_1.default.profile);
app.patch('/api/v1/comments/:id', comments_middleware_1.default.checkPermission);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
