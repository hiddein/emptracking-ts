import { RoomActionTypes, RoomAction, RoomState } from "../../types/room"

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null,
  owns: [],
  ownsLoading: false,
  ownsError: null,
}

export const roomReducer = (
  state = initialState,
  action: RoomAction
): RoomState => {
  switch (action.type) {
    case RoomActionTypes.FETCH_ROOMS:
      return { ...state, loading: true, error: null, rooms: [] }

    case RoomActionTypes.FETCH_ROOMS_SUCCESS:
      return { ...state, loading: false, error: null, rooms: action.payload }

    case RoomActionTypes.FETCH_ROOMS_ERROR:
      return { ...state, loading: false, error: action.payload, rooms: [] }

    case RoomActionTypes.FETCH_OWNS:
      return { ...state, ownsLoading: true, ownsError: null, owns: [] }

    case RoomActionTypes.FETCH_OWNS_SUCCESS:
      return { ...state, ownsLoading: false, ownsError: null, owns: action.payload }

    case RoomActionTypes.FETCH_OWNS_ERROR:
      return { ...state, ownsLoading: false, ownsError: action.payload, owns: [] }

    default:
      return state
  }
}

export const fetchRooms = () => ({
  type: RoomActionTypes.FETCH_ROOMS,
})

export const fetchRoomsSuccess = (rooms: any) => ({
  type: RoomActionTypes.FETCH_ROOMS_SUCCESS,
  payload: rooms,
})

export const fetchRoomsError = (error: string) => ({
  type: RoomActionTypes.FETCH_ROOMS_ERROR,
  payload: error,
})

export const fetchOwns = () => ({
    type: RoomActionTypes.FETCH_OWNS,
  })
  
  export const fetchOwnsSuccess = (owns: any) => ({
    type: RoomActionTypes.FETCH_OWNS_SUCCESS,
    payload: owns,
  })
  
  export const fetchOwnsError = (error: string) => ({
    type: RoomActionTypes.FETCH_OWNS_ERROR,
    payload: error,
  })
  