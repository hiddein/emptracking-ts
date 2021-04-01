export interface StatState {
    stat: any[]
    loading: boolean
    error: null | string

}

export enum StatActionTypes {
    FETCH_STAT = "FETCH_STAT",
    FETCH_STAT_SUCCESS = "FETCH_STAT_SUCCESS",
    FETCH_STAT_ERROR = "FETCH_STAT_ERROR"

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

export type StatAction = FetchStatAction | FetchStatSuccessAction | FetchStatErrorAction

export interface StatDaySortState {
    stat: any[]
    loading: boolean
    error: null | string

}

export enum StatDaySortActionTypes {
    FETCH_STATDAYSORT = "FETCH_STATDAYSORT",
    FETCH_STATDAYSORT_SUCCESS = "FETCH_STATDAYSORT_SUCCESS",
    FETCH_STATDAYSORT_ERROR = "FETCH_STATDAYSORT_ERROR"

}

interface FetchStatDaySortAction {
    type: StatDaySortActionTypes.FETCH_STATDAYSORT
}
interface FetchStatDaySortSuccessAction {
    type: StatDaySortActionTypes.FETCH_STATDAYSORT_SUCCESS
    payload: any[]
}

interface FetchStatDaySortErrorAction {
    type: StatDaySortActionTypes.FETCH_STATDAYSORT_ERROR
    payload: string
}

export type StatDaySortAction = FetchStatDaySortAction | FetchStatDaySortSuccessAction | FetchStatDaySortErrorAction





export interface StatByDepState {
    stat: any[]
    loading: boolean
    error: null | string

}

export enum StatByDepActionTypes {
    FETCH_STATBYDEP = "FETCH_STATBYDEP",
    FETCH_STATBYDEP_SUCCESS = "FETCH_STATBYDEP_SUCCESS",
    FETCH_STATBYDEP_ERROR = "FETCH_STATBYDEP_ERROR"

}

interface FetchStatByDepAction {
    type: StatByDepActionTypes.FETCH_STATBYDEP
}
interface FetchStatByDepSuccessAction {
    type: StatByDepActionTypes.FETCH_STATBYDEP_SUCCESS
    payload: any[]
}

interface FetchStatByDepErrorAction {
    type: StatByDepActionTypes.FETCH_STATBYDEP_ERROR
    payload: string
}

export type StatByDepAction = FetchStatByDepAction | FetchStatByDepSuccessAction | FetchStatByDepErrorAction


