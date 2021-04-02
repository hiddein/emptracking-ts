import { TypedUseSelectorHook, useSelector } from "react-redux";
import { rootState } from "../store/reducers/rootReducer";

export const useTypedSelector:TypedUseSelectorHook<rootState> = useSelector