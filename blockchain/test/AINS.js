const { expect } = require("chai");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("AINS", function () {
  let ains, owner, addr1, addr2;

  beforeEach(async function () {
    const AINS = await ethers.getContractFactory("AINS");
    [owner, addr1, addr2] = await ethers.getSigners();
    ains = await AINS.deploy();
  });

  describe("Deployment", function () {
    it("Should have correct name and symbol", async function () {
      expect(await ains.name()).to.equal("AINS");
      expect(await ains.symbol()).to.equal("AINS");
    });

    it("Should mint 100M tokens to owner", async function () {
      const totalSupply = await ains.totalSupply();
      expect(totalSupply).to.equal(100_000_000n * 10n ** 18n);
      expect(await ains.balanceOf(owner.address)).to.equal(totalSupply);
    });

    it("Should set deployer as owner", async function () {
      expect(await ains.owner()).to.equal(owner.address);
    });

    it("Should have MAX_SUPPLY of 200M", async function () {
      expect(await ains.MAX_SUPPLY()).to.equal(200_000_000n * 10n ** 18n);
    });
  });

  describe("Staking", function () {
    it("Should allow staking", async function () {
      const amount = 1000n * 10n ** 18n;
      await ains.stake(amount);
      expect(await ains.staked(owner.address)).to.equal(amount);
    });

    it("Should reject staking 0", async function () {
      await expect(ains.stake(0)).to.be.revertedWith("Amount must be greater than 0");
    });

    it("Should reject staking more than balance", async function () {
      await expect(ains.connect(addr1).stake(100)).to.be.revertedWith("Insufficient balance");
    });

    it("Should allow unstaking", async function () {
      const stakeAmount = 1000n * 10n ** 18n;
      await ains.stake(stakeAmount);
      await ains.unstake(400n * 10n ** 18n);
      expect(await ains.staked(owner.address)).to.equal(600n * 10n ** 18n);
    });

    it("Should reject unstaking more than staked", async function () {
      await ains.stake(100n * 10n ** 18n);
      await expect(ains.unstake(200n * 10n ** 18n)).to.be.revertedWith("Insufficient staked amount");
    });

    it("Should calculate rewards after time passes (~5% APY)", async function () {
      const stakeAmount = 1_000_000n * 10n ** 18n; // 1M tokens
      await ains.stake(stakeAmount);

      // Advance 365 days
      await time.increase(365 * 24 * 60 * 60);

      const rewards = await ains.calculateRewards(owner.address);
      const expectedReward = stakeAmount * 5n / 100n; // 5% of 1M = 50K
      // Allow small rounding tolerance
      expect(rewards).to.be.closeTo(expectedReward, 10n ** 18n);
    });

    it("Should auto-claim rewards on unstake", async function () {
      const stakeAmount = 1_000_000n * 10n ** 18n;
      await ains.stake(stakeAmount);

      await time.increase(365 * 24 * 60 * 60); // 1 year

      const balanceBefore = await ains.balanceOf(owner.address);
      await ains.unstake(stakeAmount);
      const balanceAfter = await ains.balanceOf(owner.address);

      // Balance should be: before + unstaked amount + rewards
      expect(balanceAfter).to.be.gt(balanceBefore + stakeAmount);
    });
  });

  describe("Green Points — Access Control", function () {
    it("Should allow owner to add green points", async function () {
      await ains.addGreenPoints(addr1.address, 10);
      expect(await ains.greenPoints(addr1.address)).to.equal(10);
    });

    it("Should reject non-owner adding green points", async function () {
      await expect(
        ains.connect(addr1).addGreenPoints(addr1.address, 10)
      ).to.be.revertedWithCustomError(ains, "OwnableUnauthorizedAccount");
    });

    it("Should reject adding points to zero address", async function () {
      await expect(
        ains.addGreenPoints(ethers.ZeroAddress, 10)
      ).to.be.revertedWith("Invalid address");
    });

    it("Should claim green points and mint tokens", async function () {
      await ains.addGreenPoints(owner.address, 10);
      await ains.claimGreenPoints();
      expect(await ains.greenPoints(owner.address)).to.equal(0);
      expect(await ains.balanceOf(owner.address)).to.equal(
        100_000_000n * 10n ** 18n + 10n * 10n ** 18n
      );
    });

    it("Should reject claiming zero green points", async function () {
      await expect(ains.claimGreenPoints()).to.be.revertedWith("No green points to claim");
    });
  });

  describe("MAX_SUPPLY Cap", function () {
    it("Should reject minting beyond MAX_SUPPLY via green points", async function () {
      // MAX_SUPPLY = 200M, initial = 100M, so max mintable = 100M
      // Try to claim 101M worth of green points
      await ains.addGreenPoints(owner.address, 101_000_000);
      await expect(ains.claimGreenPoints()).to.be.revertedWith("Would exceed max supply");
    });
  });
});
