import {Config} from './config.js';

class Base {
  constructor(){
    this.baseRequestUrl = Config.restUrl;
  }
  // 转码本地图片 真机测试的要求 传参为异步返回值 特殊情况下调用
  changeBase(res,callBack){
    wx.getFileSystemManager().readFile({
      filePath: res,
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        // console.log('data:image/jpg;base64,' + res.data)
        var aa = 'data:image/jpeg;base64,' + res.data;
        callBack&&callBack(aa);        
      },
      fail: function () {
        console.log('changeImg Base64 failed in BASE');
      },
    })
  }
  //各种手机屏幕的高度
  getWindowHeight(){
    let windowHeight = wx.getSystemInfoSync().windowHeight;
    return windowHeight;
  }
// 读取的本地缓存背景图
  getStuff(params){
    var key = params.key;
    wx.getStorage({
      key: key,
      success(res) {
        let localImg = res.data;
        // 把本地图片转换为Base64格式
        wx.getFileSystemManager().readFile({
          filePath: localImg,
          encoding: 'base64', //编码格式
          success: res => {
            var aa = 'data:image/jpeg;base64,' + res.data;
            params.sCallBack && params.sCallBack(aa);
          },
          fail: function () {
            console.log('changeImg Base64 failed in BASE');
          },
        })
      },
    })
  }
// 下载背景图stuff并缓存入本地
  downStuff(params){
    // var url = params.url;
    var url = 'http://10.10.25.155/WXinvitation/public/images/detail-background.jpg';
    wx.downloadFile({
      url: url,
      success(res){
        if (res.statusCode === 200){
          var tempFilePaths = res.tempFilePath;
          wx.setStorage({
            key: 'detailBg',
            data: tempFilePaths,
          })
          // wx.saveFile({
          //   tempFilePath: tempFilePaths,
          //   success: function (res) {
          //     var saveFilePath = res.savedFilePath;
          //     console.log(saveFilePath)
          //   }
          // })
        }
      }
    })
  }
  request(params){
    var url = this.baseRequestUrl + params.url;
    if(!params.type){
      params.type = 'GET'
    }
    wx.request({
      url:url,
      data:params.data,
      method:params.type,
      header:{
        // 将post出的数据转为json格式呦
        'content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      success:function(res){
        // if(params.sCallBack){
        //   params.sCallBack(res);
        // }
        params.sCallBack && params.sCallBack(res.data);
      },
      fail:function(err){
        console.log(err);
      }
    })
  }
}
export {Base}