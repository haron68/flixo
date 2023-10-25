import * as React from 'react'
import { StyleProp, TouchableOpacity } from 'react-native'
import { baseStyles } from '@assets/BaseStyles'
import Theme from '@assets/Theme'
import Colors, { AppColorScheme } from '../../constants/Colors'
import { Block } from 'galio-framework'
import { ArrowLeft } from 'iconsax-react-native'

type BackButtonProps = {
  colorScheme: AppColorScheme
  onPress?: (_?: any) => any
  backgroundless?: boolean
  style?: StyleProp<any>
}

/**
 * Button meant to be used in NavBar component as a back button
 *
 * @param props
 * @author Haron Arama
 */
export function BackButton(props: BackButtonProps) {
  const {
    colorScheme,
    onPress = undefined,
    backgroundless = true,
    style = {},
  } = props

  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Block
        style={[
          { alignSelf: 'flex-start' },
          !backgroundless ? baseStyles.buttonBackground : {},
          style,
        ]}>
        <ArrowLeft
          color={Colors[colorScheme].text}
          size={Theme.SIZES.TAB_BAR_ICON_SIZE}
          variant='Outline'
        />
      </Block>
    </TouchableOpacity>
  )
}
