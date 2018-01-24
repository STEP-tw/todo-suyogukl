let chai = require('chai');
let dummyUser = require("../dummyUser");
let assert = chai.assert;
const Fs = require("./dummyFS");
const LoginHandler = require("../handlers/login_handler");
const PostLoginHandler = require("../handlers/post_login_handler");
const HomePageHandler = require("../handlers/home_page_handler");
const RedirectionHandler = require("../handlers/redirection_handler");
const TodoListHandler = require("../handlers/todo_list_handler");
const LogoutHandler = require("../handlers/logout_handler");
const RenderTodoHandler = require("../handlers/todo_render_handler");
let request = require('./requestSimulator.js');
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app', () => {
  describe('GET /bad', () => {
    it.skip('responds with 404', (done) => {
      request(app, { method: 'GET', url: '/bad' }, (res) => {
        console.log(res);
        assert.equal(res.statusCode, 404);
        done();
      })
    })
  })
})
describe('login_handler',()=>{
  describe('GET /login', () => {
    it('should serve login page when asked for /login', () => {
      let fs = new Fs("Welcome to login page");
      let handler = new LoginHandler(fs).getRequestHandler();
      let options = {
        method: 'GET', url: '/login'
      }
      request(handler, options, res => {
        th.body_contains(res, "Welcome to login page");
        th.status_is_ok(res);
      })
    });
    it('should serve login page with login failed message when cookie contains login failed', () => {
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
    });
  })

  describe('POST /login', () => {
    let allowedUsers = [];
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
    it('redirects to /homePage when user is valid', () => {
      let body = { userName: "suyog", password: "a" };
      let fs = new Fs("Welcome to login page");
      let handler = new PostLoginHandler(fs, allowedUsers).getRequestHandler();
      request(handler, { method: 'POST', url: '/login', body: body }, res => {
        th.should_be_redirected_to(res, "/homePage");
        th.should_not_have_cookie(res, 'message');
      })
    })
  });
})
describe('logout_handler',()=>{
  describe('GET /logout', () => {
    let handler = new LogoutHandler().getRequestHandler();
    it('if not logged in it redirects to /login', () => {
      request(handler, { method: 'GET', url: '/logout' }, res => {
        th.should_be_redirected_to(res, '/login');
      })
    });
    it('should delete session id of logged in user and redirects to /login ', () => {
      let handler = new LogoutHandler().getRequestHandler();
      let user = { userName: "suyog", sessionid: 1000 };
      let options = { method: 'GET', url: '/logout', user: user };
      request(handler, options, res => {
        th.should_be_redirected_to(res, '/login');
        assert.notExists(options.user.sessionid);
      })
    });
  })
})
describe('todo_action', () => {
  let mockedUser;
  beforeEach(() => {
    mockedUser = dummyUser;
  });
  describe('GET /addTodo', () => {
    it('redirects to / if not logged in', () => {
      let user = { userName: "suyog" };
      let body = { title: 'title', description: 'description' };
      let handler = new TodoListHandler("addTodo").getRequestHandler();
      request(handler, { method: 'POST', url: '/addTodo', user: user, dummyUser: dummyUser, body: body }, res => {
        assert.lengthOf(dummyUser.todos, 4)
        th.should_be_redirected_to(res, "/homePage");
      });
    })
  })
  describe('GET /homePage', () => {
    it('should serve content of home page when asked', () => {
      let templateContent = "Welcome ${name}";
      let fs = new Fs(templateContent);
      let handler = new HomePageHandler(templateContent).getRequestHandler();
      let user = { userName: "suyog" };
      request(handler, { method: 'GET', url: '/homePage', user: user }, res => {
        th.status_is_ok(res)
        th.body_contains(res, "Welcome suyog");
      })
    });
  });
  describe('POST /deleteTodo', () => {
    it('should delete todo from list', () => {
      let user = { userName: "suyog" };
      let body = { todo: 1 };
      let handler = new TodoListHandler("delete").getRequestHandler();
      request(handler, { method: 'POST', url: '/deleteTodo', user: user, dummyUser: mockedUser, body: body }, res => {
        th.should_be_redirected_to(res, "/homePage");
      });
    });
    it('should responds false for /deleteTodo req for non-existed todo', () => {
      let user = { userName: "suyog" };
      let body = { todo: 5 };
      let handler = new TodoListHandler("delete").getRequestHandler();
      request(handler, { method: 'POST', url: '/deleteTodo', user: user, dummyUser: mockedUser, body: body }, res => {
        th.body_contains(res,"false");
      });
    });
  });
  describe('redirection_handler', () => {
    it('should redirect to/login if not logged in ', () => {
      let handler = new RedirectionHandler().getRequestHandler();
      request(handler, { method: 'POST', url: '/addTodo' }, res => {
        th.should_be_redirected_to(res, "/login");
      });
    })
  })
  it('should redirect to /login if not logged in when url is unauthorised ', () => {
    let handler = new RedirectionHandler().getRequestHandler();
    request(handler, { method: 'POST', url: '/todo_1'}, res => {
      th.should_be_redirected_to(res, "/login");
    });
  })
  describe('todo_render_handler', () => {
    it('should serve todo page by their id', () => {
      let user = { userName: "suyog" };
      let template = "${todoItem} ${todo}";
      let contentToAssert = '<input id=1 type="checkbox" name="" value="1">hi<br>';
      let handler = new RenderTodoHandler(template).getRequestHandler();
      request(handler, { method: 'GET', url: '/todo_1', user: user, dummyUser: mockedUser }, res => {
        th.body_contains(res, contentToAssert);
      });
    });
  })
  describe('POST /addItem', () => {
    it('should add items to the given todo', () => {
      let user = { userName: "suyog" };
      let body = { todo: 2, text: "do something" };
      let handler = new TodoListHandler("addItem").getRequestHandler();
      request(handler, { method: 'POST', url: '/addItem', user: user, dummyUser: mockedUser, body: body }, res => {
        th.body_contains(res, "do something");
        assert.include(dummyUser.getItemsText('2'),"do something");
      });
    });
  });
  describe('POST /editTodo', () => {
    it('should edit title and description of given todo', () => {
      let user = { userName: "suyog" };
      let body = { id: 2, title: "outdoor games",description:'playing cricket' };
      let handler = new TodoListHandler("editTodo").getRequestHandler();
      request(handler, { method: 'POST', url: '/editTodo', user: user, dummyUser: mockedUser, body: body }, res => {
        assert.equal(dummyUser.getTodoTitle('2'),"outdoor games");
        th.should_be_redirected_to(res,'/homePage');
      });
    });
  });
})
