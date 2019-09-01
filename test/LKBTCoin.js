var helper = require('./helper')
const LKBT = artifacts.require("LKBT");

contract('LKBTCoin', function(accounts) {
    it("should totalSupply 10000000000 LKBT Coin in the contract", function() {
        return LKBT.deployed().then(function(instance) {
          return instance.totalSupply.call();
        }).then(function(totalSupply) {
          assert.equal(helper.fromWei(totalSupply).valueOf(), 10000000000, "10000000000 wasn't in the contract");
        });
      });
    it("should put 10000000000 LKBT Coin in the first account", function() {
      return LKBT.deployed().then(function(instance) {
        //const totalSupply = instance.totalSupply.call();
        //console.log("LKBTCoin totalSupply: " + web3.utils.fromWei(totalSupply,'ether').valueOf());
        console.log(instance.balanceOf.call(accounts[0]))
        return instance.balanceOf.call(accounts[0]);
      }).then(function(balance) {
        assert.equal(helper.fromWei(balance).valueOf(), 10000000000, "10000000000 wasn't in the first account");
      });
    });
    it("should send coin correctly", async () => {

        // Get initial balances of first and second account.
        let account_one = accounts[0];
        let account_two = accounts[1];
    
        let amount = '10';
    
    
        let instance = await LKBT.deployed();
        let lkbt = instance;
    
        let balance = await lkbt.balanceOf.call(account_one);
        let account_one_starting_balance = helper.fromWei(balance);
    
        balance = await lkbt.balanceOf.call(account_two);
        let account_two_starting_balance = helper.fromWei(balance);
        await lkbt.transfer(account_two, helper.toWei(amount), { from: account_one });
    
        balance = await lkbt.balanceOf.call(account_one);
        let account_one_ending_balance = helper.fromWei(balance);
    
        balance = await lkbt.balanceOf.call(account_two);
        let account_two_ending_balance = helper.fromWei(balance);
    
        assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
        assert.equal(account_two_ending_balance, 10 , "Amount wasn't correctly sent to the receiver");
      });
});