module.exports = {
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'svelte'],
  transformIgnorePatterns: [
    'node_modules/(?!(clsx)/)'
  ],
  bail: false,
  verbose: true
};
