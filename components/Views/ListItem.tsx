import React from 'react'
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { Text } from '@components/Texts'
import { AppColorScheme } from '@constants/Colors'
import { baseStyles, MAX_WIDTH } from '@assets/BaseStyles'
import Theme from '@assets/Theme'
import { Feather } from '@expo/vector-icons'
import { Block } from 'galio-framework'

type ListItemProps = {
  item: {
    icon?: any
    image?: any
    subtitle?: string
    name?: string
    badgeEnd?: any
    nameStyle?: any
  }
  colorScheme: AppColorScheme
  hideChevron?: boolean
  isLoading?: boolean
  onPress?: () => void
  style?: Record<'listItem', ViewStyle>
}

export function ListItem(props: ListItemProps) {
  const {
    item,
    colorScheme,
    isLoading = undefined,
    onPress = undefined,
    hideChevron,
    style = {},
  } = props

  const styles = StyleSheet.create({
    listItem: {
      paddingVertical: Theme.SIZES.BASE,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: Theme.COLORS.MUTED,
      width: MAX_WIDTH,
    },
    ...style,
  })

  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Block row style={styles.listItem}>
        {item.image ? (
          <Image
            source={item.image}
            style={[
              baseStyles.avatar,
              {
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Theme.SIZES.BASE,
                backgroundColor: Theme.COLORS.LIGHT_GREY,
              },
            ]}
          />
        ) : item.icon ? (
          <Block
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: Theme.SIZES.BASE,
            }}>
            {item.icon}
          </Block>
        ) : null}
        <Block flex row space='between' style={{ alignItems: 'center' }}>
          <Block flex row space='between' style={{ alignItems: 'center' }}>
            <Block style={{ flex: 1 }}>
              <Text
                style={[
                  {
                    fontSize: Theme.SIZES.BASE,
                    fontWeight: 'bold',
                  },
                  item.nameStyle ? item.nameStyle : {},
                ]}>
                {item.name}
              </Text>
              {item.subtitle ? (
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: Theme.SIZES.BASE - 4,
                    fontWeight: '300',
                    color: Theme.COLORS.MUTED,
                  }}>
                  {item.subtitle}
                </Text>
              ) : (
                <></>
              )}
            </Block>
            {item.badgeEnd}
          </Block>
          {!!onPress && !hideChevron && (
            <Feather
              name='chevron-right'
              color={Theme.COLORS.MUTED}
              size={Theme.SIZES.BASE}
            />
          )}
        </Block>
      </Block>
    </TouchableOpacity>
  )
}
