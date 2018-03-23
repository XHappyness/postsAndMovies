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
    top250: {},
    inputValue: '',
    showSearchPage: false,
    showHistory: true,
    history: [],
    searchResult: []
  },

  toMoreMovies: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category,
    })
  },

  toMovieDetail: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: "movie-detail/movie-detail?id=" + movieId,
    })
  },

  /**
  * 搜索电影相关函数
  */
  showSearchPage: function (event) {
    this.setData({
      showSearchPage: true
    });
    wx.setNavigationBarTitle({
      title: '电影搜索',
    })
  },

  hideSearchPage: function (event) {
    this.setData({
      inputValue: '',
      showSearchPage: false,
      searchResult: [],
      showHistory: true
    });
    wx.setNavigationBarTitle({
      title: '电影列表',
    })
  },

  onbindInput: function (event) {
    var movieName = event.detail.value;
    if (movieName === '') {
      this.setData({
        searchResult: [],
        showHistory: true
      });
    };
  },


  onbindConfirm: function (event) {
    var movieName = event.detail.value;
    this.searchMovies(movieName);
  },
  searchMovies: function (movieName) {
    if (movieName === '') return;
    var movies = [];
    if (movieName.indexOf('无') == -1) {
      movies = [].concat(data.inTheaters.movies, data.comingSoons.movies, data.top250.movies);
    }
    this.setData({
      searchResult: movies,
      showHistory: false,
    });
    //搜索成功后将搜索条目加入历史搜索
    var history = this.data.history;
    var index = this.data.history.indexOf(movieName)
    if (index !== -1) {
      history.splice(index, 1);
    } 
    history = [].concat(movieName, history);
    this.setData({
      history: history
    });
    var historyStr = history.join(',');
    wx.setStorageSync('movieSearchHistory', historyStr);
  },

  searchByHistory: function (event) {
    var movieName = event.target.dataset.historyValue;
    this.setData({
      inputValue: movieName
    });
    this.searchMovies(movieName);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var history = [];
    if (wx.getStorageSync('movieSearchHistory')) {
      var history = wx.getStorageSync('movieSearchHistory').split(',');
    }

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
      top250: data.top250,
      history: history
    });
  },
})