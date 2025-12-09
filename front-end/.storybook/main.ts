import type { StorybookConfig } from '@storybook/react-webpack5';
import webpack from 'webpack';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    {
      "name": "@storybook/addon-essentials",
      "options": {
        "docs": false
      }
    },
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  webpackFinal: async (config) => {
    config.module = config.module || { rules: [] };
    config.module.rules = config.module.rules || [];

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      ],
    });

    config.resolve = config.resolve || {};
    config.resolve.extensions = config.resolve.extensions || [];
    config.resolve.extensions.push('.ts', '.tsx');

    // Ensure Vite-style env access works in Storybook (webpack) bundles
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        'import.meta.env': JSON.stringify({
          VITE_API_URL: process.env.VITE_API_URL || 'http://localhost:3000',
        }),
      })
    );

    return config;
  }
};
export default config;