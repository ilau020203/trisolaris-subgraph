// import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
// import { Mint } from '../../generated/schema'
// import { Transfer } from '../../generated/templates/Pair/Pair'

// export function getOrCreateMint(event: Transfer, mintCount: i32): Mint {
//   const id = event.transaction.hash.toHex().concat('-').concat(BigInt.fromI32(mintCount).toString())

//   let mint = Mint.load(id)
//   if (mint === null) {
//     mint = new Mint(id)
//     mint.pair = event.address.toHex().toLowerCase()
//     mint.to = event.params.to.toHex().toLowerCase()
//     mint.liquidity = event.params.value.divDecimal(BigDecimal.fromString('1e18'))
//     mint.timestamp = event.block.timestamp
//     mint.transaction = event.transaction.hash.toHex()
//     mint.save()
//   }
//   return mint as Mint
// }
