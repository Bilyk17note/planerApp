module.exports = {
  transformer: {
    resolver: {
      sourceExts: ['js', 'jsx', 'ts', 'tsx'],
    },
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
