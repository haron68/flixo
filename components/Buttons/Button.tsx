import { ThemeProps } from '@components/Themed'
import useThemeColor from '@hooks/useThemeColor'
import Theme from '@assets/Theme'
import { Button as DefaultButton } from 'galio-framework'

export type ButtonProps = ThemeProps & DefaultButton['props'] & {
  iconRight?: boolean
}

export function Button(props: ButtonProps) {
  const {
    style,
    size,
    lightColor,
    darkColor,
    textStyle,
    shadowless,
    disabled,
    ...otherProps
  } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'buttonBackground'
  )
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    'buttonTextColor'
  )

  return (
    <DefaultButton
      disabled={disabled}
      size={size}
      style={[
        {
          backgroundColor: disabled ? Theme.COLORS.GREY : backgroundColor,
          borderRadius: Theme.SIZES.INPUT_BORDER_RADIUS,
        },
        size == 'small'
          ? {
              width: 'auto',
              height: Theme.SIZES.BASE * 2.25,
              paddingHorizontal: Theme.SIZES.BASE,
            }
          : size == 'large'
          ? {
              width: '100%',
              marginHorizontal: 0,
            }
          : typeof size == 'number'
          ? { width: size }
          : {},
        style,
      ]}
      shadowless={shadowless === undefined ? true : shadowless}
      textStyle={[
        {
          fontSize: Theme.SIZES.FONT,
          fontWeight: '600',
          fontFamily: 'Poppins-Bold',
          color,
        },
        textStyle,
      ]}
      {...otherProps}
    />
  )
}
