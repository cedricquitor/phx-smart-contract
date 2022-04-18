const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const recoContractFactory = await hre.ethers.getContractFactory("RecoPortal");
  const recoContract = await recoContractFactory.deploy();
  await recoContract.deployed();

  console.log("Contract deployed to:", recoContract.address);
  console.log("Contract deployed by:", owner.address);

  let recoCount;
  recoCount = await recoContract.getTotalReco();

  let recoTxn = await recoContract.recommend();
  await recoTxn.wait();

  recoCount = await recoContract.getTotalReco();

  recoTxn = await recoContract.connect(randomPerson).recommend();
  await recoTxn.wait();

  recoCount = await recoContract.getTotalReco();
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
