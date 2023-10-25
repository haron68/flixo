// @ts-ignore
import Theme from '@assets/Theme'

const tintColorLight = Theme.COLORS.PRIMARY
const tintColorDark = Theme.COLORS.SECONDARY

export type AppColorScheme = 'light' | 'dark'

export default {
  light: {
    text: Theme.COLORS.DARK,
    background: Theme.COLORS.WHITE,
    imagePlaceholder: require('@assets/images/ui/skeleton-load.png'),
    buttonBackground: Theme.COLORS.TERTIARY_SHADE,
    buttonTextColor: Theme.COLORS.WHITE,
    bottomSheetBackground: Theme.COLORS.WHITE,
    tint: tintColorLight,
    input: {
      background: '#fff',
      text: '#000',
      placeholder: '#555',
    },
    boneColor: 'rgba(203,200,200,0.6)',
    highlightColor: 'rgba(184,180,180,0.3)',
    tabBarActiveTextColor: Theme.COLORS.WHITE,
    tabBarTextColor: Theme.COLORS.BLACK,
    tabBarBackground: Theme.COLORS.WHITE,
    tabIconDefault: Theme.COLORS.GREY,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: Theme.COLORS.WHITE,
    background: Theme.COLORS.BLACK,
    imagePlaceholder: require('@assets/images/ui/skeleton-load-dark.png'),
    buttonBackground: Theme.COLORS.SECONDARY,
    buttonTextColor: Theme.COLORS.WHITE,
    bottomSheetBackground: 'rgb(18, 18, 18)',
    tint: tintColorDark,
    input: {
      background: '#797979',
      text: '#fff',
      placeholder: '#b6b6b6',
    },
    boneColor: Theme.COLORS.DARK,
    highlightColor: Theme.COLORS.MUTED,
    tabBarActiveTextColor: Theme.COLORS.BLACK,
    tabBarTextColor: Theme.COLORS.WHITE,
    tabBarBackground: 'rgb(18, 18, 18)',
    tabIconDefault: Theme.COLORS.GREY,
    tabIconSelected: tintColorDark,
  },
}
