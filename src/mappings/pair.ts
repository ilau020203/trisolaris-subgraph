import { Address } from '@graphprotocol/graph-ts'
import {
  Burn as BurnEvent,
  Mint as MintEvent,
  Swap as SwapEvent,
  Sync as SyncEvent,
  Transfer as TransferEvent
} from '../../generated/templates/Pair/Pair'
// import { handleBurn } from '../burn'
import {
  createLiquidityPositionSnapshot,
  getOrCreateLiquidityPosition,
  // getOrCreateUser,
  // updateFactorySnapshots,
  updatePairSnapshots,
  // updateTokenSnapshots
} from '../functions'
// import { handleMint } from '../mint'
import { handleSwap, updateApr } from '../swap'
import { createLiquidityPositions  } from '../transfer'
import { updateLiquidity, updateTvlAndTokenPrices, updateVolume } from '../update-price-tvl-volume'

export function onSync(event: SyncEvent): void {
  updateTvlAndTokenPrices(event)
}


export function onSwap(event: SwapEvent): void {
  const volume = updateVolume(event)
  handleSwap(event, volume.volumeUSD)
  updatePairSnapshots(event.block.timestamp, event.address, volume)
  updateApr(event)
}

