const dummyUser = require('../dummyUser');
class TodoHandler {
  constructor () {
    this.user=dummyUser;
  }
  execute(req,res){
    res.end();
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = TodoHandler;