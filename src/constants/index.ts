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

export const ALL_PAIRS_UNDER_DEPLOY = ['0x63da4DB6Ef4e7C62168aB03982399F9588fCd198', '0x20F8AeFB5697B77E0BB835A8518BE70775cdA1b0', '0x03B666f3488a7992b2385B12dF7f35156d7b29cD', '0x2fe064B6c7D274082aa5d2624709bC9AE7D16C77', '0xbc8A244e8fb683ec1Fd6f88F3cc6E565082174Eb', '0x84b123875F0F36B966d0B6Ca14b31121bd9676AD', '0x5eeC60F348cB1D661E4A5122CF4638c7DB7A886e', '0xd1654a7713617d41A8C9530Fb9B948d00e162194', '0xdF8CbF89ad9b7dAFdd3e37acEc539eEcC8c47914', '0xa9eded3E339b9cd92bB6DEF5c5379d678131fF90', '0x61C9E05d1Cdb1b70856c7a2c53fA9c220830633c', '0x6443532841a5279cb04420E61Cf855cBEb70dc8C', '0x7be4a49AA41B34db70e539d4Ae43c7fBDf839DfA', '0x3dC236Ea01459F57EFc737A12BA3Bb5F3BFfD071', '0x48887cEEA1b8AD328d5254BeF774Be91B90FaA09', '0xd62f9ec4C4d323A0C111d5e78b77eA33A2AA862f', '0xdDAdf88b007B95fEb42DDbd110034C9a8e9746F2', '0x5913f644A10d98c79F2e0b609988640187256373', '0x47924Ae4968832984F4091EEC537dfF5c38948a4', '0xb419ff9221039Bdca7bb92A131DD9CF7DEb9b8e5', '0xFBc4C42159A5575a772BebA7E3BF91DB508E127a', '0x7B273238C6DD0453C160f305df35c350a123E505', '0x6277f94a69Df5df0Bc58b25917B9ECEFBf1b846A', '0xadAbA7E2bf88Bd10ACb782302A568294566236dC', '0x5E74D85311fe2409c341Ce49Ce432BB950D221DE', '0xbe753E99D0dBd12FB39edF9b884eBF3B1B09f26C', '0xbC0e71aE3Ef51ae62103E003A9Be2ffDe8421700', '0xbceA13f9125b0E3B66e979FedBCbf7A4AfBa6fd1', '0xBBf3D4281F10E537d5b13CA80bE22362310b2bf9', '0x1e0e812FBcd3EB75D8562AD6F310Ed94D258D008', '0x29C160d2EF4790F9A23B813e7544D99E539c28Ba', '0x6a29e635BCaB8aBeE1491059728e3D6D11d6A114', '0x120e713AD36eCBff171FC8B7cf19FA8B6f6Ba50C', '0x71dBEB011EAC90C51b42854A77C45C1E53242698', '0xA36DF7c571bEbA7B3fB89F25dFc990EAC75F525A', '0x53b65177803993C84F31AF4aE7E52FEB171b3b84', '0x25bED9DDD30c21a698ba0654f8Da0F381CA1A67b', '0x044b6B0CD3Bb13D2b9057781Df4459C66781dCe7', '0xa904CC86e3AB79Ae44caa7F13BDC13FFAcbbFF35']
export const ALL_TOKEN0 = ['0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xb12bfca5a55806aaf64e99521918a4bf0fc40802', '0x4988a896b1227218e4a686fde5eabdcabd91571f', '0x4988a896b1227218e4a686fde5eabdcabd91571f', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0x8bec47865ade3b172a928df8f990bc7f2a3b9f79', '0x8bec47865ade3b172a928df8f990bc7f2a3b9f79', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0x5ce9f0b6afb36135b5ddbf11705ceb65e634a9dc', '0x4988a896b1227218e4a686fde5eabdcabd91571f', '0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844', '0x2bf9b864cdc97b08b6d79ad4663e71b8ab65c45c', '0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xa33c3b53694419824722c10d99ad7cb16ea62754', '0x501ace9c35e60f03a2af4d484f49f9b1efde9f40', '0x07f9f7f963c5cd2bbffd30ccfb964be114332e30', '0x07f9f7f963c5cd2bbffd30ccfb964be114332e30', '0x7ca1c28663b76cfde424a9494555b94846205585', '0x7ca1c28663b76cfde424a9494555b94846205585', '0x4988a896b1227218e4a686fde5eabdcabd91571f', '0x293074789b247cab05357b08052468b5d7a23c5a', '0x4148d2ce7816f0ae378d98b40eb3a7211e1fcf0d', '0x68e401b61ea53889505cc1366710f733a60c2d41', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0x19cc40283b057d6608c22f1d20f17e16c245642e', '0x918dbe087040a41b786f0da83190c293dae24749', '0x9f1f933c660a1dc856f0e0fe058435879c5ccef0', '0x8bec47865ade3b172a928df8f990bc7f2a3b9f79', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0x34f291934b88c7870b7a17835b926b264fc13a81', '0x07f9f7f963c5cd2bbffd30ccfb964be114332e30', '0x0240ae04c9f47b91cf47ca2e7ef44c9de0d385ac', '0x5183e1b1091804bc2602586919e6880ac1cf2896', '0x221292443758f63563a1ed04b547278b05845fcb', '0x07f9f7f963c5cd2bbffd30ccfb964be114332e30', '0x09c9d464b58d96837f8d8b6f4d9fe4ad408d3a4f', '0xb39eeb9e168ef6c639f5e282fef1f6bc4dcae375']
export const ALL_TOKEN1 = ['0xc9bdeed33cd01541e1eed10f90519d2c06fe3feb', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xb12bfca5a55806aaf64e99521918a4bf0fc40802', '0xf4eb217ba2454613b15dbdea6e5f22276410e89e', '0xfa94348467f64d5a457f75f8bc40495d33c65abb', '0xc9bdeed33cd01541e1eed10f90519d2c06fe3feb', '0xfa94348467f64d5a457f75f8bc40495d33c65abb', '0xc4bdd27c33ec7daa6fcfd8532ddb524bf4038096', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xfa94348467f64d5a457f75f8bc40495d33c65abb', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xea62791aa682d455614eaa2a12ba3d9a2fd197af', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0x802119e4e253d5c19aa06a5d567c5a41596d6803', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0x8bec47865ade3b172a928df8f990bc7f2a3b9f79', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xc2ac78ffddf39e5cd6d83bbd70c1d67517c467ef', '0x4988a896b1227218e4a686fde5eabdcabd91571f', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xb12bfca5a55806aaf64e99521918a4bf0fc40802', '0xdcd6d4e2b3e1d1e1e6fa8c21c8a323dcbecff970', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xe4eb03598f4dcab740331fa432f4b85ff58aa97e', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xfa94348467f64d5a457f75f8bc40495d33c65abb', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xfa94348467f64d5a457f75f8bc40495d33c65abb', '0xc21ff01229e982d7c8b8691163b0a3cb8f357453', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d', '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d']

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

