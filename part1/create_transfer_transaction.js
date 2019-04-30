const fs = require('fs');
const nem = require('nem-sdk').default;

const privateKeyFile = process.argv[2];
const recipient = process.argv[3];
const amount = Number(process.argv[4]);

// Create TX
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');
const common = nem.model.objects.create('common')('', privateKey);
const unpreparedTx = nem.model.objects.create('transferTransaction')(recipient, amount);
const networkId = nem.model.network.data.mainnet.id;
const preparedTx = nem.model.transactions.prepare('transferTransaction')(common, unpreparedTx, networkId);

console.log('Created transaction:');
console.log(JSON.stringify(preparedTx));
console.log();

// Sign TX
const keyPair = nem.crypto.keyPair.create(privateKey);
const serializedTx = nem.utils.serialization.serializeTransaction(preparedTx);
const signature = keyPair.sign(serializedTx);
const signedTx = {
  data: nem.utils.convert.ua2hex(serializedTx),
  signature: signature.toString()
};

console.log('Signed transaction:');
console.log(JSON.stringify(signedTx));
