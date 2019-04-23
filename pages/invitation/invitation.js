// pages/invitation/invitation.js
import { Invitation } from './invitation-model.js';
import { Base } from '../../utils/base.js';
var invitation = new Invitation();
var base = new Base();
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
    setTimeout(function () {
      wx.hideLoading()
    }, 200);
    // this._loadData();
    this._loadBackground();
    this._loadDocs();
    // this.watchStuff();
  },
  // watchStuff(){
  //   wx.getSavedFileList({
  //     success(res){
  //       console.log(res.fileList);
  //     }
  //   })
  // },
  _loadBackground(){
    invitation.getLocalStuff((res)=>{
      var windowHeight = base.getWindowHeight();
      this.setData({
        'localBackground': res,
        'windowHeight': windowHeight //px
      });
    });
  },
  _loadData() {
    var id = 2;
    var data = invitation.getBackgroundImg(id, (res) => {
      var windowHeight = base.getWindowHeight();
      this.setData({
        'page': res,
        'windowHeight': windowHeight //px
      });
    });
  },
  _loadDocs(){
    var sid = 1;
    var article = invitation.getDocs(sid,(res)=>{
      this.setData({
        'article':res,
      })
    })
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

  }
})