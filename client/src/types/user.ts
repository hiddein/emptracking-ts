 export interface userState {
    userLogin: string,
    userRole: string,
    isAuth: boolean
}

export interface userAuth {
    userLogin: string,
    userRole: string,
}

export enum UserActionTypes {
    SET_USER = "SET_USER",
    LOGOUT = "LOGOUT"


}

interface setUserAction {
    type: UserActionTypes.SET_USER,
    payload: any
}

interface logoutAction {
    type: UserActionTypes.LOGOUT,
}


export type userAction = setUserAction | logoutAction
