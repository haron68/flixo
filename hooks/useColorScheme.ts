import {
  useColorScheme as _useColorScheme,
  ColorSchemeName,
} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export default function useColorScheme(): NonNullable<ColorSchemeName> {
  const theme = useSelector((state: RootState) => state.settings.systemAppearance)
  const defaultScheme = _useColorScheme() as NonNullable<ColorSchemeName>
  switch (theme) {
    case 'light':
      return 'light'
    case 'dark':
      return 'dark'
    case 'system':
    default:
      return defaultScheme
  }
}
