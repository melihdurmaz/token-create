// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";


contract AIDEFIToken is ERC20Permit {
    string private _version;

    constructor(uint256 initialSupply, string memory version_) ERC20("AIDEFI", "AIDEFI") ERC20Permit("AIDEFI") {
        _version = version_;
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function version() public view returns (string memory) {
        return _version;
    }
}
