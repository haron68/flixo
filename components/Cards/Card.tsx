import React, { useState } from 'react'
import {
  Image,
  ImageSourcePropType, Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Text } from '@components/Texts'
import { View } from '@components/Views'
import { baseStyles, MAX_WIDTH } from '@assets/BaseStyles'
import Theme from '@assets/Theme'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Block } from 'galio-framework'
import { ConvertCard, Edit, Eye } from 'iconsax-react-native'

type Props = {
  frontImageSource: ImageSourcePropType
  backImageSource: ImageSourcePropType
  scanDocuments?: () => void
  orientationX?: 'front' | 'back'
  orientationY?: 'vertical' | 'horizontal'
  showActions?: boolean
}

const actionButtonIconProps = {
  color: Theme.COLORS.WHITE,
  size: Theme.SIZES.TAB_BAR_ICON_SIZE * 1.125,
  variant: 'Outline',
}

export function Card({
  frontImageSource,
  backImageSource,
  scanDocuments = () => undefined,
  orientationX = 'front',
  orientationY = 'horizontal',
  showActions = true,
}: Props) {
  const navigation = useNavigation()
  const [isFront, setFront] = useState(orientationX == 'front')
  const [isVertical, setVertical] = useState(orientationY == 'vertical')

  const handleOnView = () => {
    navigation.dispatch(
      StackActions.push('PhotoSlideShow', {
        photos: [frontImageSource, backImageSource],
        photoIndex: isFront ? 0 : 1,
      })
    )
  }

  const handleOnFlipCard = () => {
    setFront(!isFront)
  }

  const actionButtons = [
    {
      Icon: Edit,
      label: 'Change',
      onPress: scanDocuments,
    },
    {
      Icon: Eye,
      label: 'View',
      onPress: handleOnView,
    },
    {
      Icon: ConvertCard,
      label: 'Flip',
      onPress: handleOnFlipCard,
    },
  ]

  return (
    <Block>
      <View style={styles.container}>
        {isFront ? (
          <Image
            source={frontImageSource}
            resizeMethod='resize'
            style={isVertical ? styles.verticalCard : styles.horizontalCard}
          />
        ) : (
          <Image
            source={backImageSource}
            resizeMethod='resize'
            style={isVertical ? styles.verticalCard : styles.horizontalCard}
          />
        )}
      </View>

      {showActions && (
        <View
          style={[
            baseStyles.centeredContainer,
            { minHeight: Platform.select({ios: '100%', android: 300}), justifyContent: 'space-evenly' },
          ]}>
          <Block row style={baseStyles.borderTopLine} />
          <Block row style={styles.actionsContainer}>
            {actionButtons.map(({ label, Icon, onPress }, index) => (
              <TouchableOpacity key={index.toString()} onPress={onPress}>
                <Block style={styles.actionButton}>
                  <Icon {...actionButtonIconProps} />
                </Block>
                <Text style={[baseStyles.centeredText, { fontWeight: 'bold' }]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </Block>
        </View>
      )}
    </Block>
  )
}

const styles = StyleSheet.create<any>({
  container: {
    ...baseStyles.shadowBorder,
    ...baseStyles.shadow,
    borderRadius: Theme.SIZES.CARD_BORDER_RADIUS,
  },
  actionsContainer: {
    justifyContent: 'space-around',
    width: MAX_WIDTH,
  },
  actionButton: {
    ...baseStyles.actionButton,
    padding: Theme.SIZES.BASE,
  },
  verticalCard: {
    height: Theme.SIZES.CARD_VERTICAL_HEIGHT,
    width: Theme.SIZES.CARD_VERTICAL_WIDTH,
    borderRadius: Theme.SIZES.CARD_BORDER_RADIUS,
  },
  horizontalCard: {
    height: Theme.SIZES.CARD_HORIZONTAL_HEIGHT,
    width: Theme.SIZES.CARD_WIDTH,
    borderRadius: Theme.SIZES.CARD_BORDER_RADIUS,
  },
})
