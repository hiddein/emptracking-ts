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

  
}
export default new violController()
