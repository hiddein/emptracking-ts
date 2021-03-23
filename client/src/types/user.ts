 export interface userState {
    userLogin: string,
    userRole: string,
    isAuth: boolean,
    loading: boolean
}

export interface userAuth {
    userLogin: string,
    userRole: string,
}

export enum UserActionTypes {
    SET_USER_START = "SET_USER_START",
    SET_USER_SUCCESS = "SET_USER_SUCCESS",
    LOGOUT = "LOGOUT"


}

interface setUserSuccessAction {
    type: UserActionTypes.SET_USER_SUCCESS,
    payload: any
}

interface logoutAction {
    type: UserActionTypes.LOGOUT,
}

interface SetUserStartAncion {
    type: UserActionTypes.SET_USER_START,
}


export type userAction = setUserSuccessAction | logoutAction | SetUserStartAncion
