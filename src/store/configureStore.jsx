import { applyMiddleware, createStore, compose } from "redux";
import { createReducers } from "./allReducer";
import { persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
whitelist: ['feedback','utenteLoggato'],
  storage: storage
}
const allReducers = createReducers();
const persistedReducer = persistReducer(persistConfig, allReducers);
export const configureStore = () => {
  const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  const store = createStore(persistedReducer, composeEnhancers());
  const persistor = persistStore(store);
  return {store, persistor};
}