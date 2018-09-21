module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/'
  ],
  moduleFileExtensions: [
    'js',
    'json'
    // 'scss'
  ],
  moduleNameMapper: {
    'pages(.*)$': '<rootDir>/pages$1',
    'containers(.*)$': '<rootDir>/containers$1',
    'components(.*)$': '<rootDir>/components$1',
    // 'styles(.*)$': '<rootDir>/styles$1',
    'enums(.*)$': '<rootDir>/enums$1',
    'tools(.*)$': '<rootDir>/tools$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  verbose: false
}
