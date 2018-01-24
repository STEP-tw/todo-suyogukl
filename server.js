let fs = require('fs');
let dummyUser = require("./dummyUser");
const http = require('http');
const app =require('./app.js')
app.user = dummyUser;
app.fs = fs;

let homeTemp = fs.readFileSync("./templates/home", "utf8");
let todoTemp = fs.readFileSync("./templates/todoList", "utf8");
let registered_users = [{ userName: 'suyog', name: 'suyog ukalkar', password: 'a' }];
//-----------
let templates = {
  todoTemplate: todoTemp,
  homeTemp: homeTemp
}

app.temp = templates;
app.registered_users = registered_users;

const PORT = 5001;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
