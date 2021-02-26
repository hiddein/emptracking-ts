function randomInteger(min:number , max:number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

const generate_time = (dt:Function,hh:any,mm:any, min_before:any, min_after:any) => {
    const sec = randomInteger(0,59)
    const time_in = dt.replace(hh,mm,sec)

}


for (let index = 0; index < 100 ; index++) {
    console.log(randomInteger(0,59))
}