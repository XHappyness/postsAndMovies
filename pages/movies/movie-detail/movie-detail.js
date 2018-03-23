
var data = require("../../../data/movies-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id
    var allMovie = [].concat(data.inTheaters.movies, data.comingSoons.movies, data.top250.movies);
    var currntMovie = {};
    for (var i = 0; i < allMovie.length; i++) {
      if (allMovie[i].movieId == movieId) {
        currntMovie = allMovie[i];
        break;
      }
    }
  }
})