// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@safe-global/safe-smart-account/contracts/Safe.sol";
import "@safe-core-protocol/contracts/SafeSmartAccount.sol";

contract FraudDetection is Ownable {
    struct Transaction {
        address wallet;
        uint256 amount;
        uint256 riskScore;
        bool flagged;
    }

    mapping(bytes32 => Transaction) public transactions;

    event FraudFlagged(
        bytes32 indexed txHash,
        address wallet,
        uint256 riskScore
    );

    function flagFraud(
        bytes32 txHash,
        address wallet,
        uint256 amount,
        uint256 riskScore
    ) external onlyOwner {
        require(
            transactions[txHash].wallet == address(0),
            "Transaction already exists"
        );
        require(riskScore > 80, "Risk score too low");

        transactions[txHash] = Transaction(wallet, amount, riskScore, true);
        emit FraudFlagged(txHash, wallet, riskScore);
    }

    function getTransaction(
        bytes32 txHash
    ) external view returns (Transaction memory) {
        return transactions[txHash];
    }
}
