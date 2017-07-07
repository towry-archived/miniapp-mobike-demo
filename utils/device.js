/**
 * 视觉稿设备尺寸.
 */

var width = 375;
var height = 667;

var sysInfo = wx.getSystemInfoSync();


module.exports = {
  width: width,
  height: height,
  windowWidth: sysInfo.windowWidth,
  windowHeight: sysInfo.windowHeight
}
