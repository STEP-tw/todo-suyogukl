const Todolist=require('../public/js/todolist.js');
let chai = require('chai');
let assert = chai.assert;

describe('Tests for todolist',()=>{
  let todo;
  beforeEach(()=>{todo=new Todolist('greeting','hello, welcome suyog',1)});
  describe('#updateTitle()',()=>{
    it('should update new title in todo',()=>{
      todo.updateTitle('welcomeText');
      assert.equal(todo.title,'welcomeText');
    })
  })
  describe('#updateDescription()',()=>{
    it('should update new description to todo',()=>{
      todo.updateDescription('hello world');
      assert.equal(todo.description,'hello world');
    })
  })
  describe('#addItem()',()=>{
    it('should add item to todo',()=>{
      todo.addItem('game');
      assert.deepEqual(todo.toDoItems[0],{ text: 'game', status: false, id: 1 })
    })
  })
  describe('#items',()=>{
    it('should return empty array of items',()=>{
      assert.deepEqual(todo.items,[]);
    })
    it('should return all items in an array',()=>{
      todo.addItem('game');
      todo.addItem('sport');
      assert.deepEqual(todo.items,
        [
          {
            "id": 1,
            "status": false,
            "text": "game"
          },
          {
            "id": 2,
            "status": false,
            "text": "sport"
          }
        ]
      );
    })
  })
  describe('#title',()=>{
    it('should return title of todo',()=>{
      assert.equal(todo.title,'greeting')
    })
  })
  describe('#description',()=>{
    it('should return description of todo',()=>{
      assert.equal(todo.description,'hello, welcome suyog')
    })
  })
  describe('#getSpecificItem',()=>{
    it('should return specific item if given text matches to any item`s text',()=>{
      todo.addItem('game','1');
      todo.addItem('sport','2');
      assert.deepEqual(todo.getSpecificItem('game'),{ text: 'game', status: false, id: 1 })
    })
  })
  describe('#getItemStatus',()=>{
    it('should give status of any specific item',()=>{
      todo.addItem('game','1');
      assert.notOk(todo.getItemStatus('game'))
    })
  })
  describe('#changeStatusAsDone',()=>{
    it('should change status of any specific item to true',()=>{
      todo.addItem('game','1');
      todo.changeStatusAsDone('game');
      assert.ok(todo.getItemStatus('game'))
    })
  })
  describe('#changeStatusAsNotDone',()=>{
    it('should reset status of any specific item to initial status as false',()=>{
      todo.addItem('game','1');
      todo.changeStatusAsDone('game');
      assert.ok(todo.getItemStatus('game'));
      todo.changeStatusAsNotDone('game');
      assert.notOk(todo.getItemStatus('game'));
    })
  })
})
