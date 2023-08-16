import { pool } from "../config/pg"
class commentService{         
    async updateComment(payload:{id:number,customers_id:number,content:string}) {
      try {
        const updateComment = await pool.query(
          `update comments set content = $1 where id = $2 AND customers_id = $3  RETURNING *`,
          [payload.content,payload.id,payload.customers_id]
        )
        console.log("up:",updateComment)
        if (updateComment.rows.length === 0) {
          return null
        }
        return updateComment.rows
      } catch (error) {
        console.log("err",error)
        throw error
      }
    }
  }
 export default new commentService();