import { pool } from "../config/pg"
import { updateCreatePayLoad, userCreatePayLoad } from "./uses.interface";
import { Request,Response } from "express";
class userService{
    async checkUnique(email:string){
        try {
            const customer = await pool.query(`
              SELECT *
              FROM customers
              WHERE email = $1
              LIMIT 1
            `, [email]);
            if(customer.rows.length === 0) {
              return false
            }
            return true;
          } catch (err) {
            console.log(err)
            return false
            // throw err
          }
     }
     async insert(payload:userCreatePayLoad){
      try {
        const customer = await pool.query(
        `
          INSERT INTO customers (name, phone, email, password, vetify_token,status_token)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email
        `, [payload.name, payload.phone, payload.email, payload.password, payload.vetify_token, payload.status_token])
        if(customer.rows.length === 0){
          return null
        }
        return customer.rows[0]
      } catch (error) {
        console.log(error)
        return false;
      }
     }
     async findOne(payload: {email:string,token:string}) {
      try {
        const customer = await pool.query(
          `
            SELECT *
            FROM customers
            WHERE email = $1
              AND vetify_token = $2
              AND status_token = $3
            LIMIT 1
          `, [payload.email, payload.token, false]
        )
  
        if (customer.rows.length === 0) {
          return null
        }
  
        return customer.rows[0]
      } catch (err) {
        throw err
      }
    }
    async checkCustomer(payload:{email: string,password: string}) {
      try {
        const data = await pool.query(
          `
            SELECT *
            FROM customers
            WHERE email = $1
            LIMIT 1
          `, [payload.email]
        )
        if (data.rows.length === 0) {
          return null
        }
        const customer = data.rows[0]
        if(customer.password !== payload.password){
          return null
        }
        return customer
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
 export default new userService();