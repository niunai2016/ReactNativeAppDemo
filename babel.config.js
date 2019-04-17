module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'react-native'
  ],
  plugins: [
    [
      'import',
      {
        'libraryName': 'antd-mobile-rn'
      }
    ]
  ]
};
