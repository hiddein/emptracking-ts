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

  async deleteAll(req: Request, res: Response): Promise<Response> {
    const response: QueryResult = await pool.query(
      "DELETE FROM tracking;ALTER SEQUENCE tracking_id_reg_seq RESTART WITH 1;DELETE FROM moves;ALTER SEQUENCE moves_move_id_seq RESTART WITH 1"
    )
    return res.status(200).json({ message: "OK" })
  }

  async getAllMoves(req: Request, res: Response): Promise<Response> {
    const response: QueryResult = await pool.query(
      "SELECT move_id, moves.id_emp,first_name,middle_name,last_name, moves.id_room,name_room,to_char(time_enter, 'yyyy-mm-dd hh24:MI:ss') as time_enter,to_char(time_leave, 'yyyy-mm-dd hh24:MI:ss') as time_leave from moves,emp,room where time_leave is not NULL and moves.id_room=room.id_room and moves.id_emp=emp.id_emp"
    )
    return res.status(200).json(response.rows)
  }

  async getMovesInRange(req: Request, res: Response): Promise<Response> {
    let { startDate, endDate } = req.query
    endDate += " 23:59"

    const response: QueryResult = await pool.query(
      "SELECT move_id, moves.id_emp,first_name,middle_name,last_name, moves.id_room,name_room,to_char(time_enter, 'yyyy-mm-dd hh24:MI:ss') as time_enter,to_char(time_leave, 'yyyy-mm-dd hh24:MI:ss') as time_leave from moves,emp,room where time_leave is not NULL and moves.id_room=room.id_room and moves.id_emp=emp.id_emp and time_enter > $1 and time_leave <= $2 ",
      [startDate, endDate]
    )
    return res.status(200).json(response.rows)
  }

  async getMovesInRangeById(req: Request, res: Response): Promise<Response> {
    let { startDate, endDate, empId } = req.query
    endDate += " 23:59"
    const response: QueryResult = await pool.query(
      "SELECT move_id, moves.id_emp,first_name,middle_name,last_name, moves.id_room,name_room,to_char(time_enter, 'yyyy-mm-dd hh24:MI:ss') as time_enter,to_char(time_leave, 'yyyy-mm-dd hh24:MI:ss') as time_leave from moves,emp,room where time_leave is not NULL and moves.id_room=room.id_room and moves.id_emp=emp.id_emp and time_enter > $1 and time_leave <= $2 and moves.id_emp=$3 ",
      [startDate, endDate, empId]
    )
    return res.status(200).json(response.rows)
  }

  async getCountMovesInRange(req: Request, res: Response): Promise<Response> {
    let { startDate, endDate, sort } = req.query
    let response: QueryResult
    endDate += " 23:59"
    switch (sort) {
      case "default":
        response = await pool.query(
          "select name_room , count(moves.id_room)::int as count_visits from emp, department, moves,room where time_leave is not NULL and time_enter > $1 and time_leave <= $2 and  emp.id_emp=moves.id_emp and emp.id_dep=department.id_dep and moves.id_room=room.id_room group by name_room order by name_room",
          [startDate, endDate]
        )
        return res.status(200).json(response.rows)

      case "room":
        response = await pool.query(
          "select moves.id_emp,first_name,middle_name,last_name,name_dep, name_room , count(moves.id_room)::int as count_visits from emp, department, moves,room where time_leave is not NULL and time_enter > $1 and time_leave <= $2 and  emp.id_emp=moves.id_emp and emp.id_dep=department.id_dep and moves.id_room=room.id_room group by moves.id_emp,first_name,middle_name,last_name,name_dep, name_room order by name_room",
          [startDate, endDate]
        )
        return res.status(200).json(response.rows)
      case "dayRoom":
        response = await pool.query(
          "select id_emp, name_room, to_char(time_enter, 'yyyy-mm-dd') as time , count(moves.id_room)::int as count_visits from moves,room where time_leave is not NULL and time_enter > $1 and time_leave <= $2 and moves.id_room=room.id_room GROUP BY moves.id_emp,name_room, to_char(time_enter, 'yyyy-mm-dd') order by id_emp",
          [startDate, endDate]
        )
        return res.status(200).json(response.rows)
      case "dayRoomDep":
        response = await pool.query(
          "select name_dep, name_room, count(moves.id_room)::int as count_visits from moves,room,emp,department where time_leave is not NULL and time_enter > $1 and time_leave <= $2 and moves.id_room=room.id_room and moves.id_emp=emp.id_emp and emp.id_dep=department.id_dep GROUP BY name_dep,name_room order by name_dep",
          [startDate, endDate]
        )
        return res.status(200).json(response.rows)
    }

    return res.status(400).json({message: "Не указана сортировка"})
  }
}
export default new logsController()
