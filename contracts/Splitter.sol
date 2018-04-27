pragma solidity ^0.4.19;

contract Splitter {

    mapping(bytes32 => address) public namesAddresses;

    event LogPay(address sender, uint amount, uint splitting);

    function Splitter (address[] accounts) 
        public
    {
        namesAddresses['alice'] = msg.sender;
        namesAddresses['bob'] = accounts[0];
        namesAddresses['carol'] = accounts[1];
    }

    function getBalance(bytes32 name)
        public
        constant
        returns (uint)
    {
        return address(namesAddresses[name]).balance;
    }

    // todo: eliminate this function. 
    // have not found a way to pass 'this' as a parameter
    function getSplitterBalance()
        public
        constant
        returns (uint)
    {
        return address(this).balance;
    }

    
    function payAndSplit()
        public
        payable
        returns (bool)
    {
        require(msg.value!=0);
        require(msg.sender==namesAddresses['alice']);
        
        uint splitting = uint(msg.value)/uint(2);

        LogPay(msg.sender, msg.value, splitting);
        namesAddresses['bob'].transfer(splitting);
        namesAddresses['carol'].transfer(splitting);
        
        return true;
    }
}