import { BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
// import { TokenPrice } from '../generated/schema'
import { Swap as SwapEvent, Sync as SyncEvent, Transfer as TransferEvent } from '../generated/templates/Pair/Pair'
import {
  BIG_DECIMAL_ZERO, BIG_INT_ZERO,
  WHITELISTED_TOKEN_ADDRESSES
} from './constants'
import {
  convertTokenToDecimal,
  // getOrCreateBundle,
  getOrCreateToken,
  getPair,
  // getTokenPrice,
  isBlacklistedToken
} from './functions'
import { getOrCreateFactory } from './functions/factory'
// import { getNativePriceInUSD, updateTokenPrice } from './pricing'
// import { isBurn, isInitialTransfer, isMint } from './transfer'


// export function updateTvlAndTokenPrices(event: SyncEvent): void {
//   const pairId = event.address.toHex().toLowerCase()
//   const pair = getPair(pairId)
//   const token0 = getOrCreateToken(pair.token0)
//   const token1 = getOrCreateToken(pair.token1)
//   const factory = getOrCreateFactory()

//   // Reset liquidity, will be updated again later when price is updated
//   token0.liquidity = token0.liquidity.minus(pair.reserve0)
//   token1.liquidity = token1.liquidity.minus(pair.reserve1)
//   token0.save()
//   token1.save()

//   factory.liquidityNative = factory.liquidityNative.minus(pair.trackedLiquidityNative)


//   pair.reserve0 = event.params.reserve0
//   pair.reserve1 = event.params.reserve1
//   const reserve0Decimals = convertTokenToDecimal(pair.reserve0, token0.decimals)
//   const reserve1Decimals = convertTokenToDecimal(pair.reserve1, token1.decimals)

//   if (pair.reserve1.notEqual(BIG_INT_ZERO)) {
//     pair.token0Price = reserve0Decimals.div(reserve1Decimals)
//   } else {
//     pair.token0Price = BIG_DECIMAL_ZERO
//   }

//   if (pair.reserve0.notEqual(BIG_INT_ZERO)) {
//     pair.token1Price = reserve1Decimals.div(reserve0Decimals)
//   } else {
//     pair.token1Price = BIG_DECIMAL_ZERO
//   }
//   pair.save()

//   const bundle = getOrCreateBundle()
//   bundle.nativePrice = getNativePriceInUSD()
//   bundle.save()



//   token0.save()
//   token1.save()



//   pair.save()

// }

export function updateVolume(event: SwapEvent): Volume {
  const pair = getPair(event.address.toHex().toLowerCase())
  const token0 = getOrCreateToken(pair.token0)
  const token1 = getOrCreateToken(pair.token1)

  const amount0In = convertTokenToDecimal(event.params.amount0In, token0.decimals)
  const amount1In = convertTokenToDecimal(event.params.amount1In, token1.decimals)
  const amount0Out = convertTokenToDecimal(event.params.amount0Out, token0.decimals)
  const amount1Out = convertTokenToDecimal(event.params.amount1Out, token1.decimals)
  const amount0Total = amount0Out.plus(amount0In)
  const amount1Total = amount1Out.plus(amount1In)






  token0.volume = token0.volume.plus(amount0Total)
  token0.save()

  token1.volume = token1.volume.plus(amount1Total)

  token1.save()


  pair.volumeToken0 = pair.volumeToken0.plus(amount0Total)
  pair.volumeToken1 = pair.volumeToken1.plus(amount1Total)
  pair.save()

  // Don't track volume for these tokens in total exchange volume
  if (!isBlacklistedToken(token0.id) && !isBlacklistedToken(token1.id)) {
    const factory = getOrCreateFactory()

    factory.save()
  }

  return {
    amount0Total,
    amount1Total
  }
}

// export function updateLiquidity(event: TransferEvent): void {
//   if (isInitialTransfer(event)) {
//     return
//   }

//   const pair = getPair(event.address.toHex().toLowerCase())

//   if (isMint(event)) {
//     pair.liquidity = pair.liquidity.plus(event.params.value)
//   }

//   if (isBurn(event)) {
//     pair.liquidity = pair.liquidity.minus(event.params.value)
//   }

//   pair.save()
// }

// /**
//  * Accepts tokens and amounts, return tracked amount based on if the token is priced
//  * If one token is priced, return amount in that token converted to USD.
//  * If both are, return average of two amounts
//  * If neither is, return 0
//  */
// export function getVolumeUSD(
//   tokenAmount0: BigDecimal,
//   tokenAmount1: BigDecimal,
//   pairAddress: string
// ): BigDecimal {
//   const bundle = getOrCreateBundle()

//   const pair = getPair(pairAddress)
//   const token0Price = getTokenPrice(pair.token0)
//   const token1Price = getTokenPrice(pair.token1)
//   const price0 = token0Price.derivedNative.times(bundle.nativePrice)
//   const price1 = token1Price.derivedNative.times(bundle.nativePrice)

//   // both tokens are priced, take average of both amounts
//   if (token0Price.derivedNative.gt(BIG_DECIMAL_ZERO) && token1Price.derivedNative.gt(BIG_DECIMAL_ZERO) ) {
//     return tokenAmount0.times(price0).plus(tokenAmount1.times(price1)).div(BigDecimal.fromString('2'))
//   }

//   // take full value of the priced token
//   if (token0Price.derivedNative.gt(BIG_DECIMAL_ZERO) && !token1Price.derivedNative.gt(BIG_DECIMAL_ZERO) ) {
//     return tokenAmount0.times(price0)
//   }

//   // take full value of the priced token
//   if (!token0Price.derivedNative.gt(BIG_DECIMAL_ZERO) && token1Price.derivedNative.gt(BIG_DECIMAL_ZERO) ) {
//     return tokenAmount1.times(price1)
//   }


//   // neither token is priced, tracked volume is 0
//   return BIG_DECIMAL_ZERO
// }

// /**
//  * Accepts tokens and amounts, return tracked amount based on if the token is priced
//  * If one token is priced, return amount in that token converted to USD * 2.
//  * If both are, return sum of two amounts
//  * If neither is, return 0
//  */
// export function getLiquidityUSD(
//   tokenAmount0: BigDecimal,
//   token0Price: TokenPrice,
//   tokenAmount1: BigDecimal,
//   token1Price: TokenPrice
// ): BigDecimal {
//   const bundle = getOrCreateBundle()
//   const price0 = token0Price.derivedNative.times(bundle.nativePrice)
//   const price1 = token1Price.derivedNative.times(bundle.nativePrice)

//   // both tokens are priced, take average of both amounts
//   if (token0Price.derivedNative.gt(BIG_DECIMAL_ZERO) && token1Price.derivedNative.gt(BIG_DECIMAL_ZERO) ) {
//     return tokenAmount0.times(price0).plus(tokenAmount1.times(price1))
//   }

//   // take full value of the priced token
//   if (token0Price.derivedNative.gt(BIG_DECIMAL_ZERO) && !token1Price.derivedNative.gt(BIG_DECIMAL_ZERO) ) {
//     return tokenAmount0.times(price0).times(BigDecimal.fromString('2'))
//   }

//   // take full value of the priced token
//   if (!token0Price.derivedNative.gt(BIG_DECIMAL_ZERO) && token1Price.derivedNative.gt(BIG_DECIMAL_ZERO) ) {
//     return tokenAmount1.times(price1).times(BigDecimal.fromString('2'))
//   }


//   // neither token is priced, tracked liqudity is 0
//   return BIG_DECIMAL_ZERO
// }



export class Volume {
  amount0Total: BigDecimal
  amount1Total: BigDecimal
}