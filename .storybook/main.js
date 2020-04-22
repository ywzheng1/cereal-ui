// module.exports = {
//   stories: ['../src/**/*.stories.js'],
//   addons: [
//     '@storybook/preset-create-react-app',
//     '@storybook/addon-actions',
//     '@storybook/addon-links',
//   ],
// };
 
const path = require('path');
module.exports = {
 stories: ['../src/**/*.stories.tsx', '../src/styles/index.scss'],
 addons: ['@storybook/addon-actions', '@storybook/addon-links'],
 webpackFinal: async config => {
   // do mutation to the config
  config.module.rules.push({
   test: /\.(ts|tsx)$/,
   use: [
    // {
    //  loader: require.resolve('ts-loader'),
    // },
    // Optional
    // {
    //  loader: require.resolve('react-docgen-typescript-loader'),
    // },
   ],
  });
  // config.module.rules.push({
  //  test: /\.scss$/,
  //  use: ['style-loader', 'css-loader', 'sass-loader'],
  //  include: path.resolve(__dirname, '../'),
  // });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
 },
 
};