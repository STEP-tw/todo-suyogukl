const User = require('../js/user.js');
let chai = require('chai');
let assert = chai.assert;

describe('Tests for User', () => {
  let suyog;
  beforeEach(() => { suyog = new User('suyog', '246545') });
  describe('#name', () => {
    it('should give name of user', () => {
      assert.equal(suyog.name, 'suyog');
    })
  })
  describe('#password', () => {
    it('should give password of user', () => {
      assert.equal(suyog.password, '246545');
    })
  })
  describe('#allToDo', () => {
    it('should return todos`s of user', () => {
      assert.deepEqual(suyog.allToDo, []);
    })
  })
  describe('#addTodo()', () => {
    it('should add todo to list of user`s todos', () => {
      suyog.addTodo('title', 'description');
      assert.deepEqual(suyog.allToDo, [
        {
          "id": 1,
          "itemId": 0,
          "toDoItems": [],
          "todoDescription": "description",
          "todoTitle": "title"
        }
      ]);
    })
  })
  describe('#removeTodo', () => {
    it('should return todos`s of user', () => {
      suyog.addTodo('title', 'description');
      suyog.addTodo('good', 'morning');
      suyog.removeTodo('good', 'morning');
      assert.deepEqual(suyog.allToDo, [
        {
          "id": 1,
          "itemId": 0,
          "toDoItems": [],
          "todoDescription": "description",
          "todoTitle": "title"
        }
      ]);
    })
  })
  describe('#getAllTitles()', () => {
    it('should return all titles of user todo`s', () => {
      suyog.addTodo('title', 'description');
      suyog.addTodo('good', 'morning');
      assert.deepEqual(suyog.getAllTodoTitles(), ['title', 'good']);
    })
  })
  describe('#updateTitleOfTodo()', () => {
    it('should update title of user todo`s', () => {
      suyog.addTodo('title', 'description');
      suyog.addTodo('good', 'morning');
      suyog.updateTitleOfTodo('1', 'goodBye');
      assert.deepEqual(suyog.getAllTodoTitles(), ['goodBye', 'good']);
    })
  })
  describe('#getTodoTitle()', () => {
    it('should return specific title of user todo`s', () => {
      suyog.addTodo('title', 'description');
      suyog.addTodo('good', 'morning');
      assert.deepEqual(suyog.getTodoTitle('1'), 'title');
      assert.deepEqual(suyog.getTodoTitle('2'), 'good');
    })
  })
  describe('#getItemsOfTodo()', () => {
    it('should return specific title of user todo`s', () => {
      suyog.addTodo('title', 'description');
      suyog.addTodo('good', 'morning');
      assert.deepEqual(suyog.getItemsOfTodo('1'), []);
    })
  })
  describe('#titlesWithIDs()', () => {
    it('should give list of todo title with their ids', () => {
      suyog.addTodo('title', 'description');
      suyog.addTodo('good', 'morning');
      let expected = [{ id: 1, title: "title" }, { id: 2, title: "good" }]
      assert.deepEqual(suyog.titlesWithIDs,expected);
    })
  })
})
