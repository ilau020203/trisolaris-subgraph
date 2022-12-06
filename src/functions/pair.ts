import { PairCreated } from "../../generated/Factory/Factory";
import { Pair } from "../../generated/schema";
import { Pair as PairContract } from "../../generated/Factory/Pair";
import { Pair as PairTemplate } from "../../generated/templates";
import {
  BIG_DECIMAL_ZERO,
  BIG_INT_ONE,
  BIG_INT_ZERO,
  LEGACY,
  PairType,
  SWAP_FEE,
  TWAP_ENABLED,
  STABLE_POOL_ADDRESSES,
  ALL_PAIRS_UNDER_DEPLOY,
  ALL_TOKEN0,
  ALL_TOKEN1
} from "../constants";
import { getOrCreateFactory } from "./factory";
import { getOrCreateToken } from "./token";
import { createTokenPair } from "./token-pair";
import { Address, BigInt, Value } from "@graphprotocol/graph-ts";

export function createPair(event: PairCreated): Pair {
  if (event.block.number.le(BigInt.fromString("74508496"))) {
    getOrCreateToken(
      "0xe3520349F477A5F6EB06107066048508498A291b".toLowerCase()
    );
    initializePair();
  }
  const id = event.params.pair.toHex().toLowerCase();

  let token0 = getOrCreateToken(event.params.token0.toHex().toLowerCase());
  let token1 = getOrCreateToken(event.params.token1.toHex().toLowerCase());

  const pair = new Pair(id);

  createTokenPair(token0.id, id);
  createTokenPair(token1.id, id);

  pair.name = token0.symbol.concat("-").concat(token1.symbol);
  pair.type = PairType.CONSTANT_PRODUCT_POOL;

  pair.token0 = token0.id;
  pair.token1 = token1.id;
  pair.createdAtTimestamp = event.block.timestamp;
  pair.createdAtBlock = event.block.number;

  pair.volumeToken0 = BIG_DECIMAL_ZERO;
  pair.volumeToken1 = BIG_DECIMAL_ZERO;

  pair.save();

  const factory = getOrCreateFactory();
  factory.pairCount = factory.pairCount.plus(BIG_INT_ONE);
  factory.save();

  // create the tracked contract based on the template
  PairTemplate.create(event.params.pair);

  return pair as Pair;
}

function initializePair(): void {
  ALL_PAIRS_UNDER_DEPLOY.forEach((val, i) => {
    createPairIfDontExist(
      val.toLowerCase(),
      ALL_TOKEN0[i].toLowerCase(),
      ALL_TOKEN1[i].toLowerCase()
    );
  });
}

function createPairIfDontExist(
  lpToken: string,
  token0_: string,
  token1_: string
): void {
  const id = lpToken;
  if (!!Pair.load(id)) return;
  const pair = new Pair(id);

  let token0 = getOrCreateToken(token0_.toLowerCase());
  let token1 = getOrCreateToken(token1_.toLowerCase());

  createTokenPair(token0.id, id);
  createTokenPair(token1.id, id);

  pair.name = token0.symbol.concat("-").concat(token1.symbol);
  pair.type = PairType.CONSTANT_PRODUCT_POOL;

  pair.token0 = token0.id;
  pair.token1 = token1.id;
  pair.createdAtTimestamp = BIG_INT_ZERO;
  pair.createdAtBlock = BIG_INT_ZERO;
  pair.volumeToken0 = BIG_DECIMAL_ZERO;
  pair.volumeToken1 = BIG_DECIMAL_ZERO;

  pair.save();
  PairTemplate.create(Address.fromString(lpToken));
  const factory = getOrCreateFactory();
  factory.pairCount = factory.pairCount.plus(BIG_INT_ONE);
  factory.save();
}

export function getPair(address: string): Pair {
  return Pair.load(address) as Pair;
}
