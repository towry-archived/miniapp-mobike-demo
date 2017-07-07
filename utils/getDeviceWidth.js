var deviceWidth = null;

module.exports = function () {
  if (deviceWidth !== null) {
    return deviceWidth;
  }

  var sysInfo = wx.getSystemInfoSync();
  deviceWidth = sysInfo.screenWidth;

  return deviceWidth;
}
