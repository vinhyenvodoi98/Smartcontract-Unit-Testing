var DappToken = artifacts.require('./DappToken.sol');

contract('DappToken', (accounts) => {
  it('set to total supply upon deployment', () => {
    return DappToken.deployed()
      .then((instance) => {
        tokenInstance = instance;
        return tokenInstance.totalSupply();
      })
      .then((totalSupply) => {
        AssertPlus.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
      });
  });
});
