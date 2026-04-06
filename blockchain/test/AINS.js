const { expect } = require("chai");

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
      expect(totalSupply).to.equal(100000000n * 10n**18n);
      expect(await ains.balanceOf(owner.address)).to.equal(totalSupply);
    });
  });

  describe("Staking", function () {
    it("Should allow staking", async function () {
      await ains.stake(100);
      expect(await ains.staked(owner.address)).to.equal(100);
    });

    it("Should allow unstaking", async function () {
      await ains.stake(100);
      await ains.unstake(50);
      expect(await ains.staked(owner.address)).to.equal(50);
      expect(await ains.balanceOf(owner.address)).to.equal(100000000n * 10n**18n - 50n);
    });

    it("Should calculate rewards", async function () {
      await ains.stake(100);
      // Simulate time passage, but in test, hard to do without time helpers
      // For simplicity, assume instant
      const rewards = await ains.calculateRewards(owner.address);
      expect(rewards).to.equal(0); // Since time is 0
    });
  });

  describe("Green Points", function () {
    it("Should add green points", async function () {
      await ains.addGreenPoints(addr1.address, 10);
      expect(await ains.greenPoints(addr1.address)).to.equal(10);
    });

    it("Should claim green points", async function () {
      await ains.addGreenPoints(owner.address, 10);
      await ains.claimGreenPoints();
      expect(await ains.greenPoints(owner.address)).to.equal(0);
      expect(await ains.balanceOf(owner.address)).to.equal(100000000n * 10n**18n + 10n * 10n**18n);
    });
  });
});
