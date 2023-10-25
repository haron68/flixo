import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { AppColorScheme } from '../../constants/Colors'
import { Block } from 'galio-framework'

/**
 * Button meant to be used in NavBar component
 *
 * @param props
 * @author Haron Arama
 */
export function NavBarButton(props: {
  colorScheme: AppColorScheme
  icon: any
  location?: 'left' | 'right'
  onPress: (_?: any) => any
  style?: any
}) {
  return (
    <Block
      style={[
        { alignSelf: props.location === 'right' ? 'flex-end' : 'flex-start' },
        props.style,
      ]}>
      <TouchableOpacity onPress={props.onPress}>{props.icon}</TouchableOpacity>
    </Block>
  )
}
