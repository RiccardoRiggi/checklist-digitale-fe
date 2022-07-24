import React from "react";

export const getTestoSuccess = (state) => state.feedback.testoSuccess;

export const getTestoWarn = (state) => state.feedback.testoWarn;

export const getTestoDanger = (state) => state.feedback.testoDanger;

export const isLoading = (state) => state.feedback.isLoading;

export const mantieniMessaggi = (state) => state.feedback.mantieniMessaggi;