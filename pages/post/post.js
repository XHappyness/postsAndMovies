var data = require('../../data/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },


  /**
   * 函数
   */

  toPostDetail: function (event) {
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  toPostDetail2: function (event) {
    //target指的是当前点击的组件，currentTarget指的是事件捕获的组件
    //target这里指的是image，currentTarget这里指的是swiper
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postList: data.postList
    });
  },

})