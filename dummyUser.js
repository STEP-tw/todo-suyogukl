let User = require("./js/user.js");
let suyog = new User("suyog","a");
suyog.addTodo("at home","yesterday morning");
suyog.addTodo("at office", "yesterday morning");
suyog.addTodo("at pg", "yesterday morning");
module.exports=suyog;

