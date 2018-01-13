let fs = require('fs');
const serveFile = require('./serveFile.js');
const timeStamp = require('./time.js').timeStamp;
const User=require('./jsLib/toDoUser.js');
const TODOApp = require('./webapp');
let toS = o=>JSON.stringify(o,null,2);
let registered_users = [{userName:'suyog',name:'suyog ukalkar',password:'suyog'},{userName:'shubham',name:'shubham jaybhaye',password:'shubham'}];

// let createUser=function(userName,password,userName){
//   let fileData=fs.readFileSync('./data/toDoDatabase.js','utf8')
//   let fileData = fileData&&JSON.parse(fileData)||[];
//   registered_users.unshift(new User('suyog','suyog','Suyog Ukalkar'));
//   return;
// }
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
  if(req.urlIsOneOf(['/addTodo','/login']) && req.user) res.redirect('/addTodo.html');
}
let redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/addTodo','/addTodo.html','/logout']) && !req.user) res.redirect('/login');
}


let app = TODOApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);
app.use(serveFile);
app.get('/',(req,res)=>{
  res.redirect('/index.html')
})
app.get('/login',(req,res)=>{
  console.log(req.body);
  console.log(req.headers);
  let loginPage=fs.readFileSync(`./public/login.html`,'utf8');
  loginPage = loginPage.replace('MESSAGE', req.cookies.message || '');
  res.setHeader('Content-type','text/html');
  res.write(loginPage);
  res.end();
});

app.post('/login',(req,res)=>{
  let sessionid = new Date().getTime();
  let user = registered_users.find(u=>{
    return u.userName==req.body.userName&&u.password==req.body.password;
  });
  if(user) {
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    user.sessionid = sessionid;
    res.redirect('/addTodo.html');
    return;
  }
  res.setHeader('Set-Cookie',`message=Login Failed; Max-Age=5`);
  res.redirect('/login');
  return;
});


app.get('/addTodo.html',(req,res)=>{
  let data=fs.readFileSync(`./public${req.url}`);
  res.setHeader('Content-type','text/html');
  res.write(data);
  res.end();
});
app.post('/addTodo.html',(req,res)=>{
  res.redirect('/addTodo.html')
})
app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login');
});

app.post('/addTodo',function(req,res){
  let data = req.body;
  res.write(data.toString());
  res.end();
})
module.exports = app;
