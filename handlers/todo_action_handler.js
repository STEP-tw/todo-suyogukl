class TodoHandler {
  constructor () {
  }
  execute(req,res){
    res.end();
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = TodoHandler;