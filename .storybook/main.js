// // module.exports = {
// //   stories: ['../src/**/*.stories.js'],
// //   addons: [
// //     '@storybook/preset-create-react-app',
// //     '@storybook/addon-actions',
// //     '@storybook/addon-links',
// //   ],
// // };
// import React from 'react'
// import { addDecorator } from '@storybook/react';

 
// const path = require('path');
// module.exports = {
//  stories: ['../src/**/*.stories.tsx', '../src/styles/index.scss'],
//  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
//  webpackFinal: async config => {
//    // do mutation to the config
//   config.module.rules.push({
//    test: /\.(ts|tsx)$/,
//    use: [
//     // {
//     //  loader: require.resolve('ts-loader'),
//     // },
//     // Optional
//     // {
//     //  loader: require.resolve('react-docgen-typescript-loader'),
//     // },
//    ],
//   });
//   // config.module.rules.push({
//   //  test: /\.scss$/,
//   //  use: ['style-loader', 'css-loader', 'sass-loader'],
//   //  include: path.resolve(__dirname, '../'),
//   // });
//   config.resolve.extensions.push('.ts', '.tsx');
//   return config;
//  },
 
// };

// const styles: React.CSSProperties = {
//   textAlign: 'center'
// }

// const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
// addDecorator(CenterDecorator)


module.exports = {
  stories: ['../src/**/*.stories.tsx', '../src/styles/index.scss'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes('node_modules')
              }
              return true            
            }
          }
        }
      ]
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
