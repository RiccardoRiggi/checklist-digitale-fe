import React from "react";

export const initialState = {
    utente: null,
}

export const utenteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_UTENTE':
            return {
                ...state,
                utente: action.utente
            }
        default:
            return state;
    }
}