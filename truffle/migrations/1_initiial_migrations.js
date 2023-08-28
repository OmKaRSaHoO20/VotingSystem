const fs = require("fs");
const path = require("path");

const VotingSystem = artifacts.require("VotingSystem");

// export default (deployer) => {
//   deployer.deploy(VotingSystem);
// };

module.exports = async function (deployer, accounts) {
  const adminAddress = accounts[0];

  await deployer.deploy(VotingSystem, { gas: 6721975 });
  const votingSystemInstance = await VotingSystem.deployed();

  const contractData = {
    adminAddress: adminAddress,
    contractAddress: votingSystemInstance.address,
    abi: VotingSystem.abi,
  };

  const dataFilePath = path.join(
    __dirname,
    "../../bct_frontend/src/credentials/data.js"
  );
  const dataFileContent = `module.exports = ${JSON.stringify(
    contractData,
    null,
    2
  )};\n`;

  fs.writeFileSync(dataFilePath, dataFileContent);

  console.log("Contract data saved to data.js");
};
