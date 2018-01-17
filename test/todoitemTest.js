const toDoItem=require('../public/js/toDoItem.js');
let chai = require('chai');
let assert = chai.assert;

describe('Tests for item of todo',()=>{
  let item=new toDoItem('hello',1);
  describe('#getText',()=>{
    it('should give text of item',()=>{
      assert.equal(item.getText,'hello');
    })
  })
  describe('#getStatus',()=>{
    it('should give false as initial status',()=>{
      assert.notOk(item.getStatus);
    })
  })
  describe('#markDone()',()=>{
    it('should give change status to true',()=>{
      item.markDone();
      assert.ok(item.getStatus);
    })
  })
  describe('#markNotDone()',()=>{
    it('should give change status to false',()=>{
      item.markNotDone();
      assert.notOk(item.getStatus);
    })
  })
  describe('#getId',()=>{
    it('should give id of specific item',()=>{
      let id=item.getId;
      assert.equal(id,1);
    })
  })
})
