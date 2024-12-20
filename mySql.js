const { ethers } = require("ethers");
const { Sequelize } = require("sequelize");

// Connect to MySQL database
const sequelize = new Sequelize("backed_by_smart_contract", "root", "root", {
  host: "localhost",
  dialect: "mysql"
});

// Ethereum provider and contract setup
const provider = new ethers.providers.JsonRpcProvider("YOUR_ETH_RPC_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const contractAddress = "SMART_CONTRACT_ADDRESS";
const abi = [
  /* Contract ABI */
];
const contract = new ethers.Contract(contractAddress, abi, signer);

// Example Sequelize hook
sequelize.addHook("afterCreate", async (record, options) => {
  const operation = "CREATE";
  const tableName = record.constructor.name;
  const data = JSON.stringify(record.dataValues);

  await contract.addLog(operation, tableName, data);
});
