import { Request, Response } from "express"
import { QueryResult } from "pg"
import { pool } from "../db"


class accessController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id_emp, id_room } = await req.body
      const response: QueryResult = await pool.query(
        "INSERT into access VALUES ($1,$2)",
        [id_emp,id_room]
      )
      return res
        .status(200)
        .json({ message: "Добавлен доступ", id_emp,id_room })
    } catch (e) {
      return res.status(500).json("Ошибка, проверьте значения")
    }
  }

    async delete(req: Request, res: Response): Promise<Response> {
      try {
        const { id_emp, id_room } = await req.body
        const response: QueryResult = await pool.query(
          "DELETE FROM access where id_emp=$1 and id_room=$2",
          [id_emp,id_room]
        )
        return res
          .status(200)
          .json({ message: "Лишен доступа", id_emp,id_room })
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

  async getAccess(req: Request, res: Response): Promise<Response> {
    const response: QueryResult = await pool.query(
      "select distinct access.id_emp, first_name,last_name, middle_name, to_char(db_emp, 'yyyy-mm-dd') db_emp, tel_emp, name_dep, access.id_room, name_room, about_room from access,room,emp,department where access.id_emp=emp.id_emp and emp.id_dep=department.id_dep and access.id_room=room.id_room order by id_emp"
    )
    return res.status(200).json(response.rows)
  }

}
export default new accessController()
