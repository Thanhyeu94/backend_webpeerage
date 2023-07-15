import  * as pg from "pg";
import dotenv from 'dotenv';
dotenv.config();
const {Pool} = pg
export const pool = new Pool({
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
})
// console.log("pool đây: ",pool)