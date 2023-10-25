import { Alert, Linking, Platform } from 'react-native'

export const showRateAppAlert = () => {
  const onRateAppPress = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(
        'https://apps.apple.com/us/app/itunes-u/id1660973148?action=write-review&ls=1'
      )
    }
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.flixo.Flixo'
    )
  }
  return Alert.alert(
    'We would love to get your opinion!',
    'Please leave us a review on the app store.',
    [
      {
        text: 'Not now',
        style: 'cancel',
      },
      { text: 'Rate App', onPress: () => onRateAppPress() },
    ]
  )
}
