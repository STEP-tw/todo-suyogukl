const toDoItem=require('../js/toDoItem.js');
let chai = require('chai');
let assert = chai.assert;

describe('Tests for item of todo',()=>{
  let item=new toDoItem('hello',1);
  describe('#text',()=>{
    it('should give text of item',()=>{
      assert.equal(item.text,'hello');
    })
  })
  describe('#updateText()',()=>{
    it('should update text of given item',()=>{
      item.updateText('world');
      assert.equal(item.text,'world');

    })
  })
  describe('#status',()=>{
    it('should give false as initial status',()=>{
      assert.notOk(item.status);
    })
  })
  describe('#markDone()',()=>{
    it('should give change status to true',()=>{
      item.markDone();
      assert.ok(item.status);
    })
  })
  describe('#markNotDone()',()=>{
    it('should give change status to false',()=>{
      item.markNotDone();
      assert.notOk(item.status);
    })
  })
  describe('#id',()=>{
    it('should give id of specific item',()=>{
      let id=item.id;
      assert.equal(id,1);
    })
  })
})
