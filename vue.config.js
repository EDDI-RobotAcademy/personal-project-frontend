module.exports = {
  lintOnSave: false,
  transpileDependencies: [
    'vuetify',
  ],
  chainWebpack: config => {
    config.module.rules.delete('eslint')
  }
};

