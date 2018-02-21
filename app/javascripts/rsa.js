var forge = require('node-forge');

/**
 * Generates the keys  needed for RSA.
 *
 * @param  {Function} callback A callback function taking in a keypair as a parameter
 * @return {Object}            The user's keypair
 */
function keygen(callback) {
  forge.pki.rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
    if (err) {
      // TODO: handle error
    }
    else {
      callback(keypair);
    }
  });
}

/**
 * Serializes a forge keypair into an object containing the PEM data of both keys.
 *
 * @param  {Object} keypair The forge keypair
 * @return {Object}         The keypair in PEM format
 */
function serialize(keypair) {
  return {
    publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
    privateKey: forge.pki.privateKeyToPem(keypair.privateKey),
  };
}

/**
 * Deserializes keys in PEM format to their original forge key objects.
 *
 * @param  {String} pem_formats The keypair in PEM format
 * @return {Object}             The forge keypair
 */
function deserialize(pem_formats) {
  return {
    publicKey: forge.pki.publicKeyFromPem(pem_formats.publicKey),
    privateKey: forge.pki.privateKeyFromPem(pem_formats.privateKey)
  }
}

/**
 * Decrypts message using the receiver's private key.
 * Defaults to RSAES PKCS#1 v1.5.
 *
 * @param  {Byte[]} bytes      Some encrypted sequence of bytes
 * @param  {Object} privateKey The receiver's private key (forge object)
 * @return {String}            The original message written by the sender
 */
function decrypt(bytes, privateKey) {
  var decrypted = privateKey.decrypt(bytes);
  return forge.util.decodeUtf8(decrypted);
}

/**
 * Encrypts message using the receiver's public key.
 * Defaults to RSAES PKCS#1 v1.5.
 *
 * @param  {String} message   The sender's message
 * @param  {Object} publicKey The receiver's public key (forge object)
 * @return {Byte[]}           The original
 */
function encrypt(message, publicKey) {
  var bytes = forge.util.encodeUtf8(message);
  return publicKey.encrypt(bytes);
}
