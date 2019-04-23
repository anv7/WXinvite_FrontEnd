import { Base } from '../../utils/base.js';

class Process extends Base {
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
  
}
export { Process }