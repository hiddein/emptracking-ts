import $authHost from "./axiosConfig"
import { LogInterface,RoomInterface, WayInterface, EmpInterface, StartRoomInterface } from "./types"

const getWays = async (id: number) => {
  const { data } = await $authHost.get(`api/route/start/${id}`)
  return data
}

const getRooms = async () => {
  const { data } = await $authHost.get("api/room")
  return data
}

const getStartRoom = async (id:number) => {
  const { data } = await $authHost.get(`api/room/start/${id}`)
  return data
}

const getEmps = async () => {
  const { data } = await $authHost.get("api/emps")
  return data
}

const addLog = async (id_emp: number, id_route: number, Timestamp: number) => {
  const { data } = await $authHost.post("api/logs", {
    emp: id_emp,
    route: id_route,
    time: Timestamp,
  })
  return data
}

const clearLogs = async () => {
  const { data } = await $authHost.get("api/logs/delete")
  return data.message
}

const randomInteger = (min: number, max: number): number => {
  let rand: number = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

const generate_time = (
  dt: Date,
  hh: number,
  mm: number,
  min_before: number,
  min_after: number
): Date => {
  const sec: number =
    randomInteger(0, 59) + randomInteger(-min_before * 60, min_after * 60)
  //var newDate = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),hh,mm,sec)
  dt.setHours(hh)
  dt.setMinutes(mm)
  dt.setSeconds(sec)
  return dt
}

var generation = async (days: number, empId:number) => {
  var logs: LogInterface[] = []
  const week: Array<number> = [0, 1, 2, 3, 4]
  var times: Array<Array<number>> = [
    [9, 0],
    [12, 0],
    [12, 5],
    [13, 30],
    [14, 10],
    [17, 40],
  ]
  const minDiff: number = 15
  var currentDay: Date = new Date()
  currentDay.setDate(currentDay.getDate() - days)
  var rooms: RoomInterface[] = []
  
  rooms = await getRooms()

  var startRooms: StartRoomInterface[] = await getStartRoom(empId)

  for (let l = 0; l < days; l++) {
    if (week.includes(currentDay.getDay())) {
      let room: number = startRooms[randomInteger(0, startRooms.length - 1)].id_room
      //console.log("Сотрудник - ", empId, "Помещение- ", room)
      var ways: WayInterface[] = []
      let way: WayInterface

      for (let time in times) {
        const timestamp: string = generate_time(
          currentDay,
          times[time][0],
          times[time][1],
          minDiff,
          minDiff
        ).toLocaleString()

          ways = await getWays(room)
          //console.log("Старт- ", room)
          way = ways[randomInteger(0, ways.length - 1)]
          room = way.id_end
          //console.log("Конец- ", room)
          logs.push({ route: way.id_route, timestamp: timestamp })
          //console.log(timestamp)
       
      }
      //console.log('end day')
    }
    //console.log('go next')
    currentDay.setDate(currentDay.getDate() + 1)
    //console.log(currentDay)
  }
  return logs
}

// Начало заполнения
const start = async () => {
  var emps: EmpInterface[] = []
  var genResult: LogInterface[] = []

  await clearLogs()

  emps = await getEmps()

  for (let emp in emps) {
    let empId: number = emps[emp].id_emp

    genResult = await generation(10,empId)

    for (let log in genResult) {
      await addLog(empId, genResult[log].route, genResult[log].timestamp)
    }
  }
}
start()
