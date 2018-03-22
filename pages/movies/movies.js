// pages/movies/movies.js
var data = require("../../data/movies-data.js");
var common = require("../../common/getStars.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoons: {},
    top250: {}
  },

  toMoreMovies: function(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    data.inTheaters.movies.forEach(function (item) {
      item.stars = common.convertToStarArray(item.stars);
    });
    data.comingSoons.movies.forEach(function (item) {
      item.stars = common.convertToStarArray(item.stars);
    });
    data.top250.movies.forEach(function (item) {
      item.stars = common.convertToStarArray(item.stars);
    });
    this.setData({
      inTheaters: data.inTheaters,
      comingSoons: data.comingSoons,
      top250: data.top250
    });
  },
})