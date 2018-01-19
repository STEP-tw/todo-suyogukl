const User=require('../js/user.js');
let chai = require('chai');
let assert = chai.assert;

describe('Tests for User',()=>{
  let suyog;
  beforeEach(()=>{suyog=new User('suyog','246545')});
  describe('#name',()=>{
    it('should give name of user',()=>{
      assert.equal(suyog.name,'suyog');
    })
  })
  describe('#password',()=>{
    it('should give password of user',()=>{
      assert.equal(suyog.password,'246545');
    })
  })
  describe('#allToDo',()=>{
    it('should return todos`s of user',()=>{
      assert.deepEqual(suyog.allToDo,[]);
    })
  })
  describe('#addUserToDo()',()=>{
    it('should add todo to list of user`s todos',()=>{
      suyog.addUserToDo('hello','world');
      assert.deepEqual(suyog.allToDo,[
        {
          "id": 1,
          "itemId": 0,
          "toDoItems": [],
          "todoDescription": "world",
          "todoTitle": "hello"
        }
      ]);
    })
  })
  describe('#removeUserToDo',()=>{
    it('should return todos`s of user',()=>{
      suyog.addUserToDo('hello','world');
      suyog.addUserToDo('good','morning');
      suyog.removeUserToDo('good','morning');
      assert.deepEqual(suyog.allToDo,[
        {
          "id": 1,
          "itemId": 0,
          "toDoItems": [],
          "todoDescription": "world",
          "todoTitle": "hello"
        }
      ]);
    })
  })
  describe('#getAllTitles()',()=>{
    it('should return all titles of user todo`s',()=>{
      suyog.addUserToDo('hello','world');
      suyog.addUserToDo('good','morning');
      assert.deepEqual(suyog.getAllTodoTitles(),[ 'hello', 'good' ]);
    })
  })
  describe('#updateTitleOfTodo()',()=>{
    it('should update title of user todo`s',()=>{
      suyog.addUserToDo('hello','world');
      suyog.addUserToDo('good','morning');
      suyog.updateTitleOfTodo('1','goodBye');
      assert.deepEqual(suyog.getAllTodoTitles(),[ 'goodBye', 'good' ]);
    })
  })
  describe('#getTitleOfSpecificTodo()',()=>{
    it('should return specific title of user todo`s',()=>{
      suyog.addUserToDo('hello','world');
      suyog.addUserToDo('good','morning');
      assert.deepEqual(suyog.getSpecificTodoTitle('1'),'hello');
      assert.deepEqual(suyog.getSpecificTodoTitle('2'),'good');
    })
  })
  describe('#getItemsOfSpecificTodo()',()=>{
    it('should return specific title of user todo`s',()=>{
      suyog.addUserToDo('hello','world');
      suyog.addUserToDo('good','morning');
      assert.deepEqual(suyog.getItemsOfSpecificTodo('1'),[]);
    })
  })
})
