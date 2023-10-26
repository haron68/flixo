import { FlatList as DefaultFlatList } from 'react-native'
import { ThemeProps } from '@components/Themed'
import useThemeColor from '@hooks/useThemeColor'

type FlatListProps = ThemeProps & DefaultFlatList['props']

export function FlatList(props: FlatListProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )

  return (
    <DefaultFlatList
      contentInsetAdjustmentBehavior='automatic'
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  )
}
