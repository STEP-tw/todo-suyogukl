const StaticFileHandler=require("../handlers/static_file_handler");
const th = require("./testHelper");
let request = require("./requestSimulator");
const Fs =require("./dummyFS");
const assert = require('chai').assert;
describe('StaticFileHandler ', () => {
  let fs = new Fs("this is dummy");
  let handler = new StaticFileHandler(fs,"public");
  it('should give content of given file', () => {
    request(handler.getRequestHandler(),{url:"abc.txt",method:"GET"},(res)=>{
      th.body_contains(res,"this is dummy");
    })
  });
  it('should give content type of filepath', () => {
    assert.equal(handler.getContentType("./abc.css"),"text/css");
  });
  it('should set url to /index.html when only / is given', () => {
    request(handler.getRequestHandler(), { url: "/", method: "GET" }, (res) => {
      th.status_is_ok(res);
      th.body_contains(res, "this is dummy");
    })
  });
});