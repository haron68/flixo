import { Card as DefaultCard } from 'galio-framework'
import { ThemeProps } from '@components/Themed'
import useThemeColor from '@hooks/useThemeColor'

type CardProps = ThemeProps & DefaultCard['props']

export function Card(props: CardProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )

  return (
    <DefaultCard
      contentInsetAdjustmentBehavior='automatic'
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  )
}
