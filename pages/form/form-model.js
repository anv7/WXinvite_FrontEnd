import { Base } from '../../utils/base.js';

class Form extends Base {
  constructor() {
    super();
  }
  getLocalStuff(callBack) {
    var params = {
      key: 'detailBg',
      sCallBack(res) {
        callBack && callBack(res)
      }
    }
    this.getStuff(params);
  }
  // 获取基础页面问题
  getBasicQuestions(callBack){
    var params={
      url:'form/basicQuestions',
      sCallBack(res){
        callBack&&callBack(res);
      }
    }
    this.request(params);
  }
  // 获取询问页面问题
  getForm(callBack){
    var params = {
      url: 'form/formArrive',
      sCallBack(res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
  // 发送code码 获取令牌
  postCode(code,callBack){
    var params = {
      url: 'token/user',
      type:'POST',
      data:{
        code:code,
      },
      sCallBack(res){
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
  // 提交form
  postForm(formData,callBack){
    // console.log(app.globalData.activityId)
    var params ={
      url: 'basicanswer',
      // url: 'basicanswer' + '?XDEBUG_SESSION_START=15045',
      type:'post',
      data: formData,
      sCallBack(res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
}
export { Form }