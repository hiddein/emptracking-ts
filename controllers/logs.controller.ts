import { Request, Response } from "express"
import { validationResult } from "express-validator"
import { QueryResult } from "pg"
import { pool } from "../db"

class logsController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { emp, route, time } = await req.body
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Значения - NULL", errors })
      }

      await pool.query(
        "INSERT into tracking (id_emp,id_route,Timestamp) VALUES ($1,$2,$3)",
        [emp, route, time]
      )

      return res.status(200).json({ emp, route, time })
    } catch (e) {
      return res.status(500).json("Ошибка сервера, проверьте значения")
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const response: QueryResult = await pool.query(
      "SELECT id_reg, id_emp, id_route,to_char(timestamp, 'yyyy-mm-dd hh24:MI:ss') as timestamp from tracking"
    )
    return res.status(200).json(response.rows)
  }
}
export default new logsController()
