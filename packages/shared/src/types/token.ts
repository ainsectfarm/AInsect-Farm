export interface AinsToken {
  totalSupply: number      // 100_000_000
  symbol: "AINS"
  network: "Polygon" | "AgroAI"
  decimals: 18
}

export interface StakingPosition {
  address: string
  amount: bigint
  stakedAt: Date
  rewardDebt: bigint
}
