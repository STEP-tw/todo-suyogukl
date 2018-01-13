let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('serves the login page',done=>{
      request(app,{method:'GET',url:'/'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'');
        th.body_does_not_contain(res,'Login Failed');
        th.should_not_have_cookie(res,'message');
        done()
      })
    })
    it('serves the login page with message for a failed login',done=>{
      request(app, { method: 'GET', url: '/', headers: { 'cookie':'message=Login Failed'}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })

  describe('POST /login',()=>{
    it('redirects to addTodo.html for valid user login',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=suyog&password=suyog'},res=>{
        th.should_be_redirected_to(res,'/addTodo.html');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })
  describe('Get /logout',()=>{
    it('if not logged in it redirects to /login',done=>{
      request(app,{method:'get',url:'/logout'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
  describe('Get /addTodo',()=>{
    it('redirects to / if not logged in',done=>{
      request(app,{method:'GET',url:'/addTodo'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
  describe('tests after logged in', () => {
    request(app, { method: 'POST', url: '/login', body:'username=suyog&password=suyog'},(res)=>{
      let sessionid = res.headers['Set-Cookie'];
      let headers = {
        cookie : sessionid
      }
    })
  })
})
