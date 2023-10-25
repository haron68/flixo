import { ThemeProps } from '@components/Themed'
import useThemeColor from '@hooks/useThemeColor'
import { NavBar as DefaultNavBar } from 'galio-framework'

type NavBarProps = ThemeProps & DefaultNavBar['props']

export function NavBar(props: NavBarProps) {
  const { style, lightColor, darkColor, titleStyle, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return (
    <DefaultNavBar
      style={[
        {
          backgroundColor,
        },
        style,
      ]}
      // @ts-ignore
      titleStyle={[
        {
          color,
        },
        titleStyle,
      ]}
      {...otherProps}
    />
  )
}
