var Splitter = artifacts.require("./Splitter.sol");

module.exports = function(deployer, network, accounts) {
  console.log(accounts[1], accounts[2]);
  deployer.deploy(Splitter, [accounts[1], accounts[2]], {gas: 4500000});

};