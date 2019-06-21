const { readFileSync } = require('fs');
const LoomTruffleProvider = require('loom-truffle-provider');

const chainId = 'default';
const writeUrl = 'http://127.0.0.1:46658/rpc';
const readUrl = 'http://127.0.0.1:46658/query';
const privateKey = readFileSync('./private_key', 'utf-8');

const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey);
const loomProvider = loomTruffleProvider.getProviderEngine();

console.log('Accounts list', loomProvider.accountsAddrList);
console.log('Accounts and Private Keys', loomProvider.accounts);

module.exports = {
  compilers: {
    solc: {
      version: '0.4.5'
    }
  },
  networks: {
    loom_dapp_chain: {
      provider: loomTruffleProvider,
      network_id: '*'
    }
  }
};
