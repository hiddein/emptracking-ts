import { Request, Response } from "express"
import { QueryResult } from "pg"
import { pool } from "../db"

class violController {
  
  async getAccessViols(req: Request, res: Response): Promise<Response> {
    let { startDate, endDate, sort } = req.query
    let response: QueryResult
    endDate += " 23:59"

    switch (sort) {
      case "default":
        response = await pool.query(
          "select distinct id_reg, tracking.id_emp,first_name,middle_name,last_name, name_dep, tracking.id_route,route.id_end,name_room,to_char(Timestamp, 'yyyy-mm-dd hh24:MI:ss') as timestamp from tracking,emp,route,room,department where emp.id_dep=department.id_dep and tracking.id_route=route.id_route and tracking.id_emp=emp.id_emp and route.id_end=room.id_room  and Timestamp > $1 and Timestamp <= $2 and not exists(select * from access where tracking.id_route=access.id_route and tracking.id_emp=access.id_emp)",
          [startDate, endDate]
        )
        return res.status(200).json(response.rows)
      case "byEmp":
        response = await pool.query(
          "select tracking.id_emp,first_name,middle_name,last_name,name_dep, count(id_reg) from tracking,emp,route,room,department where emp.id_dep=department.id_dep and tracking.id_route=route.id_route and tracking.id_emp=emp.id_emp and route.id_end=room.id_room  and Timestamp > $1 and Timestamp <= $2 and not exists(select * from access where tracking.id_route=access.id_route and tracking.id_emp=access.id_emp) GROUP BY tracking.id_emp,first_name,middle_name,last_name, name_dep order by tracking.id_emp",
          [startDate, endDate]
        )
        return res.status(200).json(response.rows)
      case "byEmpDays":
        response = await pool.query(
          "select tracking.id_emp,first_name,middle_name,last_name,name_dep,to_char(Timestamp, 'yyyy-mm-dd') as timestamp, count(id_reg) from tracking,emp,route,room,department where emp.id_dep=department.id_dep and tracking.id_route=route.id_route and tracking.id_emp=emp.id_emp and route.id_end=room.id_room  and Timestamp > $1 and Timestamp <= $2 and not exists(select * from access where tracking.id_route=access.id_route and tracking.id_emp=access.id_emp) GROUP BY tracking.id_emp,first_name,middle_name,last_name, name_dep, to_char(Timestamp, 'yyyy-mm-dd') order by tracking.id_emp",
          [startDate, endDate]
        )
        return res.status(200).json(response.rows)
    }

    return res.status(400).json({message: "Не указан вариант сортировки"})

    
  }

  async getLateness(req: Request, res: Response): Promise<Response> {
    let { startDate, endDate, sort } = req.query
    let response: QueryResult
    endDate += " 23:59"

    switch (sort) {
      case "default":
        response = await pool.query(
          "SELECT distinct movesWithRN.id_emp, first_name,middle_name,last_name,name_dep, to_char(time_enter::time - start_time::time, 'hh24:MI:ss')  late_time, to_char(time_enter, 'yyyy-mm-dd') date , id_room FROM ( SELECT id_emp, time_enter, id_room, ROW_NUMBER() OVER (PARTITION BY moves.id_emp,to_char(time_enter, 'yyyy-mm-dd') ORDER BY time_enter ) rn FROM moves) movesWithRN ,schedule,emp,department WHERE rn = 1 and movesWithRN.id_emp=schedule.id_emp and emp.id_dep=department.id_dep and movesWithRN.id_emp=emp.id_emp and time_enter::time - start_time::time  > time '00:10' and time_enter > $1 and time_enter <= $2 ",
          [startDate, endDate]
        )
        return res.status(200).json(response.rows)
      case "byEmp":
        response = await pool.query(
          "SELECT distinct movesWithRN.id_emp, first_name,middle_name,last_name,name_dep, count(*) count_lateness FROM ( SELECT id_emp, time_enter, id_room, ROW_NUMBER() OVER (PARTITION BY moves.id_emp,to_char(time_enter, 'yyyy-mm-dd') ORDER BY time_enter ) rn FROM moves) movesWithRN,schedule,emp,department WHERE rn = 1 and movesWithRN.id_emp=schedule.id_emp and emp.id_dep=department.id_dep and movesWithRN.id_emp=emp.id_emp and time_enter::time - start_time::time  > time '00:10' and time_enter > $1 and time_enter <= $2 group by movesWithRN.id_emp, first_name,middle_name,last_name,name_dep",
          [startDate, endDate]
        )
        return res.status(200).json(response.rows)
    }

    return res.status(400).json({message: "Не указан вариант сортировки"})

    
  }

  async getWorkHoursViols(req: Request, res: Response): Promise<Response> {
    let { startDate, endDate, sort } = req.query
    let response: QueryResult
    switch (sort) {
      case "default":
        response = await pool.query(
          "select emp.id_emp, first_name, last_name, middle_name, name_dep, to_char(tempMoves.date,'yyyy-mm-dd') date, to_char(tempMoves.absence_time, 'hh24:MI:ss') absence_time from (SELECT mv.id_emp, emp.id_dep, to_char(time_enter, 'yyyy-mm-dd')::date as date,sum(time_leave::time - time_enter::time) as absence_time from (select * from moves where time_leave is not null) as mv,emp,department where mv.id_emp=emp.id_emp and emp.id_dep=department.id_dep and mv.id_room not in( select id_room from dep_own_room where id_dep=emp.id_dep ) group by to_char(time_enter, 'yyyy-mm-dd'), mv.id_emp,emp.id_dep order by date) tempMoves , emp,department where emp.id_emp=tempMoves.id_emp and emp.id_dep=department.id_dep and (tempMoves.absence_time - (select tea_time from schedule where schedule.id_emp=tempMoves.id_emp) - (select lunch_time from schedule where schedule.id_emp=tempMoves.id_emp)) > time '00:00:00' and date >= $1 and date <= $2",
          [startDate, endDate]
        )
        return res.status(200).json(response.rows)
      case "byEmp":
        response = await pool.query(
          "SELECT distinct movesWithRN.id_emp, first_name,middle_name,last_name,name_dep, count(*) count_lateness FROM ( SELECT id_emp, time_enter, id_room, ROW_NUMBER() OVER (PARTITION BY moves.id_emp,to_char(time_enter, 'yyyy-mm-dd') ORDER BY time_enter ) rn FROM moves) movesWithRN,schedule,emp,department WHERE rn = 1 and movesWithRN.id_emp=schedule.id_emp and emp.id_dep=department.id_dep and movesWithRN.id_emp=emp.id_emp and time_enter::time - start_time::time  > time '00:10' and time_enter > $1 and time_enter <= $2 group by movesWithRN.id_emp, first_name,middle_name,last_name,name_dep",
          [startDate, endDate]
        )
        return res.status(200).json(response.rows)
    }

    return res.status(400).json({message: "Не указан вариант сортировки"})

    
  }
}

export default new violController()
