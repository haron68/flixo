import { SettingsModel } from '@models/Settings'
import { DatabaseService, SETTINGS_KEY } from '../services/DatabaseService'
import { createSlice } from '@reduxjs/toolkit'

const initialState: SettingsModel = {
  systemAppearance: 'dark',
  hasSeenIntro: undefined
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSystemAppearance: (state, action) => {
      state.systemAppearance = action.payload
      DatabaseService.set(SETTINGS_KEY, state)
    },
    setHasSeenIntro: (state, action) => {
      state.hasSeenIntro = action.payload
      DatabaseService.set(SETTINGS_KEY, state)
    },
  },
})

export const settingsActions = settingsSlice.actions
export default settingsSlice.reducer
