import { View as DefaultView } from 'react-native'
import { ThemeProps } from '@components/Themed'
import useThemeColor from '@hooks/useThemeColor'

type ViewProps = ThemeProps & DefaultView['props']

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}
