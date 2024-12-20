const admin = require("firebase-admin");
const { ethers } = require("ethers");

// Firebase Admin SDK setup
admin.initializeApp({
  credential: admin.credential.cert(require("path/to/serviceAccountKey.json")),
  databaseURL: "https://your-database.firebaseio.com"
});

// Ethereum provider and contract setup
const provider = new ethers.providers.JsonRpcProvider("YOUR_ETH_RPC_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const contractAddress = "SMART_CONTRACT_ADDRESS";
const abi = [
  /* Contract ABI */
];
const contract = new ethers.Contract(contractAddress, abi, signer);

// Listen to Firebase Realtime Database events
const db = admin.database();
const ref = db.ref("path/to/your/data");

ref.on("child_added", async (snapshot) => {
  const operation = "CREATE";
  const tableName = "FirebaseCollection";
  const data = JSON.stringify(snapshot.val());

  await contract.addLog(operation, tableName, data);
});
