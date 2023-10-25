module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx'],
        alias: {
          '@navigation': './navigation',
          '@components': './components',
          '@providers': './providers',
          '@constants': './constants',
          '@services': './services',
          '@screens': './screens',
          '@models': './models',
          '@errors': './errors',
          '@store': './store',
          '@hooks': './hooks',
          '@assets': './assets',
        },
      },
    ],
  ],
}
