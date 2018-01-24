const timeStamp = require('../time.js').timeStamp;
let toS = o => JSON.stringify(o, null, 2);
class LogRequestHandler {
  constructor () {
  }
  execute(req,res){
    let text = ['------------------------------',
      `${timeStamp()}`,
      `${req.method} ${req.url}`,
      `HEADERS=> ${toS(req.headers)}`,
      `COOKIES=> ${toS(req.cookies)}`,
      `BODY=> ${toS(req.body)}`, ''].join('\n');
      console.log(`${req.method} ${req.url}`);
    req.app.fs.appendFile('./request.log', text, () => { });
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = LogRequestHandler
