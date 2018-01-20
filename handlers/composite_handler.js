class CompositeHandler {
  constructor () {
    this.handlers = [];
  }
  addHandler(handler){
    this.handlers.push(handler);
    return this;
  }
  execute(req,res){
    let i = 0;
    while(!res.finished && i<this.handlers.length){
      this.handlers[i].getRequestHandler()(req,res);
      i++;
    }
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = CompositeHandler;
