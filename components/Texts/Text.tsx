import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ThemeProps } from '@components/Themed'
import useThemeColor from '@hooks/useThemeColor'
import { Text as DefaultText } from 'galio-framework'

type TextProps = ThemeProps & DefaultText['props']

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const [fontFamily, setFontFamily] = useState('Poppins-Medium')

  useEffect(() => {
    if (style) {
      const textStyles = StyleSheet.flatten(style)

      // @ts-ignore
      const family = textStyles['fontFamily']
      // @ts-ignore
      const weight = textStyles['fontWeight']

      if (family) {
        setFontFamily(family)
      } else {
        switch (weight) {
          case '900':
            setFontFamily('Poppins-Black')
            break
          case 'bold':
          case '800':
          case '700':
            setFontFamily('Poppins-Bold')
            break
          case '200':
          case '100':
            setFontFamily('Poppins-Light')
            break
          case '600':
          case '500':
          case '400':
          case '300':
          default:
            setFontFamily('Poppins-Regular')
            break
        }
      }
    }
  }, [])

  return (
    <DefaultText
      style={[
        { color },
        style,
        {
          fontFamily,
        },
      ]}
      {...otherProps}
    />
  )
}
