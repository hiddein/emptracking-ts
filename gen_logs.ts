import $authHost from './axiosConf'

const getWays = async (id:number) => {
  const {data}= await $authHost.get('api/route/start/'+id)
  return data
}

const getRooms = async () => {
  const {data} = await $authHost.get('api/room/')
  return data
}

const randomInteger = (min:number , max:number):number => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

const generate_time = (dt:Date,hh?:any,mm?:any, min_before?:any, min_after?:any):Date => {
    const sec =randomInteger(0,59) + randomInteger(-min_before*60, min_after*60) 
    //var newDate = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),hh,mm,sec)
    dt.setHours(hh)
    dt.setMinutes(mm)
    dt.setSeconds(sec)
    return dt

}



var generation = async(days:number) => {
  var i = 0
  var logs: object[] = []
  const week: Array<number> = [0,1,2,3,4]
  var times: Array<Array<number>> = [[9,0], [12,0], [12,5], [13,30], [14,10], [17,40]]
  const minDiff: number = 15
  var currentDay:Date = new Date()
  currentDay.setDate(currentDay.getDate() - days)
  var rooms: object[] = []
  await getRooms().then( function(data) { rooms  =  data 
  })
  

  

  for (let l = 0; l < days; l++) {
    if (week.includes(currentDay.getDay()))
    {
      
      var startRoomData:any = rooms[randomInteger(0,rooms.length-1)]
      let room = startRoomData.id_room
      var state = false
      var ways: any[] = []
      let way

      
      i++
      console.log(i)
    }
    currentDay.setDate(currentDay.getDate() + 1)
    console.log(currentDay)
  }
  return logs
}
generation(30)
//console.dir(generation(30), {'maxArrayLength': null})




