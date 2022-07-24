import React from "react";

export const fetchTestoSuccessAction  = (testoSuccess) => ({
    type: 'FETCH_TESTO_SUCCESS',
    testoSuccess
})

export const fetchTestoWarnAction  = (testoWarn) => ({
    type: 'FETCH_TESTO_WARN',
    testoWarn
})

export const fetchTestoDangerAction  = (testoDanger) => ({
    type: 'FETCH_TESTO_DANGER',
    testoDanger
})

export const fetchIsLoadingAction  = (isLoading) => ({
    type: 'FETCH_IS_LOADING',
    isLoading
})

export const fetchMantieniMessaggiAction  = (mantieniMessaggi) => ({
    type: 'FETCH_MANTIENI_MESSAGGI',
    mantieniMessaggi
})
