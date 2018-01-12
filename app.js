let fs = require('fs');
const serveFile = require('./serveFile.js');
const timeStamp = require('./time.js').timeStamp;
const TODOApp = require('./webapp');
let registered_users = [{userName:'suyog',name:'suyog ukalkar',password:'suyog'},{userName:'shubham',name:'shubham jaybhaye',password:'shubham'}];
let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
  console.log(`${req.method} ${req.url}`);
}
let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};
let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/home','/login']) && req.user) res.redirect('/home.html');
}
let redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/home','/home.html','/logout']) && !req.user) res.redirect('/login');
}


let app = TODOApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);
app.use(serveFile);
console.log(app);
app.get('/',(req,res)=>{
  res.redirect('/index.html')
})
app.get('/login',(req,res)=>{
  res.setHeader('Content-type','text/html');
  // if(req.cookies.logInFailed){
  //   console.log(req.cookies.logInFailed)
  //   res.write('<p>logIn Failed</p>');
  // };
  res.write(fs.readFileSync(`./public/login.html`));
  res.end();
});
app.post('/login',(req,res)=>{
  let user = registered_users.find(u=>{
    return u.userName==req.body.userName&&u.password==req.body.password});
  if(!user) {
    // res.setHeader('Set-Cookie',`logInFailed=true,Max-Age=5`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  // res.setHeader('Set-Cookie',`logInFailed=false`);
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home.html');
});
app.get('/home.html',(req,res)=>{
  let data=fs.readFileSync(`./public${req.url}`);
  res.setHeader('Content-type','text/html');
  res.write(data);
  res.end();
});
app.post('/addTodo.html',(req,res)=>{
  console.log(req.body,675764765457);
  res.redirect('/addTodo.html')
})
app.get('/logout',(req,res)=>{
  // res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login');
});
module.exports = app;
