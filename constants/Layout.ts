import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width

export default {
  window: {
    width,
    height: Dimensions.get('window').height,
  },
  screen: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  isSmallDevice: width < 375,
}
