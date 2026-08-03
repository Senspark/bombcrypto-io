/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    // transform SSR-safe do styled-components (substitui o babel plugin)
    styledComponents: true,
  },

  sassOptions: {
    // permite `@import 'bootstrap/scss/...'` no index.scss
    includePaths: [path.join(__dirname, 'node_modules')],
  },

  images: {
    // o código importa imagens esperando URL string (comportamento CRA);
    // desligamos o import estático do next/image e usamos asset/resource
    disableStaticImages: true,
  },

  webpack: (config) => {
    // polyfills de Node exigidos pelo web3 no browser (antes em config-overrides.js)
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify'),
      url: require.resolve('url'),
    };

    // imports de mídia viram URL, como no CRA
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|ico|bmp|svg|mp4|webm|ttf|otf|eot|woff2?)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash:8][ext]',
      },
    });

    return config;
  },
};

module.exports = nextConfig;
