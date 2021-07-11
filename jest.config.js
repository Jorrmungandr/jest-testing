module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
