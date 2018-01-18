const toDoItem=require('../js/toDoItem.js');
let chai = require('chai');
let assert = chai.assert;

describe('Tests for item of todo',()=>{
  let item=new toDoItem('hello',1);
  describe('#itsText',()=>{
    it('should give text of item',()=>{
      assert.equal(item.itsText,'hello');
    })
  })
  describe('#updateText()',()=>{
    it('should update text of given item',()=>{
      item.updateText('world');
      assert.equal(item.itsText,'world');

    })
  })
  describe('#itsStatus',()=>{
    it('should give false as initial status',()=>{
      assert.notOk(item.itsStatus);
    })
  })
  describe('#markDone()',()=>{
    it('should give change status to true',()=>{
      item.markDone();
      assert.ok(item.itsStatus);
    })
  })
  describe('#markNotDone()',()=>{
    it('should give change status to false',()=>{
      item.markNotDone();
      assert.notOk(item.itsStatus);
    })
  })
  describe('#itsId',()=>{
    it('should give id of specific item',()=>{
      let id=item.itsId;
      assert.equal(id,1);
    })
  })
})
