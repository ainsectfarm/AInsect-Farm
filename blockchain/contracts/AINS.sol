// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract AINS is ERC20, Ownable, ReentrancyGuard {
    mapping(address => uint256) public staked;
    mapping(address => uint256) public stakingStart;
    mapping(address => uint256) public greenPoints;

    uint256 public constant MAX_SUPPLY = 200_000_000 * 10 ** 18; // 200M cap
    uint256 public constant INITIAL_SUPPLY = 100_000_000 * 10 ** 18; // 100M initial

    // Reward: ~5% APY on staked tokens
    // Formula: staked * REWARD_RATE * timeStaked / (REWARD_DENOMINATOR * 365 days)
    uint256 public constant REWARD_RATE = 5;
    uint256 public constant REWARD_DENOMINATOR = 100;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event GreenPointsAdded(address indexed user, uint256 points);
    event GreenPointsClaimed(address indexed user, uint256 points);

    constructor() ERC20("AINS", "AINS") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        // Claim pending rewards before changing stake
        if (staked[msg.sender] > 0) {
            _claimRewards(msg.sender);
        }

        _transfer(msg.sender, address(this), amount);
        staked[msg.sender] += amount;
        stakingStart[msg.sender] = block.timestamp;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(staked[msg.sender] >= amount, "Insufficient staked amount");

        // Claim pending rewards before unstaking
        _claimRewards(msg.sender);

        // State update BEFORE external call (checks-effects-interactions)
        staked[msg.sender] -= amount;
        if (staked[msg.sender] == 0) {
            stakingStart[msg.sender] = 0;
        }

        _transfer(address(this), msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    function claimRewards() external nonReentrant {
        uint256 reward = _claimRewards(msg.sender);
        require(reward > 0, "No rewards to claim");
    }

    function _claimRewards(address user) internal returns (uint256) {
        uint256 reward = calculateRewards(user);
        if (reward == 0) return 0;

        stakingStart[user] = block.timestamp;
        _safeMint(user, reward);

        emit RewardsClaimed(user, reward);
        return reward;
    }

    function calculateRewards(address user) public view returns (uint256) {
        if (staked[user] == 0) return 0;
        uint256 timeStaked = block.timestamp - stakingStart[user];
        // 5% APY: staked * 5 / 100 * timeStaked / 365 days
        return (staked[user] * REWARD_RATE * timeStaked) / (REWARD_DENOMINATOR * 365 days);
    }

    function addGreenPoints(address user, uint256 points) external onlyOwner {
        require(user != address(0), "Invalid address");
        require(points > 0, "Points must be greater than 0");
        greenPoints[user] += points;
        emit GreenPointsAdded(user, points);
    }

    function claimGreenPoints() external nonReentrant {
        uint256 points = greenPoints[msg.sender];
        require(points > 0, "No green points to claim");

        greenPoints[msg.sender] = 0;
        uint256 tokensToMint = points * 10 ** decimals();
        _safeMint(msg.sender, tokensToMint);

        emit GreenPointsClaimed(msg.sender, points);
    }

    /// @dev Mint with supply cap enforcement
    function _safeMint(address to, uint256 amount) internal {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
}
