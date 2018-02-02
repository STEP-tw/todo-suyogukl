let chai = require('chai');
let dummyUser = require("../dummyUser");
let assert = chai.assert;
const SesssionManager = require("../js/sessionManager");
const FS = require("./dummyFS");
const request = require('supertest');
let app = require('../app.js');
let registered_users = [{ userName: 'suyog', name: 'suyog ukalkar', password: 'a' }];
let mockedFs = new FS();
app.fs = mockedFs;
app.user = dummyUser;
app.registered_users = registered_users;
let sessionIdGenerator = () => 1234;
app.temp = {}
app.temp.homeTemp = "${name}";
app.temp.todoTemplate = "${todoItem}";
app.sessionManager = new SesssionManager(sessionIdGenerator);
mockedFs.addFile("./public/login.html", "<title>Login Page</title >")
describe('app', () => {
  describe('GET /bad', () => {
    it('responds with 404', (done) => {
      request(app)
        .get("/bad")
        .expect(404)
        .end(done)
    })
  })
  describe('GET /', () => {
    it('should redirect to /login if not logged in', (done) => {
      request(app)
        .get("/")
        .expect(302)
        .expect("Location","/login")
        .end(done)
    });
    it('should redirect to /homePage if logged in', (done) => {
      request(app)
        .get("/")
        .set('Cookie', 'sessionid=1234')
        .expect(302)
        .expect("Location", "/homePage")
        .end(done)
    });
  });
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
    it('should delete session id of logged in user and redirects to /login ', (done) => {
      app.sessionManager.sessions["1234"] = "suyog";
      request(app)
        .get("/logout")
        .set('Cookie', 'sessionid=1234')
        .expect(302)
        .expect((res) => {
          assert.notExists(app.sessionManager.sessions["1234"])
        })
        .end(done)
    })
  })
})
describe('todo_action', () => {
  describe('POST /addTodo', () => {
    it('redirects to /login if not logged in', (done) => {
      request(app)
        .post('/addTodo')
        .expect(302)
        .expect('Location', '/login')
        .end(done)
    })
  })
  describe('GET /homePage', () => {
    it('should serve content of home page when asked', (done) => {
      app.sessionManager.sessions["1234"] = "suyog";
      request(app)
        .get('/homePage')
        .set('Cookie', 'sessionid=1234')
        .expect(/suyog/)
        .expect(200)
        .end(done);
    });
    it('redirects to /login if not logged in and aksed for /homePage ', (done) => {
      request(app)
        .get('/homePage')
        .expect(302)
        .expect('Location', '/login')
        .end(done)
    })
  });
  describe('POST /deleteTodo', () => {
    app.sessionManager.sessions["1234"] = "suyog";
    it('should delete todo from list', (done) => {
      request(app)
        .post("/deleteTodo")
        .send("todo=1")
        .set('Cookie', 'sessionid=1234')
        .expect(302)
        .expect('Location', '/homePage')
        .end(done)
    });
    it('should responds false for /deleteTodo req for non-existed todo', (done) => {
      app.sessionManager.sessions["1234"] = "suyog";
      request(app)
        .post('/deleteTodo')
        .send('todo=5')
        .set('Cookie', 'sessionid=1234')
        .expect('false')
        .end(done)
    });
  });
  describe('redirection_handler', () => {
    it('should redirect to /login if not logged in when url is unauthorised ', () => {
      request(app)
        .post("/todo_1")
        .expect(302)
        .expect("Location", "/login")
    });
  })
})
describe('todo_render_handler', () => {
  it('should serve todo page by their id', (done) => {
    request(app)
      .get("/todo_2")
      .set("Cookie", "sessionid=1234")
      .expect(200)
      .expect((res)=>{
        assert.include(res.text,'<span id=2_1 class="close" onclick="deleteItem(this.id)">X</span')
      })
      .end(done)
  });
})
describe('POST /addItem', () => {
  it('should add items to the given todo', (done) => {
    request(app)
      .post("/addItem")
      .set("Cookie", "sessionid=1234")
      .send("todo=2&text=do something")
      .expect(200)
      .expect(/do something/)
      .end(done)
  });
});
describe('POST /editTodo', () => {
  it('should edit title and description of given todo', (done) => {
    request(app)
      .post('/editTodo')
      .set("Cookie", "sessionid=1234")
      .send("id=2&title='outdoor games'&description='playing cricket'")
      .expect(302)
      .expect("Location", "/homePage")
      .end(done)
  });
  describe('POST /markdone', () => {
    it('should change status of given todo to done item if item is present', (done) => {
      request(app)
        .post('/markdone')
        .set("Cookie", "sessionid=1234")
        .send("todoId=2&itemId=1")
        .expect(200)
        .end(done)
    });
    it('should responds with 410 status code if item is not present', (done) => {
      request(app)
        .post('/markdone')
        .set("Cookie", "sessionid=1234")
        .send("todoId=2&itemId=7")
        .expect(410)
        .end(done)
    });
  });
  describe('POST /markUndone', () => {
    it('should change status of given todo to not done item if item is present', (done) => {
      request(app)
        .post('/markUndone')
        .set("Cookie", "sessionid=1234")
        .send("todoId=2&itemId=2")
        .expect(200)
        .end(done)
    });
    it('should responds with 410 status code if item is not present', (done) => {
      request(app)
        .post('/markUndone')
        .set("Cookie", "sessionid=1234")
        .send("todoId=2&itemId=7")
        .expect(410)
        .end(done)
    });
  });
  describe('POST /deleteItem', () => {
    it('should change status of given todo to not done item if item is present', (done) => {
      request(app)
        .post('/deleteItem')
        .set("Cookie", "sessionid=1234")
        .send("todoId=2&itemId=2")
        .expect(200)
        .end(done)
    });
    it('should responds with 410 status code if item is not present', (done) => {
      request(app)
        .post('/deleteItem')
        .set("Cookie", "sessionid=1234")
        .send("todoId=2&itemId=7")
        .expect(410)
        .end(done)
    });
  });
});
})
