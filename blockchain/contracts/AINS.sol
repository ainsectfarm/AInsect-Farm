// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AINS is ERC20 {
    mapping(address => uint256) public staked;
    mapping(address => uint256) public stakingStart;
    mapping(address => uint256) public greenPoints;

    uint256 public constant REWARD_RATE = 1; // Simple reward rate, e.g., 1 token per second per staked token

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event GreenPointsAdded(address indexed user, uint256 points);
    event GreenPointsClaimed(address indexed user, uint256 points);

    constructor() ERC20("AINS", "AINS") {
        _mint(msg.sender, 100000000 * 10**decimals()); // 100M supply
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _transfer(msg.sender, address(this), amount);
        staked[msg.sender] += amount;
        stakingStart[msg.sender] = block.timestamp;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(staked[msg.sender] >= amount, "Insufficient staked amount");

        staked[msg.sender] -= amount;
        _transfer(address(this), msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    function claimRewards() external {
        uint256 reward = calculateRewards(msg.sender);
        require(reward > 0, "No rewards to claim");

        stakingStart[msg.sender] = block.timestamp; // Reset staking start
        _mint(msg.sender, reward);

        emit RewardsClaimed(msg.sender, reward);
    }

    function calculateRewards(address user) public view returns (uint256) {
        if (staked[user] == 0) return 0;
        uint256 timeStaked = block.timestamp - stakingStart[user];
        return staked[user] * REWARD_RATE * timeStaked / 1e18; // Adjust for decimals
    }

    function addGreenPoints(address user, uint256 points) external {
        // Only owner or authorized can add, but for simplicity, anyone can call
        greenPoints[user] += points;
        emit GreenPointsAdded(user, points);
    }

    function claimGreenPoints() external {
        uint256 points = greenPoints[msg.sender];
        require(points > 0, "No green points to claim");

        greenPoints[msg.sender] = 0;
        // Perhaps mint tokens or transfer something, for now just reset
        // Assuming green points can be redeemed for tokens
        _mint(msg.sender, points * 10**decimals()); // 1 point = 1 token

        emit GreenPointsClaimed(msg.sender, points);
    }
}
