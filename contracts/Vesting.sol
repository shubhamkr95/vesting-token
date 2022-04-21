// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Token.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Vest {
    using SafeMath for uint256;

    address admin;
    Token token;
    uint256 totalTokens;

    struct Vesting {
        vestingRoles role;
        address beneficiary;
        uint256 cliffDuration;
        uint256 start;
        uint256 duration;
        uint256 amountAfterVesting;
        uint256 totalAmountPercentage;
    }

    enum vestingRoles {
        Advisor,
        Partnerships,
        Mentors
    }

    mapping(address => Vesting) private vested;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor(Token _tokenAddress) {
        admin = msg.sender;
        token = _tokenAddress;
        totalTokens = token.totalSupply();
    }

    function createVesting(
        vestingRoles _role,
        address _beneficiary,
        uint256 _cliffDuration,
        uint256 _vestingMonths
    ) external onlyAdmin {
        require(
            _role <= vestingRoles.Mentors,
            "Only Advisor(0), Patnerships(1), Mentors(2) are roles allowed"
        );

        require(
            _cliffDuration <= _vestingMonths,
            "cliff is longer than vesting duration"
        );

        require(
            _vestingMonths > block.timestamp,
            "TokenVesting: vestingMonths is less than current time"
        );

        uint256 _startTime = block.timestamp;
        uint256 _cliff = _startTime.add(_cliffDuration);
        uint256 _timeDuration = block.timestamp.add(_vestingMonths);

        uint256 vestedToken;
        uint256 totalTokenPercent;

        if (_role == vestingRoles.Advisor) {
            totalTokenPercent = 5;
            vestedToken = totalTokens.mul(totalTokenPercent) / 100;
        } else if (_role == vestingRoles.Partnerships) {
            totalTokenPercent = 0;
            vestedToken = totalTokens.mul(totalTokenPercent) / 100;
        } else {
            totalTokenPercent = 7;
            vestedToken = totalTokens.mul(totalTokenPercent) / 100;
        }

        vested[_beneficiary] = Vesting(
            _role,
            _beneficiary,
            _cliff,
            _startTime,
            _timeDuration,
            vestedToken,
            totalTokenPercent
        );
    }

    function releaseVesting(address _beneficiary) external payable {
        require(
            vested[_beneficiary].amountAfterVesting != 0,
            "Benificiary address not found"
        );

        require(
            msg.sender == vested[_beneficiary].beneficiary ||
                msg.sender == admin,
            "This function is authorized to admin or _beneficiary"
        );

        address receiver = payable(vested[_beneficiary].beneficiary);
        uint256 _amount = finalVestedAmount(
            vested[_beneficiary].duration,
            vested[_beneficiary].totalAmountPercentage
        );

        if (vested[_beneficiary].cliffDuration < block.timestamp)
            token.transferFrom(admin, receiver, _amount);
        // delete vested[_beneficiary];
    }

    function finalVestedAmount(uint256 _duration, uint256 _percentage)
        internal
        view
        returns (uint256)
    {
        uint256 totalTokenAmount = token.totalSupply();
        uint256 totalMonthsLeft = (_duration.sub(block.timestamp) /
            60 /
            60 /
            24) / 30;

        uint256 totalAmountNow;

        if (totalMonthsLeft <= 0) {
            totalAmountNow = totalTokenAmount.mul(_percentage) / 100;
        } else {
            totalAmountNow =
                (totalTokenAmount.mul(_percentage) / 100) /
                totalMonthsLeft;
        }
        return totalAmountNow;
    }

    function isVested(address _beneficiary) external view returns (bool) {
        if (vested[_beneficiary].beneficiary != address(0)) return true;
        else return false;
    }
}