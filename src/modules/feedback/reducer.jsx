import React from "react";

export const initialState = {
    testoSuccess: null,
    testoWarn: null,
    testoDanger: null
}

export const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TESTO_SUCCESS':
            return {
                ...state,
                testoSuccess: action.testoSuccess
            }
        case 'FETCH_TESTO_WARN':
            return {
                ...state,
                testoWarn: action.testoWarn
            }
        case 'FETCH_TESTO_DANGER':
            return {
                ...state,
                testoDanger: action.testoDanger
            }
        case 'FETCH_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
            case 'FETCH_MANTIENI_MESSAGGI':
                return {
                    ...state,
                    mantieniMessaggi: action.mantieniMessaggi
                }    
        default:
            return state;
    }
}