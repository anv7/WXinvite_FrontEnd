// pages/welcome/welcome.js
import {Welcome} from './welcome-model.js';
import { Base } from '../../utils/base.js';
const app = getApp();
var welcome = new Welcome();
var base = new Base();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // console.log(1);
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // getshow(){
  //   wx.getFileSystemManager().readFile({
  //     filePath: this.page, //选择图片返回的相对路径
  //     encoding: 'base64', //编码格式
  //     success: res => { //成功的回调
  //       console.log('data:image/png;base64,' + res.data)
  //     }
  //   })
  // },

  _loadData(){
    var id = 1;
    var data = welcome.getBackgroundImg(id,(res)=>{
      var windowHeight = base.getWindowHeight();
      // let base64 = wx.getFileSystemManager().readFileSync(res.background.url, 'base64');
      this.setData({
        // 'page': res.background.url,
        'page': 'http://10.10.25.155/WXinvitation/public/images/welcome-background.jpg',
        // 'page':'data:image/jpg;base64,' + base64,
        'windowHeight': windowHeight //px
      });
      
    });
  },

  inComeApp(){
    // this.checkUidState();
    this.writeActivityId();
    wx.switchTab({
      url: '../invitation/invitation',
    });
    var id = 2;
    welcome.getBackgroundImg(id, (res) => {
      welcome.getStuff(res.background.url);
      // console.log(res.background.url)
    });
    wx.showLoading({
      title: '正在为您加载',
    });
  },

  // 临时写入活动ID
  writeActivityId(){
    app.globalData.activityId = 1;
  },

  // 异步方法 尝试拿到用户缓存本地的uid
  checkUidState(){
    wx.getStorage({
      key: 'uid',
      success: function(res) {
        var uid = res.data;
        welcome.postTokenForCheck(uid,(res)=>{
          for(var i = 0;i<res.length;i++){
            if(res[i].key === 'formOver' && res[i].value === '"over"'){
              app.globalData.isFormOver = 1;
              console.log(app.globalData.isFormOver);
            }
          }
        });
      },
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