 export interface LogInterface {
    route: number
    timestamp: any

}

export interface StartRoomInterface {
    id_room : number
}

export interface RoomInterface {
    id_room : number,
    name_room :string,
    about_room :string,
}

export interface WayInterface {
    id_route : number,
    id_start :number,
    id_end :number
}
export interface EmpInterface {
    id_emp :number,
    first_name :string,
    middle_name :string,
    last_name :string,
    id_dep :number,
    db_emp :number,
    email_emp :string,
    tel_emp :string
}
export interface ScheduleInterface {
    id_emp:number, 
    start_time:any, 
    teaTime:number, 
    lunch_time:number, 
    end_time: any
}
