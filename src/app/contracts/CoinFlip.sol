pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

Contract CoinFlip is VRFConsumerBaseV2 {
   event CoinFlipRequest(unit256 requestId);
   event CoinFlipResult(unit256 requestId, bool didWin);

   struct CoinFlipStatus{
      unit256 fees;
      unit256 randomWord;
      address player;
      bool didWin;
      bool fulfilled;
      CoinFlipSelection choice;
   }

   enum CoinFlipSelection{
      HEADS,
      TAILS
   }

   mapping(unit256 => CoinFlipStatus) public statuses;

   address constant linkAddress = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;


   function flip(CoinFlipSelection choice) external payable returns(unit256){}
}