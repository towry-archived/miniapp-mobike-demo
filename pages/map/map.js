// map.js

var rem = require('../../utils/rem');
var device = require('../../utils/device');
var geo = require('../../utils/geo');

var controlId = 1;
var kControls = {
  money: {
    width: 40,
    id: controlId++,
  },
  resumePos: {
    id: controlId++,
  },
  scan: {
    id: controlId++,
    height: 52,
    width: 124,
  },
  stick: {
    id: controlId++,
    width: 24,
    height: 60,
  }
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude: 0,
    latitude: 0,

    controls: [{
      id: kControls.money.id,
      iconPath: '/assets/money_control.png',
      position: {
        top: device.windowHeight - kControls.money.width - 18,
        left: rem(device.width - kControls.money.width - 15),
        width: rem(kControls.money.width),
        height: rem(kControls.money.width)
      },
      clickable: true
    },

    {
      id: kControls.resumePos.id,
      iconPath: '/assets/resume_pos.png',
      position: {
        top: device.windowHeight - kControls.money.width - 18,
        left: rem(15),
        width: rem(kControls.money.width),
        height: rem(kControls.money.width),
      },
      clickable: true,
    },

    {
      id: kControls.scan.id,
      iconPath: '/assets/scan.png',
      position: {
        top: device.windowHeight - kControls.scan.height - 15,
        left: rem(device.width / 2 - kControls.scan.width / 2),
        width: rem(kControls.scan.width),
        height: rem(kControls.scan.height),
      },
      clickable: true,
    },

    {
      id: kControls.stick.id,
      iconPath: '/assets/map_stick.png',
      position: {
        top: device.windowHeight / 2 - rem(kControls.stick.height),
        left: rem(device.width / 2 - kControls.stick.width / 2),
        width: rem(kControls.stick.width),
        height: rem(kControls.stick.height),
      }
    }],

    circles: [],
    markers: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;

    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;

        self.setData({
          longitude: longitude,
          latitude: latitude
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map');
    console.log(this.mapCtx);
    this.mapCtx.getCenterLocation({
      success: function (res) {
        var center = {
          latitude: res.latitude,
          longitude: res.longitude,
        };
        var markers = this.createMarkers(center);


        this.setData({
          markers: markers,
        });

        this.includePoints();
        this.setCircles(center.latitude, center.longitude, 500);
      }.bind(this),
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // Listen to
  // custom methods
  controltap(e) {
    switch (e.controlId) {
      case kControls.resumePos.id:
        this.moveToCurrentLocation()
        break;
    }
  },

  /**
   * Click handler.
   */
  moveToCurrentLocation() {
    if (!this.mapCtx) {
      return;
    }

    this.mapCtx.moveToLocation();
    this.includePoints();
  },

  /**
   * Update the center circle.
   */
  updateCircles() {
    var self = this;
    this.wx.getCenterLocation({
      success: function (res) {
        self.setCircles(res.latitude, res.longitude);
      }
    });
  },

  /**
   * Set the center circle.
   * @param {Number} lat
   * @param {Number} long
   */
  setCircles(lat, long, radius) {
    if (!radius) {
      radius = 100;
    }
    var circle = {
      latitude: lat,
      longitude: long,
      color: '#CBD7EBAA',
      fillColor: '#CBD7EBAA',
      radius: rem(radius),
      strokeWidth: 0
    };

    var circles = [circle];

    this.setData({
      circles: circles
    });
  },

  // Listen for region move
  regionchange(e) {
  },

  createMarkers(center) {
    var nums = 30;
    var markers = [];
    var markerCenter = null;
    // find bike within 500 meters.
    var distance = 500;
    var marker = null;

    function isWhite() {
      var v = Math.random() * 10 | 0;

      return v <= 5;
    }

    for (var i = 0; i < nums; i++) {
      markerCenter = geo.randomPoint(center, distance);
      marker = {
        id: i + 1,
        latitude: markerCenter.latitude,
        longitude: markerCenter.longitude,
        iconPath: '/assets/marker_' + (isWhite() ? 'white' : 'red') + '.png',
        width: rem(40),
        height: rem(44),
      };
      markers.push(marker);
    }

    return markers;
  },

  includePoints() {
    var markers = this.data.markers;
    if (!markers.length || !this.mapCtx) {
      return;
    }

    let points = markers.map(function (item) {
      return {
        latitude: item.latitude,
        longitude: item.longitude
      }
    });

    this.mapCtx.includePoints({
      padding: [50, 50, 50, 50],
      points: points,
    });
  }
})
