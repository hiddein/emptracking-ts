export interface RoomState {
    rooms: any[]
    loading: boolean
    error: null | string
    owns: any[]
    ownsLoading: boolean
    ownsError: null | string

}

export enum RoomActionTypes {
    FETCH_ROOMS = "FETCH_ROOMS",
    FETCH_ROOMS_SUCCESS = "FETCH_ROOMS_SUCCESS",
    FETCH_ROOMS_ERROR = "FETCH_ROOMS_ERROR",
    FETCH_OWNS = "FETCH_OWNS",
    FETCH_OWNS_SUCCESS = "FETCH_OWNS_SUCCESS",
    FETCH_OWNS_ERROR = "FETCH_OWNS_ERROR"

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

interface FetchOwnsAction {
    type: RoomActionTypes.FETCH_OWNS
}
interface FetchOwnsSuccessAction {
    type: RoomActionTypes.FETCH_OWNS_SUCCESS
    payload: any[]
}

interface FetchOwnsErrorAction {
    type: RoomActionTypes.FETCH_OWNS_ERROR
    payload: string
}

export type RoomAction = FetchRoomAction | FetchRoomSuccessAction | FetchRoomErrorAction | FetchOwnsAction | FetchOwnsSuccessAction | FetchOwnsErrorAction
