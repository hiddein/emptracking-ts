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
        startTime,
        endTime,
        lunchTime,
        teaTime
      } = await req.body

      const { photo_emp } = await req.files

      let filename = uuidv4() + ".jpg"

      photo_emp.mv(path.resolve(__dirname, "..", "static", filename))

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Значения - NULL", errors })
      }
      const response: QueryResult = await pool.query(
        "INSERT into emp (first_name,middle_name,last_name,id_dep,db_emp,email_emp,tel_emp,photo_emp) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
        [ first_name, middle_name, last_name, id_dep, db_emp, email_emp, tel_emp, filename]
      )

      const response2: QueryResult = await pool.query(
        "INSERT into schedule (id_emp,start_time,end_time,tea_time,lunch_time) values ((select id_emp from emp where first_name=$1 and middle_name=$2 and last_name=$3 and id_dep=$4 and db_emp=$5),$6,$7,$8,$9)",
        [ first_name, middle_name, last_name, id_dep, db_emp, startTime, endTime, lunchTime, teaTime]
      )

      return res
        .status(200)
        .json({ message: "Добавлен сотрудник", first_name, last_name })
    } catch (e) {
      console.log(e.message)
      return res.status(500).json("Ошибка, проверьте значения")
    }
  }

  async edit(req: any, res: Response): Promise<Response> {
    try {
      const {
        first_name,
        middle_name,
        last_name,
        id_dep,
        db_emp,
        email_emp,
        tel_emp,
        startTime,
        endTime,
        lunchTime,
        teaTime
      } = await req.body
      const { id } = req.params
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Значения - NULL", errors })
      }
      
        const response: QueryResult = await pool.query(
          "UPDATE emp set first_name=$2 ,middle_name=$3 ,last_name=$4 ,id_dep=$5 ,db_emp=$6 ,email_emp=$7,tel_emp=$8 where id_emp=$1",
          [id, first_name, middle_name, last_name, id_dep, db_emp, email_emp, tel_emp]
        )
      const response2: QueryResult = await pool.query(
        "UPDATE schedule set start_time=$2, end_time=$3 ,tea_time=$4 ,lunch_time=$5 where id_emp=$1",
        [id, startTime, endTime, teaTime, lunchTime]
      )

      return res
        .status(200)
        .json({ message: "Добавлен сотрудник", first_name, last_name })
    } catch (e) {
      console.log(e.message)
      return res.status(500).json("Ошибка, проверьте значения")
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try{
    const response: QueryResult = await pool.query(
      "SELECT emp.id_emp,first_name,middle_name,last_name,emp.id_dep,name_dep,to_char(db_emp, 'dd.mm.yyyy') as db_emp ,email_emp,tel_emp,photo_emp, start_time, tea_time, lunch_time, end_time from emp, department,schedule where emp.id_dep=department.id_dep and emp.id_emp=schedule.id_emp"
    )
    return res.status(200).json(response.rows)
  }
  catch (e){
    return res.status(400).json(e)
  }
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response: QueryResult = await pool.query(
      "SELECT id_emp,first_name,middle_name,last_name,id_dep,to_char(db_emp, 'dd.mm.yyyy') as db_emp ,email_emp,tel_emp,photo_emp from emp where id_emp=$1",
      [id]
    )
    return res.status(200).json(response.rows)
  }

  async getSchedule(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response: QueryResult = await pool.query(
      "SELECT id_emp, start_time, teaTime, lunch_time, end_time from schedule where id_emp=$1",
      [id]
    )
    return res.status(200).json(response.rows)
  }
}
export default new empsController()
