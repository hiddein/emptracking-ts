import { Request, Response } from "express"
import { QueryResult } from "pg"
import { pool } from "../db"


class accessController {
  async create(req: any, res: Response): Promise<Response> {
    try {
      const { id_emp, id_route} = await req.body
      const response: QueryResult = await pool.query(
        "INSERT into access VALUES ($1,$2)",
        [id_emp,id_route]
      )

      return res
        .status(200)
        .json({ message: "Добавлен доступ", id_emp,id_route })
    } catch (e) {
      return res.status(500).json("Ошибка, проверьте значения")
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const response: QueryResult = await pool.query(
      "SELECT * from access"
    )
    return res.status(200).json(response.rows)
  }

}
export default new accessController()
