module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@molecules': './src/components/molecules',
          '@organisms': './src/components/organisms',
          '@navigations': './src/navigations',
          '@scenes': './src/scenes',
          '@helpers': './src/helpers',
          '@styles': './src/styles',
          '@utils': './src/utils',
        },
      },
    },
  },
};
