import { useEffect, useRef, useState } from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { ScrollIntoView } from 'react-native-scroll-into-view'
import { FullOptions } from 'react-native-scroll-into-view/build/config'
import { ContainerBase } from 'react-native-scroll-into-view/build/container'
import { ThemeProps } from '@components/Themed'
import { baseStyles, MAX_WIDTH } from '@assets/BaseStyles'
import Theme from '@assets/Theme'
import { useKeyboard } from '@react-native-community/hooks'
import { Input as DefaultInput } from 'galio-framework'
import { CloseCircle } from 'iconsax-react-native'

type InputProps = ThemeProps &
  DefaultInput['props'] & {
    showClearText?: boolean
    onClearText?: () => any
    scrollIntoView?: boolean
    scrollIntoViewOptions?: Partial<FullOptions>
    style?: StyleProp<ViewStyle>
  }

export function Input(props: InputProps) {
  const {
    style,
    textInputStyle,
    scrollIntoView,
    scrollIntoViewOptions,
    onFocus,
    onBlur,
    helpStyles,
    labelStyles,
    showClearText,
    onClearText,
    ...otherProps
  } = props

  const scrollIntoViewRef = useRef<ContainerBase>()
  const [inFocus, setInFocus] = useState<boolean>(false)
  const { keyboardShown } = useKeyboard()

  useEffect(() => {
    if (keyboardShown && scrollIntoView && inFocus) {
      setTimeout(
        () => scrollIntoViewRef?.current?.scrollIntoView(scrollIntoViewOptions),
        100
      )
    }
  }, [keyboardShown, scrollIntoView, inFocus])

  const renderInput = (
    <>
      <DefaultInput
        onFocus={(event) => {
          setInFocus(true)
          onFocus?.(event)
        }}
        onBlur={(event) => {
          setInFocus(false)
          onBlur?.(event)
        }}
        textInputStyle={[{ fontFamily: 'Poppins-Medium' }, textInputStyle]}
        style={[{ maxWidth: MAX_WIDTH }, style]}
        helpStyles={[
          { color: Theme.COLORS.ERROR, marginStart: -Theme.SIZES.BASE },
          helpStyles,
        ]}
        labelStyles={[
          baseStyles.inputLabel,
          { marginStart: -Theme.SIZES.BASE },
          labelStyles,
        ]}
        {...otherProps}
      />
      {!!showClearText && (
        <TouchableOpacity onPress={onClearText} style={baseStyles.clearInput}>
          <CloseCircle
            color={Theme.COLORS.MUTED}
            size={Theme.SIZES.BASE * 1.5}
            variant='Bold'
          />
        </TouchableOpacity>
      )}
    </>
  )

  if (scrollIntoView) {
    return (
      <ScrollIntoView enabled={false} ref={scrollIntoViewRef}>
        {renderInput}
      </ScrollIntoView>
    )
  }

  return renderInput
}
