import settingsReducer from '@store/settingsSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

export const reducer = combineReducers({
  settings: settingsReducer,
})

export const store = configureStore({
  reducer,
  preloadedState: {
    settings: {
      systemAppearance: 'dark'
    }
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
