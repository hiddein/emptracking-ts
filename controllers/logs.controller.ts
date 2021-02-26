import { Request, Response } from "express"
import { QueryResult } from "pg"
import { pool } from "../db"

class logsController {
  async create(req: any, res: Response): Promise<Response> {
    try {
      const { emp, route, time } = await req.body
      if (!emp && !route && !time) {
        return res.status(400).json({ message: "Значения - NULL" })
      }

      const response: QueryResult = await pool.query(
        "INSERT into tracking (id_emp,id_route,Timestamp) VALUES ($1,$2,$3)",
        [emp, route, time]
      )
      return res.status(200).json({ emp, route, time})
    } catch (e) {
      return res.status(500).json("Ошибка сервера")
    }
  }

  async getAll(req: any, res: Response): Promise<Response> {
    const response: QueryResult = await pool.query("SELECT current_date from tracking")
    return res.status(200).json(response.rows)
  }
}
export default new logsController()
