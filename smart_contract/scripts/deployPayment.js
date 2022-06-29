const main = async () => {
    const Payment = await hre.ethers.getContractFactory("Payment");
    const payment = await Payment.deploy();
  
    await payment.deployed();
  
    console.log("Payment deployed to:", payment.address);
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
  
  runMain();