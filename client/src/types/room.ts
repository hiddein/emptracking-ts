export interface RoomState {
    rooms: any[]
    loading: boolean
    error: null | string

}

export enum RoomActionTypes {
    FETCH_ROOMS = "FETCH_ROOMS",
    FETCH_ROOMS_SUCCESS = "FETCH_ROOMS_SUCCESS",
    FETCH_ROOMS_ERROR = "FETCH_ROOMS_ERROR"

}

export interface EmpInterface {
    userLogin: string,
    userRole: string,
}



interface FetchRoomAction {
    type: RoomActionTypes.FETCH_ROOMS
}
interface FetchRoomSuccessAction {
    type: RoomActionTypes.FETCH_ROOMS_SUCCESS
    payload: any[]
}

interface FetchRoomErrorAction {
    type: RoomActionTypes.FETCH_ROOMS_ERROR
    payload: string
}

export type RoomAction = FetchRoomAction | FetchRoomSuccessAction | FetchRoomErrorAction
