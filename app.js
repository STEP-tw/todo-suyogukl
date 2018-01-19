let fs = require('fs');
const serveFile = require('./utils.js').serveFile;
const timeStamp = require('./time.js').timeStamp;
const suyog = require("./dummyUser.js");
const storeToDos = require('./utils.js').storeToDos;
const toHtml = require("./toHtml/toHtml.js");
const TODOApp = require('./todoApp.js');
let toS = o=>JSON.stringify(o,null,2);
let registered_users = [{userName:'suyog',name:'suyog ukalkar',password:'a'},{userName:'shubham',name:'shubham jaybhaye',password:'shubham'}];

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
}
let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};
let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/addTodo','/login']) && req.user) res.redirect('/addTodo.html');
}
let redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/addTodo','/addTodo.html','/logout']) && !req.user) res.redirect('/login');
}
const serveLoginPage=(req,res)=>{
  let loginPage=fs.readFileSync(`./public/login.html`,'utf8');
  loginPage = loginPage.replace('message', req.cookies.message || '');
  res.setHeader('Content-type','text/html');
  res.write(loginPage);
  res.end();
};
const servePostLoginPage=(req,res)=>{
  let sessionid = new Date().getTime();
  let user = registered_users.find(u=>{
    return u.userName==req.body.userName&&u.password==req.body.password;
  });
  if(user) {
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    user.sessionid = sessionid;
    res.redirect('/homePage');
    return;
  }
  res.setHeader('Set-Cookie',`message=Login Failed; Max-Age=5`);
  res.redirect('/login');
  return;
}
const serveHomePage=(req,res)=>{
  let home=fs.readFileSync(`./templates/home`,"utf8");
  let todos = suyog.titlesWithIDs;
  let html = toHtml.todos(todos);
  home=home.replace("todoHolder",html)
  res.setHeader('Content-type','text/html');
  res.write(home);
  res.end();
}
const serveAddTodoPage=(req,res)=>{
  let data=fs.readFileSync(`./public/`);
  res.setHeader('Content-type','text/html');
  res.write(data);
  res.end();
}
const servePostAddTodoPage=(req,res)=>{
  console.log(req.method);
  console.log(req.headers);
  console.log(req.body);
  res.redirect('/addTodo');
}
const serveLogOut=(req,res)=>{
  res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login');
}


let app = TODOApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);
app.use(serveFile);

app.get('/login',serveLoginPage);
app.post('/login',servePostLoginPage);
app.get('/homePage',serveHomePage);
app.get('/addTodo',serveAddTodoPage);
app.post('/addTodo',servePostAddTodoPage);
app.get('/logout',serveLogOut);

module.exports = app;
