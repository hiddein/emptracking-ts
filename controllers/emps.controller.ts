import { Request, Response } from "express"
import path from "path"
import { validationResult } from "express-validator"
import { QueryResult } from "pg"
import { pool } from "../db"
import { v4 as uuidv4 } from "uuid"

class empsController {
  async create(req: any, res: Response): Promise<Response> {
    try {
      const {
        first_name,
        middle_name,
        last_name,
        id_dep,
        db_emp,
        email_emp,
        tel_emp,
      } = await req.body

      const { photo_emp } = await req.files

      let filename = uuidv4() + ".jpg"
      console.log(filename)
      photo_emp.mv(path.resolve(__dirname, "..", "static", filename))

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Значения - NULL", errors })
      }
      const response: QueryResult = await pool.query(
        "INSERT into emp (first_name,middle_name,last_name,id_dep,db_emp,email_emp,tel_emp,photo_emp) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
        [
          first_name,
          middle_name,
          last_name,
          id_dep,
          db_emp,
          email_emp,
          tel_emp,
          filename,
        ]
      )

      return res
        .status(200)
        .json({ message: "Добавлен сотрудник", first_name, last_name })
    } catch (e) {
      return res.status(500).json("Ошибка, проверьте значения")
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const response: QueryResult = await pool.query(
      "SELECT id_emp,first_name,middle_name,last_name,id_dep,to_char(db_emp, 'dd.mm.yyyy') as db_emp ,email_emp,tel_emp,photo_emp from emp"
    )
    return res.status(200).json(response.rows)
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response: QueryResult = await pool.query(
      "SELECT id_emp,first_name,middle_name,last_name,id_dep,to_char(db_emp, 'dd.mm.yyyy') as db_emp ,email_emp,tel_emp,photo_emp from emp where id_emp=$1",
      [id]
    )
    return res.status(200).json(response.rows)
  }
}
export default new empsController()
