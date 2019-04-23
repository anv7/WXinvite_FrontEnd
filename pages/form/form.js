// pages/form/form.js
import { Form } from './form-model.js';
import { Base } from '../../utils/base.js';
const app = getApp();
var form = new Form();
var base = new Base();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allFormOver:false,
    bArr:[],
    isAsk: true,
    isNeed: false,
    formIndex: 0,
    formGoOn: false,
    basicQuestions:null,
    basicQuestionsLength:null,
    form: null,
    formLength: null,
    isJoin: null, // 是否参加会议
    meetJoin: true, //‘报名参加’界面
  },
  // 获取基本页面问题
  getBasicQuestions(){
    form.getBasicQuestions((res)=>{
      // console.log(res);
      // this.setData({
      //   basicQuestions:res,
      // })
      var firArr = [];
      for (var i in res) {
        var secArr = [];
        for (let n in res[i].child) {
          secArr.push(res[i].child[n]);
        };
        firArr.push(res[i]);
      }
      this.setData({
        basicQuestions: firArr,
        basicQuestionsLength: firArr.length
      })
    })
  },

  // 获取询问页面所有问题
  getForms() {
    form.getForm((res) => {
      var firArr = [];
      for (var i in res) {
        var secArr = [];
        for (let n in res[i].child) {
          secArr.push(res[i].child[n]);
        };
        firArr.push(res[i]);
      }
      this.setData({
        form: firArr,
        formLength: firArr.length
      })
    })
  },
  // 是否参加会议按钮
  ifJoin(event) {
    var num = event.currentTarget.dataset.num;
    this.setData({
      meetJoin: false
    })
    if (num === 1) {
      this.wxLogin();
      this.getBasicQuestions();
      this.getForms();
      this.setData({
        'isJoin': true
      })
    } else {
      this.setData({
        'isJoin': false
      })
    }
  },
  //微信登录
  wxLogin() {
    wx.login({
      success: function(res) {
        var code = res.code;
        console.log(res.code);
        form.postCode(code, (res) => {
          console.log(res);
          wx.setStorage({
            key: 'token',
            data: res.token,
          });
          wx.setStorage({
            key: 'uid',
            data: res.uid,
          });
        })
      }
    })
  },
  // picker Date事件
  basicDateChange(e){
    var fieldKey = e.currentTarget.dataset.index;
    console.log(fieldKey);
    console.log(e.detail.value);
    // var data = {};
    // data[fieldKey] = e.detail.value;
    // this.setData(data);
    let dataIntro = {};
    let keyIntro = 'bArr[' + fieldKey +']';
    dataIntro[keyIntro] = e.detail.value;
    this.setData(dataIntro);
    // 我x你奶 4:17
  },
  // radio事件
  basicRadioChange(e){
    console.log(e.currentTarget.dataset.radio)
  },
  // 基本信息提交
  basicFormSubmit(e) {
    var basicForm = e.detail.value;

    var packages = {};
    packages.activityId = app.globalData.activityId;
    packages.valueMap = basicForm;
    console.log(packages)
    // form.postForm(basicForm, (res) => {
    //   console.log(res);
    //   // 提交基础表单成功后
    //   if (res.code == 201) {
    //     if (this.data.formLength != null && this.data.formLength > 0) {
    //       this.setData({
    //         // formGoOn: true,
    //         isJoin: false,
    //         bArr:[],
    //       });
    //     } else {
    //       wx.switchTab({
    //         url: '/pages/place/place',
    //       })
    //     }
    //   }
    // })
  },
  // 自定义表单切换&提交
  otherFormSubmit(e) {
    if (this.data.formIndex < this.data.formLength-1){
      this.setData({
        formIndex: this.data.formIndex + 1,
        isAsk: true,
        isNeed: false,//关闭询问
      });
      if(e==0){//询问被否时
        console.log('跳过了');
        
      }else{
        console.log(e.detail.value);
        var isLast = 0;
        this.postDiyForm(e,isLast);

        // var diyForm = e.detail.value;
        // console.log(123);
        // form.postForm(diyForm,(res)=>{
        //   if(res.code == 201){

        //   }
        // });
      }
    }else{
      // 最后一个自定义表单提交
      if (e == 0) { //跳过
        console.log('最后一个都跳过了');
        var diyForm = {};
        diyForm.formOver = 'over';
        form.postForm(diyForm,(res)=>{
          // console.log(res);
          if(res.code == 201){
            app.globalData.isFormOver = 1;
            this.setData({
              allFormOver: true,
            })
          }
        })
      }else{
        var isLast = 1;
        this.postDiyForm(e,isLast);
      }
      console.log('自定义表单结束&提交');
    }
  },
  // 自定义表单提交组件
  postDiyForm(e, isLast){
    var diyForm = e.detail.value;
    console.log(diyForm);
    if (isLast==1){
      diyForm.formOver = 'over'; //表单完成的标记
    }
    form.postForm(diyForm, (res) => {
      if (res.code == 201) {
        if (isLast==1){
          // 增加全局变量
          app.globalData.isFormOver = 1;
          // 原先的局部变量
          this.setData({
            allFormOver: true,
          });
        };
        
      } else {
        alert('请检查您的网络')
      }
    });
    console.log(212);
  },
  isNeed(event) {
    // console.log(event.currentTarget.dataset.need);
    var is = event.currentTarget.dataset.need;
    if (is == 1) {
      this.setData({
        isNeed: true,
        isAsk: false
      })
    } else {
      this.setData({
        isNeed: false,
        isAsk: false
      });
      var e = 0;
      this.otherFormSubmit(e);//0为不需要运行submit提交,除了最后一个自定义表单
    }
  },
  // picker:date选择器
  diyDateChange(e){
    console.log(e.currentTarget.dataset.sb);
    console.log('firPicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      firDate: e.detail.value
    })
  },
  // radio单选框
  firRadioChange(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      firSelect: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.isFormOver == 1){
      console.log('wakeUPP!!');
      this.setData({
        allFormOver: true,
      })
    }
    this._loadBackground();
  },
  _loadBackground() {
    form.getLocalStuff((res) => {
      var windowHeight = base.getWindowHeight();
      this.setData({
        'localBackground': res,
        'windowHeight': windowHeight //px
      });
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})