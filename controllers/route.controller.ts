import { Request, Response } from "express"
import { QueryResult } from "pg"
import { pool } from "../db"


class routeController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id_start, id_end} = await req.body
      const response: QueryResult = await pool.query(
        "INSERT into route (id_start,id_end) VALUES ($1,$2)",
        [id_start, id_end]
      )

      return res
        .status(200)
        .json({ message: "Добавлен возможный путь", id_start, id_end })
    } catch (e) {
      return res.status(500).json("Ошибка, проверьте значения")
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const response: QueryResult = await pool.query(
      "SELECT * from route"
    )
    return res.status(200).json(response.rows)
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response: QueryResult = await pool.query(
      "SELECT * from route where id_route=$1",
      [id]
    )
    return res.status(200).json(response.rows)
  }
  async getStart(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response: QueryResult = await pool.query(
      "SELECT * from route where id_start=$1",
      [id]
    )
    return res.status(200).json(response.rows)
  }
  async getEnd(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response: QueryResult = await pool.query(
      "SELECT * from route where id_end=$1",
      [id]
    )
    return res.status(200).json(response.rows)
  }
}
export default new routeController()
