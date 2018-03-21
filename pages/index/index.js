Page({
  toPost: function(event) {
    // navigateTo是父子页面关系，最多有5层，会执行onHide生命周期
     wx.navigateTo({  
      url: '../post/post'
    }) 
    
    // redirectTo是平级页面关系会执行onUnload生命周期
    /* wx.redirectTo({  
      url: '../post/post',
    }) */
  }
})