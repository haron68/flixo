import { ScrollView as DefaultScrollView } from 'react-native'
import { ThemeProps } from '@components/Themed'
import useThemeColor from '@hooks/useThemeColor'

type ScrollViewProps = ThemeProps & DefaultScrollView['props']

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )

  return (
    <DefaultScrollView
      contentInsetAdjustmentBehavior='automatic'
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  )
}
