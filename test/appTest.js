let chai = require('chai');
let assert = chai.assert;
const Fs = require("./dummyFS");
const LoginHandler = require("../handlers/login_handler");
const PostLoginHandler = require("../handlers/post_login_handler");
let request = require('./requestSimulator.js');
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app', () => {
  describe('GET /bad', () => {
    it('responds with 404', done => {
      request(app, { method: 'GET', url: '/bad' }, (res) => {
        assert.equal(res.statusCode, 404);
        done();
      })
    })
  })
  describe('GET /login', () => {
    it('should serve login page when asked for /login', (done) => {
      let fs = new Fs("Welcome to login page");
      let handler = new LoginHandler(fs).getRequestHandler();
      let options = {
        method: 'GET', url: '/login'
      }
      request(handler, options, res => {
        th.body_contains(res, "Welcome to login page");
        th.status_is_ok(res);
      })
      done();
    });
  })

  describe('POST /login', () => {
    let allowedUsers=[];
    beforeEach(() => {
      allowedUsers = [{ userName: 'suyog', name: 'suyog ukalkar', password: 'a' }];
    });
    it('should redirect to /login when username is incorrect', () => {
      let fs = new Fs("Welcome to login page");
      let handler = new PostLoginHandler(fs, allowedUsers).getRequestHandler();
      let body = { userName: "suyogg" };
      request(handler, { method: 'POST', url: '/login', body: body }, res => {
        th.should_be_redirected_to(res, "/login");
        th.should_have_cookie(res, "message", "Login Failed; Max-Age=5");
      })
    })
    it('should serve login page with login failed message when cookie contains login failed', (done) => {
      let fs = new Fs("Login Failed");
      let handler = new LoginHandler(fs).getRequestHandler();
      let options = {
        method: 'GET', url: '/login',
        cookies: { message: "Login Failed" }
      }
      request(handler, options, res => {
        th.body_contains(res, "Login Failed");
        th.status_is_ok(res);
      })
      done();
    });
  });
  it.skip('redirects to addTodo.html for valid user login', done => {
    request(app, { method: 'GET', url: '/login', }, res => {
      th.should_be_redirected_to(res, "/homePage");
      th.should_not_have_cookie(res, 'message');
      done();
    })
  })
  describe('GET /logout', () => {
    it('if not logged in it redirects to /login', done => {
      request(app, { method: 'GET', url: '/logout' }, res => {
        th.should_be_redirected_to(res, '/login');
        done();
      })
    })
  })
  describe('GET /addTodo', () => {
    it('redirects to / if not logged in', done => {
      request(app, { method: 'GET', url: '/addTodo' }, res => {
        th.should_be_redirected_to(res, '/login');
        done();
      })
    })
  })
  describe('tests after logged in', () => {
    request(app, { method: 'POST', url: '/login', body: 'username=suyog&password=suyog' }, (res) => {
      let sessionid = res.headers['Set-Cookie'];
      let headers = {
        cookie: sessionid
      }
    })
  })
})
