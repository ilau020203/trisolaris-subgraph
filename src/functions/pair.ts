import { PairCreated } from '../../generated/Factory/Factory'
import { Pair } from '../../generated/schema'
import { Pair as PairTemplate } from '../../generated/templates'
import { BIG_DECIMAL_ZERO, BIG_INT_ONE, BIG_INT_ZERO, LEGACY, PairType, SWAP_FEE, TWAP_ENABLED ,STABLE_POOL_ADDRESSES } from '../constants'
import { getOrCreateFactory } from './factory'
import { getOrCreateToken } from './token'
import { createTokenPair } from './token-pair'

export function createPair(event: PairCreated): Pair {
  const id = event.params.pair.toHex().toLowerCase()

  let token0 = getOrCreateToken(event.params.token0.toHex().toLowerCase())
  let token1 = getOrCreateToken(event.params.token1.toHex().toLowerCase())

  const pair = new Pair(id)

  createTokenPair(token0.id, id)
  createTokenPair(token1.id, id)

  pair.name = token0.symbol.concat('-').concat(token1.symbol)
  pair.type = PairType.CONSTANT_PRODUCT_POOL

  pair.token0 = token0.id
  pair.token1 = token1.id
  pair.createdAtTimestamp = event.block.timestamp
  pair.createdAtBlock = event.block.number

  pair.volumeToken0 = BIG_DECIMAL_ZERO
  pair.volumeToken1 = BIG_DECIMAL_ZERO


  pair.save()

  const factory = getOrCreateFactory()
  factory.pairCount = factory.pairCount.plus(BIG_INT_ONE)
  factory.save()

  // create the tracked contract based on the template
  PairTemplate.create(event.params.pair)

  return pair as Pair
}

export function getPair(address: string): Pair {
  return Pair.load(address) as Pair
}
