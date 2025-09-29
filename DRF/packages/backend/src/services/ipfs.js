const { create } = require('ipfs-http-client');
const IPFS_API = process.env.IPFS_API || 'https://ipfs.infura.io:5001';
const ipfs = create({ url: IPFS_API });

async function uploadDocument(buffer) {
  try {
    const { path } = await ipfs.add(buffer);
    return path;
  } catch (err) {
    throw new Error('IPFS upload failed');
  }
}

async function getDocument(hash) {
  try {
    const chunks = [];
    for await (const chunk of ipfs.cat(hash)) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  } catch (err) {
    throw new Error('IPFS fetch failed');
  }
}

module.exports = { uploadDocument, getDocument };
