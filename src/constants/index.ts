import { Address, BigDecimal, BigInt, ByteArray, Bytes, crypto, ethereum } from '@graphprotocol/graph-ts'
export * from './time'

export function getCreate2Address(from: Bytes, salt: Bytes, initCodeHash: Bytes): Bytes {
  return Bytes.fromHexString(
    Bytes.fromByteArray(
      crypto.keccak256(
        Bytes.fromHexString(
          '0xff' + from.toHexString().slice(2) + salt.toHexString().slice(2) + initCodeHash.toHexString().slice(2)
        )
      )
    )
      .toHexString()
      .slice(26)
  ) as Bytes
}

export const LEGACY = "LEGACY"

export const NULL_CALL_RESULT_VALUE = '0x0000000000000000000000000000000000000000000000000000000000000001'

export const BIG_INT_ZERO = BigInt.fromI32(0)

export const BIG_DECIMAL_ZERO = BigDecimal.fromString('0')

export const BIG_DECIMAL_ONE = BigDecimal.fromString('1')

export const BIG_INT_ONE = BigInt.fromI32(1)

export const SWAP_FEE = BigInt.fromI32(30)

export const TWAP_ENABLED = true

export const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')

export const FACTORY_ADDRESS = Address.fromString('0xc66F594268041dB60507F00703b152492fb176E7')

export const NATIVE_ADDRESS = '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d'

export const WHITELISTED_TOKEN_ADDRESSES: string[] = [
  '0xfa94348467f64d5a457f75f8bc40495d33c65abb', // TRI
  '0xb12bfca5a55806aaf64e99521918a4bf0fc40802', // USDC
  '0x4988a896b1227218e4a686fde5eabdcabd91571f', // USDT
  '0xc9bdeed33cd01541e1eed10f90519d2c06fe3feb', // WETH
  '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', // WNEAR
  '0xf4eb217ba2454613b15dbdea6e5f22276410e89e' // WBTC
]

export const STABLE_TOKEN_ADDRESSES: string[] = [
  '0x03B666f3488a7992b2385B12dF7f35156d7b29cD', // DAI
  '0xb12bfca5a55806aaf64e99521918a4bf0fc40802', // USDC
  '0x4988a896b1227218e4a686fde5eabdcabd91571f' // USDT
]

export const STABLE_POOL_ADDRESSES: string[] = STABLE_TOKEN_ADDRESSES.map<string>((address: string) => {
  const tokens: string[] = [address, NATIVE_ADDRESS].sort()
  return getCreate2Address(
    Bytes.fromByteArray(Bytes.fromHexString('0xc66F594268041dB60507F00703b152492fb176E7')),
    Bytes.fromByteArray(crypto.keccak256(ByteArray.fromHexString('0x' + tokens[0].slice(2) + tokens[1].slice(2)))),
    Bytes.fromByteArray(Bytes.fromHexString('0x754e1d90e536e4c1df81b7f030f47b4ca80c87120e145c294f098c83a6cb5ace'))
  ).toHex().toLowerCase()
})

// Minimum liqudiity threshold in native currency
export const MINIMUM_NATIVE_LIQUIDITY = BigDecimal.fromString('1000')

// export const STABLE_POOL_ADDRESSES: string[] = '{{ stablePoolAddresses }}'.split(',')

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
// export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString(
//   '{{ legacy.minimum_usd_threshold_new_pairs }}{{^legacy.minimum_usd_threshold_new_pairs}}3000{{/legacy.minimum_usd_threshold_new_pairs}}'
// )


export namespace PairType {
  export const CONSTANT_PRODUCT_POOL = "CONSTANT_PRODUCT_POOL";
}