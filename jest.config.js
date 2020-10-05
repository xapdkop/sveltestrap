module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  bail: false,
  verbose: false
};
