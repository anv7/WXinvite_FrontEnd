import { Base } from '../../utils/base.js';

class Invitation extends Base{
  constructor() {
    super();
  }
  getLocalStuff(callBack){
    var params = {
      key:'detailBg',
      sCallBack(res){
        callBack && callBack(res)
      }
    }
    this.getStuff(params);
  }
  getBackgroundImg(id, callBack) {
    var params = {
      url: 'background/' + id,
      sCallBack(res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
  getDocs(id, callBack){
    var params = {
      url: 'docs/' + id,
      sCallBack(res){
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
}
export {Invitation}