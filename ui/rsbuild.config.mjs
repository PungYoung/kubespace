import { defineConfig } from '@rsbuild/core';
import { pluginVue2 } from '@rsbuild/plugin-vue2';
import { pluginSass } from '@rsbuild/plugin-sass';


export default defineConfig({
  plugins: [pluginVue2(), pluginSass()],
  dev: {
    assetPrefix: "/"
  },
  // tools:
  // {
  //   bundlerChain: (chain, { env }) => {
  //     if (env === 'development') {
  //       chain.devtool('cheap-module-eval-source-map');
  //       chain.plugins.delete("prefetch");
  //     }
  //   },
  // },
  server: {
    port: 8080,
    proxy: {
      '/api/v1': {
        target: 'http://192.168.30.101:32020',
        ws: true,
        secure: false,
        changeOrigin: true,
        timeout: 0,
        // https://github.com/http-party/node-http-proxy/issues/1520
        // sse浏览器断开连接后，proxy未与server断开连接
        onProxyRes: (proxyRes, req, res) => {
          res.on('close', () => {
            if (!res.writableEnded) {
              proxyRes.destroy();
            }
          })
        },
      },
      '/ws': {
        target: 'ws://192.168.30.101:32020',
        ws: true,
        secure: false,
        changeOrigin: true,
      },
      '/app': {
        target: 'http://192.168.30.101:32020',
        ws: true,
        secure: false,
        changeOrigin: true,
      }

    },
  },

  output: {
    distPath: {
      root: 'dist',
      html: '/',
      js: 'static/js',
      jsAsync: 'static/js/async',
      css: 'static/css',
      cssAsync: 'static/css/async',
      svg: 'static/svg',
      font: 'static/font',
      wasm: 'static/wasm',
      image: 'static/image',
      media: 'static/media',
    }
  },

  source: {
    // 指定入口文件
    entry: {
      index: './src/main.js',
    },
    alias: (opts) => {
      opts['@'] = './src';
    },

  },
  html: {
    template: './public/index.html',
  },
});