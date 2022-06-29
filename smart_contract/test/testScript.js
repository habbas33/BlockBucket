const Payment = artifacts.require("Payment");

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("Payment contract", function () {
  let accounts;

  before(async function () {
    accounts = await web3.eth.getAccounts();
  });

  describe("Deployment", async function () {
    
    it("Should deploy with the right greeting", async function () {
      const payment = await Payment.new();
      
      console.log(await payment.owner());
      console.log(accounts[0]);
  
    });
  });
});
