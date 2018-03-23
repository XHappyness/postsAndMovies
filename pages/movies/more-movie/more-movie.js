// pages/movies/more-movie/more-movie.js
var movieData = require("../../../data/movies-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    movies: [],
    hasNoMore: false
  },

  onReachBottom: function(event) {
    wx.showNavigationBarLoading();
    if (this.data.movies.length < 18) {
      var movies = this.data.movies.concat(this.data.movies);
      this.setData({
        movies: movies
      });
    } else {
      this.setData({
        hasNoMore: true
      });
    }
    wx.hideNavigationBarLoading();
  },

  onPullDownRefresh: function(event) {
    var movies = this.data.movies.reverse();
    if (movies.length>9) {
      movies.splice(0,9);
    }
    this.setData({
      movies: movies
    });
    wx.stopPullDownRefresh();
  },

  toMovieDetail: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: "../movie-detail/movie-detail?id=" + movieId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var movies = [];
    switch (category) {
      case "正在热映":
        movies = [].concat(movieData.inTheaters.movies, movieData.comingSoons.movies, movieData.top250.movies);
        break;
      case "即将上映":
        movies = [].concat(movieData.comingSoons.movies, movieData.inTheaters.movies, movieData.top250.movies);
        break;
      case "豆瓣Top250":
        movies = [].concat(movieData.top250.movies, movieData.inTheaters.movies, movieData.comingSoons.movies);
        break;
    };
    this.setData({
      movies: movies
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({//注意，这种改ui的接口只能在生命周期onReady，因为只有页面渲染完才能更改ui
      title: this.data.navigateTitle
    })
  }
})