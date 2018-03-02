pragma solidity ^0.4.19;

contract Dmail {
    // exact size in bytes of pem file is 437
    mapping(address => string) public keyStore;
    mapping(address => string[]) public mailBoxes;
    
    //store_key(caller_address,caller_public_key) will store the caller’s public key as a value in a hashmap with the caller’s address as the key.
    function storeKey(string publicKey) returns (bool success) {
    	//TODO: Add check to see if public key length is 437
        keyStore[msg.sender] = publicKey;
        if (keyStore[msg.sender].length == publicKey.length){
            return true;
        }else{
        	return false;
        }
    }
    //send_mail(receiver_address,ciphertext,sender_address) will store ciphertext concatenated with sender_address as a value in a hashmap with the receiver_address as the key.
    function sendMail(address receiverAddress, string message) returns (bool success) {
        mailBoxes[receiverAddress].push(message);
        uint end_idx = mailBoxes[receiverAddress].length -1;
        if ((mailBoxes[receiverAddress][end_idx]).length() ==  message.length){
            return true;
        }else{
        	return false;
        }
        //TODO: append msg.sender as string
        //+string(msg.sender);
        
    }
}
