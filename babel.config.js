module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-flow'],
  plugins: [
    '@babel/transform-flow-strip-types',
    [
      '@babel/plugin-proposal-decorators', { 'legacy' : true }
    ],
    [
      '@babel/plugin-proposal-class-properties', {'loose': true}
    ],
    [
      '@babel/plugin-transform-runtime', {}
    ],
    ['import', { 'libraryName': '@ant-design/react-native' }]
  ]
};
