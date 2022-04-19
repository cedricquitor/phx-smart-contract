const main = async () => {
  const recoContractFactory = await hre.ethers.getContractFactory("RecoPortal");
  const recoContract = await recoContractFactory.deploy();
  await recoContract.deployed();
  console.log("Contract Address:", recoContract.address);

  let recoCount;
  recoCount = await recoContract.getTotalReco();
  console.log(recoCount.toNumber());

  // Sending recos
  let recoTxn = await recoContract.recommend("This is my reco!");
  await recoTxn.wait();

  const [owner, randomPerson] = await hre.ethers.getSigners();
  recoTxn = await recoContract.connect(randomPerson).recommend("This is another reco!");
  await recoTxn.wait();

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
