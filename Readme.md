Run loom

    ./loom run

Create contract by this command

    yarn truffle create contract DappToken

Deploy the ERC20 token contract to Testrpc

    yarn truffle migrate

Create a test .js file for this contract.

    yarn truffle create test fixedsupplytoken

Run test

    yarn truffle test ./test/fixedsupplytoken.js

Have error
Error: Number can only safely store up to 53 bits

in truffle 5.0.0 -> 5.0.24
