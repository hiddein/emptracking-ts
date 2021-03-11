import { Request, Response } from "express"
import { QueryResult } from "pg"
import { pool } from "../db"

class roomController {
  async create(req: any, res: Response): Promise<Response> {
    try {
      const { name_room, about_room } = await req.body
      const response: QueryResult = await pool.query(
        "INSERT into room (name_room,about_room) VALUES ($1,$2)",
        [name_room, about_room]
      )

      return res.status(200).json({ message: "Добавлено помещение", name_room })
    } catch (e) {
      return res.status(500).json("Ошибка, проверьте значения")
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const response: QueryResult = await pool.query("SELECT * from room")
    return res.status(200).json(response.rows)
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response: QueryResult = await pool.query(
      "SELECT * from room where id_room=$1",
      [id]
    )
    return res.status(200).json(response.rows)
  }

  async getStart(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response: QueryResult = await pool.query(
      "SELECT id_room from dep_own_room where id_dep = ( select id_dep from emp where id_emp=$1)",
      [id]
    )
    return res.status(200).json(response.rows)
  }
}
export default new roomController()
