const main = async () => {
  const recoContractFactory = await hre.ethers.getContractFactory("RecoPortal");
  const recoContract = await recoContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await recoContract.deployed();
  console.log("Contract Address:", recoContract.address);

  // Get contract balance.
  let contractBalance = await hre.ethers.provider.getBalance(recoContract.address);
  console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));

  // Sending recos
  let recoTxn = await recoContract.recommend("This is reco #1!");
  await recoTxn.wait();

  let recoTxn2 = await recoContract.recommend("This is reco #2!");
  await recoTxn2.wait();

  let recoTxn3 = await recoContract.recommend("This is reco #3!");
  await recoTxn3.wait();

  contractBalance = await hre.ethers.provider.getBalance(recoContract.address);
  console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));

  let allRecos = await recoContract.getAllReco();
  console.log(allRecos);
};

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
