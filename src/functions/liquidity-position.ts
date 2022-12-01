import { Address, ethereum } from '@graphprotocol/graph-ts'
import { LiquidityPosition } from '../../generated/schema'
import { BIG_INT_ZERO } from '../constants'

export function getOrCreateLiquidityPosition(user: Address, pair: Address, block: ethereum.Block): LiquidityPosition {
  const pairAddress = pair.toHex().toLowerCase()

  const userAddress = user.toHex().toLowerCase()

  const id = pairAddress.concat('-').concat(userAddress)

  let liquidityPosition = LiquidityPosition.load(id)

  if (liquidityPosition === null) {
    liquidityPosition = new LiquidityPosition(id)

    // liquidityPosition.user = userAddress
    liquidityPosition.pair = pairAddress
    liquidityPosition.balance = BIG_INT_ZERO
    liquidityPosition.createdAtBlock = block.number
    liquidityPosition.createdAtTimestamp = block.timestamp

    liquidityPosition.save()
  }

  return liquidityPosition as LiquidityPosition
}
