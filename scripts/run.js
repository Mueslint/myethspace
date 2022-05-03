const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  
  // This compile our contract and generate the necessary files we need to work with our contract under the artifacts directory
  const myEthSpaceContractFactory = await hre.ethers.getContractFactory("MyEthSpace");
  
  //What's happening here is Hardhat will create a local Ethereum network just for this contract. 
  const myEthSpaceContract = await myEthSpaceContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await myEthSpaceContract.deployed();
  
  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    myEthSpaceContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveTxn = await myEthSpaceContract.wave("A message!");
  await waveTxn.wait(); // Wait for the transaction to be mined
  
  waveTxn = await myEthSpaceContract.connect(randomPerson).like("Another message!");
  await waveTxn.wait(); // Wait for the transaction to be mined
  

  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(myEthSpaceContract.address);
   console.log(
     "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );
  let allMessages = await myEthSpaceContract.getAllMessages();
  console.log(allMessages);
}

const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();