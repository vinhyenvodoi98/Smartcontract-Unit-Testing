Run loom

    ./loom run

Create contract by this command

    yarn truffle create contract DappToken

Deploy the ERC20 token contract to Testrpc

    yarn truffle migrate

or

    yarn truffle deploy -remove --network loom_dapp_chain

Create a test .js file for this contract.

    yarn truffle create test fixedsupplytoken

Run test

it run test in network 'test' when run **yarn truffle test** in version 4.1.13

    yarn truffle test ./test/fixedsupplytoken.js

setup network test

    yarn truffle test --network loom_dapp_chain

Have error
error contain revert when run in network loom_dapp_chain

Error: Number can only safely store up to 53 bits

in truffle 5.0.0 -> 5.0.24

Loom using web3js 1.0.0

goto loom console

    yarn truffle console --network loom_dapp_chain

truffle >=5.0.0 using web3@1.0.0

run

    DappToken.deployed().then((instance) => {tokenInstance = instance})

after deploy contract seaching **class_defaults** by command `tokenInstance` this address holding all token :

    class_defaults:
      { from: '0x917b7288EAe1bBE3b08d5503A209fcf8106D341d',
        gas: 6721975,
        gasPrice: 20000000000 },

testing transfer

    tokenInstance.transfer(account2.address , 1, {from : account1})

errer with

    tokenInstance.approve(spendingAccount.address, 10 ,{from : fromAccount.address});

**Thrown:**
**Error: Failed to commit Tx: invalid public key leght**
