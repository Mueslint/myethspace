const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  
  // This compile our contract and generate the necessary files we need to work with our contract under the artifacts directory
  const myEthSpaceContractFactory = await hre.ethers.getContractFactory("MyEthSpace");
  
  //What's happening here is Hardhat will create a local Ethereum network just for this contract. 
  const myEthSpaceContract = await myEthSpaceContractFactory.deploy();
  await myEthSpaceContract.deployed();
  
  console.log("Contract deployed to:", myEthSpaceContract.address);
  console.log("Contract deployed by ", owner.address);

  let waveTxn = await myEthSpaceContract.wave();
  await waveTxn.wait();
  
  waveTxn = await myEthSpaceContract.like();
  await waveTxn.wait();

  waveTxn = await myEthSpaceContract.thumbsup();
  await waveTxn.wait();

  waveTxn = await myEthSpaceContract.connect(randomPerson).wave();
  await waveTxn.wait();

  let socials = await myEthSpaceContract.getTotalSocialActions();
  console.log("socials:", Number(socials.totalWaves), "👋", Number(socials.totalLikes), "👍", Number(socials.totalLikes), "💘");
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