export interface Icount {
    name_room: string
    count_visits: number
}

export interface StatState {
    stat: any[]
    loading: boolean
    error: null | string

    statDaySort: any[]
    loadingDaySort: boolean
    errorDaySort: null | string

    statDepSort: any[]
    loadingDepSort: boolean
    errorDepSort: null | string

    statSortByDefault: Icount[]
    loadingSortByDefault: boolean
    errorSortByDefault: null | string

}

export enum StatActionTypes {
    FETCH_STAT = "FETCH_STAT",
    FETCH_STAT_SUCCESS = "FETCH_STAT_SUCCESS",
    FETCH_STAT_ERROR = "FETCH_STAT_ERROR",
    FETCH_STATDAYSORT = "FETCH_STATDAYSORT",
    FETCH_STATDAYSORT_SUCCESS = "FETCH_STATDAYSORT_SUCCESS",
    FETCH_STATDAYSORT_ERROR = "FETCH_STATDAYSORT_ERROR",
    FETCH_STATBYDEP = "FETCH_STATBYDEP",
    FETCH_STATBYDEP_SUCCESS = "FETCH_STATBYDEP_SUCCESS",
    FETCH_STATBYDEP_ERROR = "FETCH_STATBYDEP_ERROR",
    FETCH_STATBYDEFAULT = "FETCH_STATBYDEFAULT",
    FETCH_STATBYDEFAULT_SUCCESS = "FETCH_STATBYDEFAULT_SUCCESS",
    FETCH_STATBYDEFAULT_ERROR = "FETCH_STATBYDEFAULT_ERROR",

}

interface FetchStatAction {
    type: StatActionTypes.FETCH_STAT
}
interface FetchStatSuccessAction {
    type: StatActionTypes.FETCH_STAT_SUCCESS
    payload: any[]
}

interface FetchStatErrorAction {
    type: StatActionTypes.FETCH_STAT_ERROR
    payload: string
}

interface FetchStatDaySortAction {
    type: StatActionTypes.FETCH_STATDAYSORT
}
interface FetchStatDaySortSuccessAction {
    type: StatActionTypes.FETCH_STATDAYSORT_SUCCESS
    payload: any[]
}

interface FetchStatDaySortErrorAction {
    type: StatActionTypes.FETCH_STATDAYSORT_ERROR
    payload: string
}


interface FetchStatByDepAction {
    type: StatActionTypes.FETCH_STATBYDEP
}
interface FetchStatByDepSuccessAction {
    type: StatActionTypes.FETCH_STATBYDEP_SUCCESS
    payload: any[]
}

interface FetchStatByDepErrorAction {
    type: StatActionTypes.FETCH_STATBYDEP_ERROR
    payload: string
}

interface FetchStatByDefaultAction {
    type: StatActionTypes.FETCH_STATBYDEFAULT
}
interface FetchStatByDefaultSuccessAction {
    type: StatActionTypes.FETCH_STATBYDEFAULT_SUCCESS
    payload: any[]
}

interface FetchStatByDefaultErrorAction {
    type: StatActionTypes.FETCH_STATBYDEFAULT_ERROR
    payload: string
}

export type StatAction = FetchStatAction | FetchStatSuccessAction | FetchStatErrorAction | FetchStatByDepAction | FetchStatByDepSuccessAction | FetchStatByDepErrorAction | FetchStatDaySortAction | FetchStatDaySortSuccessAction | FetchStatDaySortErrorAction| FetchStatByDefaultAction | FetchStatByDefaultSuccessAction | FetchStatByDefaultErrorAction
