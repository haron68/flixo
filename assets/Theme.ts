import Layout from '@constants/Layout'
import { Theme } from '@react-navigation/native'

const SOCIAL = {
  PINTEREST: '#BD081C',
  REDDIT: '#FF4500',
  SNAPCHAT: 'rgb(212,210,0)',
  TIKTOK: '#000000',
  YOUTUBE: '#FF0000',
  WHATSAPP: '#4AC959',
  FACEBOOK: '#3B5998',
  TWITTER: '#5BC0DE',
  INSTAGRAM: '#C13584',
  LINKEDIN: '#2867B2',
  DRIBBBLE: '#EA4C89',
  GOOGLE: '#DE5246',
  APPLE: '#000000',
}

const COLORS = {
  PRIMARY: '#00761a',
  PRIMARY_TINT: '#1a8444',
  PRIMARY_SHADE: '#006823',
  SECONDARY: '#76990b',
  SECONDARY_TINT: '#adcd3c',
  SECONDARY_SHADE: '#6b7a21',
  TERTIARY: '#4983c4',
  TERTIARY_TINT: '#A5C4D4',
  TERTIARY_SHADE: '#2b6273',
  BLUE: '#0092D6',
  BLUE_TINT: '#1A9DDA',
  BLUE_SHADE: '#0080BC',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GREY: '#898989',
  LIGHT_SHADE: '#D1D1D1',
  LIGHT_GREY: '#EEEEEE',
  DARK: '#333333',
  THEME: '#B23AFC',
  INFO: '#6366f1',
  ERROR: '#FE2472',
  WARNING: '#ff9c09',
  DANGER: '#ef482a',
  SUCCESS: '#45DF31',
  TRANSPARENT: 'transparent',
  INPUT: '#333333',
  PLACEHOLDER: '#B0B0B0',
  NAVBAR: '#F9F9F9',
  BLOCK: '#808080',
  MUTED: '#9FA5AA',
  NEUTRAL: 'rgba(255,255,255, 0.65)',
  GOLD: '#ffd600',
  ICON: '#000000',
  ...SOCIAL,
}

const BASE = 14
const height = Layout.window.height
const width = Layout.window.width

const SIZES = {
  BASE: BASE,
  FONT: BASE,
  OPACITY: 0.8,

  TAB_BAR_ICON_SIZE: BASE * 1.8,

  BORDER_RADIUS: 4,
  BORDER_WIDTH: 0.8,

  // Typography
  H1: BASE * 2.75,
  H2: BASE * 2.375,
  H3: BASE * 1.875,
  H4: BASE * 1.5,
  H5: BASE * 1.3125,
  H6: BASE * 1.125,
  BODY: BASE * 0.875,
  SMALL: BASE * 0.75,

  // Icons
  ICON: BASE,
  ICON_MEDIUM: BASE * 1.5,
  ICON_LARGE: BASE * 2,

  // Button styles
  BUTTON_WIDTH: BASE * 9,
  BUTTON_HEIGHT: BASE * 2.75,
  BUTTON_SHADOW_RADIUS: 3,
  BUTTON_BORDER_WIDTH: 1,

  // Block styles
  BLOCK_SHADOW_OPACITY: 0.15,
  BLOCK_SHADOW_RADIUS: 8,
  ANDROID_ELEVATION: 1,

  // Card styles
  CARD_BORDER_RADIUS: BASE,
  CARD_BORDER_WIDTH: BASE * 0.05,
  CARD_WIDTH: width - BASE * 2,
  CARD_VERTICAL_HEIGHT: width - BASE * 2,
  CARD_VERTICAL_WIDTH: (width - BASE * 2) * (54 / 85.6),
  CARD_HORIZONTAL_HEIGHT: (width - BASE * 2) * (54 / 85.6),
  CARD_MARGIN_VERTICAL: BASE * 0.875,
  CARD_FOOTER_HORIZONTAL: BASE * 0.75,
  CARD_FOOTER_VERTICAL: BASE * 0.75,
  CARD_AVATAR_WIDTH: BASE * 2.5,
  CARD_AVATAR_HEIGHT: BASE * 2.5,
  CARD_AVATAR_RADIUS: BASE * 1.25,
  CARD_IMAGE_HEIGHT: BASE * 12.5,
  CARD_ROUND: BASE * 0.1875,
  CARD_ROUNDED: BASE * 0.5,

  // Input styles
  INPUT_BORDER_RADIUS: BASE * 0.725,
  INPUT_BORDER_WIDTH: 1,
  INPUT_HEIGHT: BASE * 2.75,
  INPUT_HORIZONTAL: BASE,
  INPUT_VERTICAL_TEXT: 14,
  INPUT_VERTICAL_LABEL: BASE / 2,
  INPUT_TEXT: BASE * 0.875,
  INPUT_ROUNDED: BASE * 1.5,

  // NavBar styles
  NAVBAR_HEIGHT: BASE * 4.125,
  NAVBAR_VERTICAL: BASE,
  NAVBAR_TITLE_FLEX: 2,
  NAVBAR_TITLE_HEIGHT: height * 0.07,
  NAVBAR_TITLE_TEXT: BASE * 0.875,
  NAVBAR_LEFT_FLEX: 0.5,
  NAVBAR_LEFT_HEIGHT: height * 0.07,
  NAVBAR_LEFT_MARGIN: BASE,
  NAVBAR_RIGHT_FLEX: 0.5,
  NAVBAR_RIGHT_HEIGHT: height * 0.07,
  NAVBAR_RIGHT_MARGIN: BASE,

  // Checkbox
  CHECKBOX_WIDTH: 20,
  CHECKBOX_HEIGHT: 20,

  // Slider
  TRACK_SIZE: 4,
  THUMB_SIZE: 25,

  // Radio Button
  RADIO_WIDTH: 24,
  RADIO_HEIGHT: 24,
  RADIO_THICKNESS: 2,
}

const COLOR_OPACITY = {
  5: '0d',
  10: '1a',
  15: '26',
  25: '40',
  40: '66',
  50: '80',
  70: 'b3',
  80: 'cc',
}

const RN_DEFAULT: Theme = {
  dark: false,
  colors: {
    primary: COLORS.PRIMARY_SHADE,
    background: COLORS.WHITE,
    card: COLORS.WHITE,
    text: COLORS.BLACK,
    border: COLORS.TRANSPARENT,
    notification: COLORS.PRIMARY,
  },
}

const RN_DARK: Theme = {
  dark: true,
  colors: {
    primary: COLORS.SECONDARY_TINT,
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: COLORS.TERTIARY,
  },
}

export default {
  COLORS,
  COLOR_OPACITY,
  SIZES,
  RN_DEFAULT,
  RN_DARK,
}
