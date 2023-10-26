import { Block, Icon } from 'galio-framework'
import Theme from '@assets/Theme'
import { Text } from '@components/Texts'
import { NumberFormatter } from '../../utils/transformers'
import React from 'react'
import { StyleSheet } from 'react-native'

type Props = {
  popularity: number
}

const PopularityBadge = ({ popularity }: Props) => {
  return (
    <Block row style={styles.popularityBox}>
      <Icon name="fire-alt" family="font-awesome-5" color={Theme.COLORS.DANGER} size={Theme.SIZES.BASE} />
      <Text style={{ paddingLeft: 3 }}>
        {NumberFormatter.format(popularity)}
      </Text>
    </Block>
  )
}

const styles = StyleSheet.create<any>({
  popularityBox: {
    alignItems: 'center'
  }
})

export default PopularityBadge
