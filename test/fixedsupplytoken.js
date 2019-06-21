var DappToken = artifacts.require('./DappToken.sol');

contract('DappToken', (accounts) => {
  var tokenInstance;

  it('initialozes the contract with the correct values', () => {
    return DappToken.deployed()
      .then((instance) => {
        tokenInstance = instance;
        return tokenInstance.name();
      })
      .then((name) => {
        assert.equal(name, 'DappToken', 'has the correct name');
        return tokenInstance.symbol();
      })
      .then((symbol) => {
        assert.equal(symbol, 'DAPP', 'has the correct symbol');
        return tokenInstance.standard();
      })
      .then((standard) => {
        assert.equal(standard, 'DApp Token v1.0', 'has the correct standard');
      });
  });

  it('allocates the initial upon deployment', () => {
    return DappToken.deployed()
      .then((instance) => {
        tokenInstance = instance;
        return tokenInstance.totalSupply();
      })
      .then((totalSupply) => {
        assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then((adminBalance) => {
        assert.equal(
          adminBalance.toNumber(),
          1000000,
          'it allocates the initial supply to the admin'
        );
      });
  });

  it('transfers token owership', () => {
    return DappToken.deployed()
      .then((instance) => {
        tokenInstance = instance;
        return tokenInstance.transfer.call(accounts[1], 999999999999999);
      })
      .then(assert.fail)
      .catch((error) => {
        assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
        return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
      })
      .then((success) => {
        assert.equal(success, true, 'it returns true');
        return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
      })
      .then((receipt) => {
        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
        assert.equal(
          receipt.logs[0].args._from,
          accounts[0],
          'logs the account the tokens are transferred from'
        );
        assert.equal(
          receipt.logs[0].args._to,
          accounts[1],
          'logs the account the tokens are transferred to'
        );
        assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
        return tokenInstance.balanceOf(accounts[1]);
      })
      .then((balance) => {
        assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving acount');
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then((balance) => {
        assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account');
      });
  });
});
