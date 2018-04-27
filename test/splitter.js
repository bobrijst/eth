var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function(accounts) {

  var alice = accounts[0];
  var bob = accounts[1];
  var carol = accounts[2];

  beforeEach(function() {
    return Splitter.new([bob, carol], {from : alice})
    .then(function(instance) {
      contract = instance;
    });
  });


  it("should start", function() {
    assert.strictEqual(true, true, "Something is wrong.");
  });


  it("should have alice as owner and bob and carol as two splittees", function() {
    return contract.namesAddresses.call('alice', {from: alice})
    .then(function(_alice) {
      assert.strictEqual(_alice, alice, "Alice is not the owner.");
      return contract.namesAddresses.call('bob', {from: alice})
    })
    .then(function(_bob) {
      assert.strictEqual(_bob, bob, "Bob is not a splittee.");
      return contract.namesAddresses.call('carol', {from: alice})
    })
    .then(function(_carol) {
      assert.strictEqual(_carol, carol, "Carol is not a splitte.");
    })
  });


  it("should process a splitting",async function() {
    var amount = 10;
    var splitting = amount / 2;
    var txn;

    var preBalanceAlice = await(contract.getBalance.call('alice', {from:alice}));
    var preBalanceBob = await(contract.getBalance.call('bob', {from:alice}));
    var preBalanceCarol = await(contract.getBalance.call('carol', {from:alice}));
    
    var postBalanceAlice;
    var postBalanceBob;
    var postBalanceCarol;

    txn = await contract.payAndSplit({from: alice, value: amount});
  
    postBalanceAlice = await(contract.getBalance.call('alice', {from:alice}));
    postBalanceBob = await (contract.getBalance.call('bob', {from:alice}));
    postBalanceCarol = await(contract.getBalance.call('carol', {from:alice}));

    // todo -> include  gasPrice in the equation for alice 
    //assert.strictEqual(postBalanceAlice.toNumber(), (preBalanceAlice.toNumber() - amount), "Alice did not pay correctly.");
    assert.strictEqual(postBalanceBob.toNumber(), (preBalanceBob.toNumber() + splitting), "Bob did not receive the splitting.");
    assert.strictEqual(postBalanceCarol.toNumber(), (preBalanceCarol.toNumber() + splitting), "Carol did not receive the splitting.");     
  });

});
