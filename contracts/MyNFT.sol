// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage ,Ownable{
    uint256 private _tokenIdCounter;

    constructor() ERC721("Code Eater", "CER") Ownable(msg.sender)  {}

    function safeMint(address receiver, string memory tokenURI) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(receiver, tokenId);
        _setTokenURI(tokenId, tokenURI); // Use _setTokenURI to set the token URI
        _tokenIdCounter++;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://example.com/token/";
    }

    function getTokenIdCounter() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
