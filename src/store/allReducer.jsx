import { combineReducers } from "redux";
import { feedbackReducer } from "../modules/feedback/reducer";
import { utenteReducer } from "../modules/utenteLoggato/reducer";

const allReducers = {
    feedback: feedbackReducer,
    utenteLoggato: utenteReducer
}
export const createReducers = () => {
    const appReducers = combineReducers({ ...allReducers });
    return appReducers;
}