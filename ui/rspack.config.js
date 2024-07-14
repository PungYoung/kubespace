export default {
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader'],
            type: 'javascript/auto',
          },
          {
            test: /\.ts$/, // 如果需要在 Vue SFC 里使用 TypeScript, 请添加该规则
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                },
              },
            },
            type: 'javascript/auto',
          },
        ],
      },
      experiments: {
        css: false,
      },
    resolve: {
      extensionAlias: {
        '.js': ['.ts', '.js'],
      },
    },
  };