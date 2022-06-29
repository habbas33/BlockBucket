require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/BPneg9DxHCVH6pbElnT4eK5gkUdydn5Q',
    }
  }
};
