import { ColorSchemeName } from 'react-native'

export type SettingsModel = {
  systemAppearance: ColorSchemeName | 'system'
  hasSeenIntro?: boolean
  orientation?: number
}
