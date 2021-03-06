// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
interface IVenus {
    function balanceOf(address _owner) external view returns (uint256 balance);
    function mint(uint mintAmount) external returns (uint);
    function redeem(uint redeemTokens) external returns(uint);
    function exchangeRateStored() external view returns (uint256);
}