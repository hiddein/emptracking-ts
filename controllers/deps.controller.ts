import { Request, Response } from "express"
import { QueryResult } from "pg"
import { pool } from "../db"


class depsController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name_dep } = await req.body
      const response: QueryResult = await pool.query(
        "INSERT into department (name_dep) VALUES ($1)",
        [name_dep]
      )

      return res
        .status(200)
        .json({ message: "Добавлен отдел", name_dep })
    } catch (e) {
      return res.status(500).json("Ошибка, проверьте значения")
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const response: QueryResult = await pool.query(
      "SELECT * from department"
    )
    return res.status(200).json(response.rows)
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response: QueryResult = await pool.query(
      "SELECT * from department where id_dep=$1",
      [id]
    )
    return res.status(200).json(response.rows)
  }
}
export default new depsController()
