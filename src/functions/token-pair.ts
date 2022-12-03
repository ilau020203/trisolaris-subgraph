import { BIG_INT_ONE } from '../constants'
import { _TokenPair } from '../../generated/schema'
import { getOrCreateToken } from './token'

export function createTokenPair(tokenId: string, pairId: string): _TokenPair {
  let token = getOrCreateToken(tokenId)
  const id = tokenId.concat(':').concat(pairId.toString())
  let tokenPair = new _TokenPair(id)
  tokenPair.token = id
  tokenPair.pair = pairId
  tokenPair.token = tokenId
  tokenPair.save()
  token.save()

  return tokenPair as _TokenPair
}
