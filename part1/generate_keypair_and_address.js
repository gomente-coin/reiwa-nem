const fs = require('fs');
const nem = require('nem-sdk').default;

const keyDir = './keys';

// Generate private key
const randomBytes = nem.crypto.nacl.randomBytes(32);
const privateKey = nem.utils.convert.ua2hex(randomBytes);

// Derive public key
const keyPair = nem.crypto.keyPair.create(privateKey);
const publicKey = keyPair.publicKey.toString();

// Derive address
const networkId = nem.model.network.data.mainnet.id;
const address = nem.model.address.toAddress(publicKey, networkId);

fs.mkdirSync(keyDir, { recursive: true });
fs.writeFileSync(`${keyDir}/${address}.privkey`, privateKey);
fs.writeFileSync(`${keyDir}/${address}.pubkey`, publicKey);

console.log(`Generated key files for ${address} in ${keyDir}`);
