import React, { useEffect, useState } from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { Text } from '@components/Texts'
import { View } from '@components/Views'
import Colors, { AppColorScheme } from '@constants/Colors'
import { baseStyles, MAX_WIDTH } from '@assets/BaseStyles'
import Theme from '@assets/Theme'
import { Feather } from '@expo/vector-icons'
import { Block, Switch } from 'galio-framework'
// @ts-ignore
import { Checkbox } from 'galio-framework'
import { CloseCircle } from 'iconsax-react-native'

type Props = {
  item: {
    name: string
    icon?: JSX.Element
    image?: any
    subtitle?: string
  }
  colorScheme: AppColorScheme
  isLoading?: boolean
  selected?: boolean
  onPress?: () => void
  onRemovePress?: () => void
  multiple?: boolean
  showSwitch?: boolean
  capitalizeText?: boolean
  children?: JSX.Element
  style?: Record<string, StyleProp<ViewStyle>>
}

export function ListItemOption(props: Props) {
  const {
    item,
    colorScheme,
    selected = undefined,
    isLoading = undefined,
    onPress = undefined,
    onRemovePress = undefined,
    multiple = true,
    showSwitch = false,
    capitalizeText = false,
    children = null,
    style = {},
  } = props
  const [isSelected, setIsSelected] = useState<boolean | undefined>(selected)

  const handleOnPress = async () => {
    if (onPress) {
      await onPress()
    }
    setIsSelected(!isSelected)
  }

  // update isSelected if selected changes
  useEffect(() => {
    setIsSelected(selected)
  }, [selected])

  const styles = StyleSheet.create<any>({
    checkBoxView: {
      width: Theme.SIZES.CHECKBOX_WIDTH,
      height: Theme.SIZES.CHECKBOX_HEIGHT,
      borderWidth: Theme.SIZES.BORDER_WIDTH,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Theme.SIZES.BORDER_RADIUS,
    },
    uncheckedBoxView: {
      backgroundColor: Theme.COLORS.TRANSPARENT,
      borderColor: Theme.COLORS.GREY,
    },
    checked: {
      backgroundColor: Theme.COLORS.PRIMARY_SHADE,
      borderColor: Theme.COLORS.PRIMARY_SHADE,
    },
    disabled: {
      borderColor: Theme.COLORS.MUTED,
    },
    listContainer: {
      paddingVertical: Theme.SIZES.BASE,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: Theme.COLORS.MUTED,
      width: MAX_WIDTH,
    },
    ...style,
  })

  const checkedInnerStyles = [
    styles.checked,
    {
      backgroundColor: Theme.COLORS.PRIMARY_SHADE,
      borderColor: Theme.COLORS.PRIMARY_SHADE,
    },
    {
      backgroundColor: Theme.COLORS.PRIMARY_SHADE,
      borderColor: Theme.COLORS.PRIMARY_SHADE,
    },
  ]

  const checkBoxViewStyles = [
    styles.checkBoxView,
    styles.uncheckedBoxView,
    { borderColor: Theme.COLORS.PRIMARY_SHADE },
    selected && checkedInnerStyles,
    !onPress && styles.disabled,
  ]

  useEffect(() => {}, [selected])

  return multiple ? (
    showSwitch ? (
      <TouchableOpacity disabled={!onPress} onPress={handleOnPress}>
        <Block
          row
          style={{
            paddingVertical: Theme.SIZES.BASE,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: Theme.COLORS.MUTED,
            width: MAX_WIDTH,
          }}>
          {item.image ? (
            <Image
              source={item.image}
              style={[
                baseStyles.avatar,
                {
                  marginRight: Theme.SIZES.BASE,
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
            <Block>
              <Text
                style={{
                  fontSize: Theme.SIZES.BASE,
                  fontWeight: 'bold',
                  textTransform: capitalizeText ? 'capitalize' : 'none',
                }}>
                {item.name}
              </Text>
              {item.subtitle ? (
                <Text
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
            <Switch
              trackColor={{
                false: Theme.COLORS.NEUTRAL,
                true: Theme.COLORS.PRIMARY_TINT,
              }}
              onChange={handleOnPress}
              value={isSelected}
            />
          </Block>
        </Block>
      </TouchableOpacity>
    ) : (
      <Checkbox
        disabled={!onPress}
        flexDirection='row-reverse'
        initialValue={isSelected}
        color={Theme.COLORS.PRIMARY_SHADE}
        onChange={handleOnPress}
        label={
          <Block
            row
            width={MAX_WIDTH - Theme.SIZES.BASE * 2}
            style={{
              paddingVertical: Theme.SIZES.BASE,
            }}>
            {item.image ? (
              <Image
                source={item.image}
                style={[
                  baseStyles.avatar,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: Theme.SIZES.BASE,
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
              <Block>
                <Text
                  style={{
                    fontSize: Theme.SIZES.BASE,
                    fontWeight: 'bold',
                    textTransform: capitalizeText ? 'capitalize' : 'none',
                  }}>
                  {item.name}
                </Text>
                {item.subtitle ? (
                  <Text
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
            </Block>
          </Block>
        }
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: Theme.COLORS.MUTED,
        }}
      />
    )
  ) : (
    <TouchableOpacity disabled={!onPress || !!onRemovePress} onPress={onPress}>
      <Block row style={styles.listContainer}>
        {item.image ? (
          <Image
            source={item.image}
            style={[
              baseStyles.avatar,
              {
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Theme.SIZES.BASE,
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
          <Block>
            <Text
              style={{
                fontSize: Theme.SIZES.BASE,
                fontWeight: 'bold',
                textTransform: capitalizeText ? 'capitalize' : 'none',
              }}>
              {item.name}
            </Text>
            {item.subtitle ? (
              <Text
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
            {children}
          </Block>
          {!onRemovePress ? (
            <View style={checkBoxViewStyles}>
              <Feather
                name='check'
                color={
                  colorScheme == 'dark'
                    ? selected
                      ? Theme.COLORS.WHITE
                      : 'transparent'
                    : Theme.COLORS.WHITE
                }
                size={15}
                style={{ alignSelf: 'center' }}
              />
            </View>
          ) : (
            <TouchableOpacity onPress={onRemovePress}>
              <View>
                <CloseCircle
                  color={Theme.COLORS.MUTED}
                  size={Theme.SIZES.BASE * 2}
                  style={{ alignSelf: 'center' }}
                  variant='Bold'
                />
              </View>
            </TouchableOpacity>
          )}
        </Block>
      </Block>
    </TouchableOpacity>
  )
}
