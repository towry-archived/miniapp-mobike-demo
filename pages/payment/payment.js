// payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentBtns: [
      100, 50, 20, 10, 5
    ],
    selectedAmount: 100,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  /**
   * Click handlers.
   */
  onbtnClick(e) {
    var amount = e.target.dataset.amount;
    this.setData({
      selectedAmount: amount
    });
  },

  doPayment() {
    wx.showToast({
      title: '成功充值 ' + this.data.selectedAmount + ' $',
      icon: 'success',
      duration: 2000,
    });
  },

  selected(amount) {
    return amount === this.data.selectedAmount ? 'selected' : '';
  }
})
