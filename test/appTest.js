let chai = require('chai');
let dummyUser = require("../dummyUser");
let assert = chai.assert;
const FS = require("./dummyFS");
const LoginHandler = require("../handlers/login_handler");
const PostLoginHandler = require("../handlers/post_login_handler");
const HomePageHandler = require("../handlers/home_page_handler");
const RedirectionHandler = require("../handlers/redirection_handler");
const TodoListHandler = require("../handlers/todo_list_handler");
const LogoutHandler = require("../handlers/logout_handler");
const RenderTodoHandler = require("../handlers/todo_render_handler");
const request = require('supertest');
let app = require('../app.js');
let th = require('./testHelper.js');
let registered_users = [{ userName: 'suyog', name: 'suyog ukalkar', password: 'a' }];
let mockedFs = new FS();
app.fs = mockedFs;
app.user = dummyUser;
app.registered_users = registered_users;
mockedFs.addFile("./public/login.html","<title>Login Page</title >")
describe('app', () => {
  describe('GET /bad', () => {
    it('responds with 404', (done) => {
      request(app)
        .get("/bad")
        .expect(404)
        .end(done)
    })
  })
})
describe('login_handler', () => {
  describe('GET /login', () => {
    it('should serve login page when asked for /login', (done) => {
      request(app)
        .get('/login')
        .expect(200)
        .expect(/[<title>Login Page</title >]/)
        .end(done)
    });
    it('should serve login page with login failed message when cookie contains login failed', (done) => {
      request(app)
        .get('/login')
        .set("Cookie", "message=Login Failed")
        .expect(200)
        .expect(/[Login Failed]/)
        .end(done)
    });
  })

  describe('POST /login', () => {
    let allowedUsers = [];
    beforeEach(() => {
      allowedUsers = [{ userName: 'suyog', name: 'suyog ukalkar', password: 'a' }];
    });
    it('should redirect to /login when username is incorrect', (done) => {
      request(app)
        .post('/login')
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send("userName=suyoggg")
        .expect(302)
        .expect("Location", "/login")
        .end(done)
    })
    it('redirects to /homePage when user is valid', (done) => {
      request(app)
        .post('/login')
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send("userName=suyog")
        .expect(302)
        .expect("Location", "/homePage")
        .end(done)
    })
  });
})
describe('logout_handler', () => {
  describe('GET /logout', () => {
    it('if not logged in it redirects to /login', (done) => {
      request(app)
        .get("/logout")
        .expect(302)
        .expect("Location", "/login")
        .end(done)
    });
    it('should delete session id of logged in user and redirects to /login ', () => {
      let handler = new LogoutHandler().getRequestHandler();
      let user = { userName: "suyog", sessionid: 1000 };
      let options = { method: 'GET', url: '/logout', user: user };
      request(handler, options, res => {
        th.should_be_redirected_to(res, '/login');
        assert.notExists(options.user.sessionid);
      })
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
          th.body_contains(res, "false");
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
      request(handler, { method: 'POST', url: '/todo_1' }, res => {
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
          assert.include(dummyUser.getItemsText('2'), "do something");
        });
      });
    });
    describe('POST /editTodo', () => {
      it('should edit title and description of given todo', () => {
        let user = { userName: "suyog" };
        let body = { id: 2, title: "outdoor games", description: 'playing cricket' };
        let handler = new TodoListHandler("editTodo").getRequestHandler();
        request(handler, { method: 'POST', url: '/editTodo', user: user, dummyUser: mockedUser, body: body }, res => {
          assert.equal(dummyUser.getTodoTitle('2'), "outdoor games");
          th.should_be_redirected_to(res, '/homePage');
        });
      });
    });
  })
})
