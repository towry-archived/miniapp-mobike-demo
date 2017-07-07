
var getDeviceWidth = require('getDeviceWidth');
var device = require('./device');

module.exports = function rem(px) {
  var dw = getDeviceWidth();

  return px / (device.width / dw);
}
