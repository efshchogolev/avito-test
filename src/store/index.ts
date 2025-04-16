import {
  Action,
  combineReducers,
  configureStore,
  Reducer,
} from '@reduxjs/toolkit'

import modalReducer from './slices/modalSlice.ts'

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const combinedReducer = combineReducers({
  modal: modalReducer,
})

export type RootState = ReturnType<typeof combinedReducer>

const rootReducer: Reducer = (state: RootState, action: Action) => {
  if (action.type === 'auth/logout') {
    state = {} as RootState
  }
  return combinedReducer(state, action)
}
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // }).concat(apiSlice.middleware),
})

export const persistor = persistStore(store)
export default store

export type AppDispatch = typeof store.dispatch
