import { Request, Response } from "express"
import { QueryResult } from "pg"
import { pool } from "../db"

class roomController {
  async create(req: any, res: Response): Promise<Response> {
    try {
      const { nameRoom, aboutRoom, commRooms, depsOwnRoom } = await req.body
      const response: QueryResult = await pool.query(
        "INSERT into room (name_room,about_room) VALUES ($1,$2)",
        [nameRoom, aboutRoom]
      )
      const newRoomId: QueryResult = await pool.query(
        "SELECT id_room from room where name_room=($1)",
        [nameRoom]
      )
      commRooms.map(async (room: any) => {
        await pool.query(
          "INSERT into route (id_start, id_end) VALUES ($1,$2)",
          [newRoomId.rows[0].id_room, room.id_room]
        )

        await pool.query(
          "INSERT into route (id_start, id_end) VALUES ($2,$1)",
          [newRoomId.rows[0].id_room, room.id_room]
        )
      })

      depsOwnRoom.map(async (dep: any) => {
        await pool.query("INSERT into dep_own_room VALUES ($1,$2)", [
          dep.id_dep,
          newRoomId.rows[0].id_room,
        ])
      })

      return res.status(200).json({ message: "Добавлено помещение", nameRoom })
    } catch (e) {
      return res.status(500).json("Ошибка, проверьте значения")
    }
  }
  async edit(req: any, res: Response): Promise<Response> {
    try {
      const { nameRoom, aboutRoom, commRooms, depsOwnRoom } = await req.body
      const response: QueryResult = await pool.query(
        "UPDATE room set about_room=$1 where name_room=$2",
        [aboutRoom,nameRoom]
      )
      const roomId: QueryResult = await pool.query(
        "SELECT id_room from room where name_room=($1)",
        [nameRoom]
      )
      commRooms.map(async (room: any) => {
        await pool.query(
          "DELETE from route where id_start=$1 or id_end=$1",
          [roomId.rows[0].id_room]
        )

        await pool.query(
          "INSERT into route (id_start, id_end) VALUES ($1,$2)",
          [roomId.rows[0].id_room, room.id_room]
        )

        await pool.query(
          "INSERT into route (id_start, id_end) VALUES ($2,$1)",
          [roomId.rows[0].id_room, room.id_room]
        )
      })

      await pool.query(
        "DELETE from dep_own_room where id_room=$1",
        [roomId.rows[0].id_room]
      )

      depsOwnRoom.map(async (dep: any) => {
        await pool.query("INSERT into dep_own_room VALUES ($1,$2)", [
          dep.id_dep,
          roomId.rows[0].id_room,
        ])
      })

      return res.status(200).json({ message: "Добавлено помещение", nameRoom })
    } catch (e) {
      console.log(e)
      return res.status(500).json("Ошибка, проверьте значения")
    }
  }
  async getAll(req: Request, res: Response): Promise<Response> {
    const response: QueryResult = await pool.query("SELECT * from room ")
    return res.status(200).json(response.rows)
  }

  async getAllOwns(req: Request, res: Response): Promise<Response> {
    const response: QueryResult = await pool.query(
      "SELECT dep_own_room.id_dep,dep_own_room.id_room, department.name_dep from dep_own_room,department where dep_own_room.id_dep=department.id_dep "
    )
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
