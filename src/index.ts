import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userController from './users/users.controller';
import authController from './auth/auth.controller';
import authMiddleware from './auth/auth.middleware';
import commentsMiddleware from './comments/comments.middleware'


const { Pool } = require('pg');
const bodyparser = require('body-parser');
const cors = require('cors');
/*assuming an express app is declared here*/
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      customers?: any
    }
  }
}

const app: Express = express();
const port = process.env.PORT||8000;
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.post("/api/v1/auth/check-email",userController.checkEmail);
app.post('/api/v1/auth/check-unique',userController.checkUnique);
app.post('/api/v1/auth/register',authController.register);
app.get('/api/v1/auth/verify', authController.verify);
app.post('/api/v1/auth/login',authController.login);
app.use(authMiddleware.jwtAccessToken);
app.get('/api/v1/user/profile',userController.profile);
app.patch('/api/v1/comments/:id', commentsMiddleware.checkPermission)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});