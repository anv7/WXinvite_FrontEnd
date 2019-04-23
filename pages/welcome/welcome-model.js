import {Base} from '../../utils/base.js';

class Welcome extends Base{
  constructor(){
    super();
  }
  getBackgroundImg(id,callBack){
    var params = {
      url:'background/'+id,
      sCallBack(res){
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
  postTokenForCheck(uid, callBack) {
    var params = {
      url: 'checkinfo',
      type: 'POST',
      data: uid,
      sCallBack(res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
  getStuff(url){
    var params ={
      url:url,
    }
    this.downStuff(params);
  }
}
export {Welcome};