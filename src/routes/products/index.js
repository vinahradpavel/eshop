const privateEndpoints = require('./private');
const publicEndpoints = require('./public');

module.exports = {
  private: privateEndpoints,
  public: publicEndpoints,
};
