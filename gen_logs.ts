import $authHost from "./axiosConf"

const getWays = async (id: number) => {
  const { data } = await $authHost.get("api/route/start/" + id)
  return data
}

const getRooms = async () => {
  const { data } = await $authHost.get("api/room")
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
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

const generate_time = (
  dt: Date,
  hh?: any,
  mm?: any,
  min_before?: any,
  min_after?: any
): Date => {
  const sec =
    randomInteger(0, 59) + randomInteger(-min_before * 60, min_after * 60)
  //var newDate = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),hh,mm,sec)
  dt.setHours(hh)
  dt.setMinutes(mm)
  dt.setSeconds(sec)
  return dt
}

var generation = async (days: number) => {
  var logs: object[] = []
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
  var rooms: object[] = []
  await getRooms().then(function (data) {
    rooms = data
  })

  for (let l = 0; l < days; l++) {
    if (week.includes(currentDay.getDay())) {
      var startRoomData: any = rooms[randomInteger(0, rooms.length - 1)]
      let room = startRoomData.id_room
      var state = false
      var ways: any[] = []
      let way

      for (let time in times) {
        state = !state
        const timestamp = generate_time(
          currentDay,
          times[time][0],
          times[time][1],
          minDiff,
          minDiff
        ).toLocaleString()

        if (state) {
          await getWays(room).then(function (data) {
            ways = data
          })
          //console.log("Старт- ", room)
          way = ways[randomInteger(0, ways.length - 1)]
          room = way.id_end
          //console.log("Конец- ", room)
          logs.push({ route: way.id_route, timestamp: timestamp })
          //console.log(timestamp)
        } else {
          await getWays(room).then(function (data) {
            ways = data
          })

          //console.log("Старт- ", room)
          way = ways[randomInteger(0, ways.length - 1)]
          room = way.id_end
          //console.log("Конец- ", room)

          logs.push({ route: way.id_route, timestamp: timestamp })
          //console.log(timestamp)
        }
      }
      //console.log('end day')
    }
    //console.log('go next')
    currentDay.setDate(currentDay.getDate() + 1)
    //console.log(currentDay)
  }
  return logs
}

// Начало выполнения
const start = async () => {
  let message: string = ""
  var emps: any[] = []
  var genResult: any[] = []
  var uploadData: any[] = []

  await clearLogs()
  await getEmps().then(function (data) {
    emps = data
  })
  
  for (let emp in emps) {
    let empId: number = emps[emp].id_emp
    generation(5)
      .then(async function (data) {
        genResult = data
      })
      
      .then(async function () {
      for (let log in genResult) {
        //console.log(empId, genResult[log].route, genResult[log].timestamp)
       // uploadData.push({empId, route: genResult[log].route, timestamp : genResult[log].timestamp})
      await addLog(empId, genResult[log].route, genResult[log].timestamp)
      }
      })
  }
}
start()