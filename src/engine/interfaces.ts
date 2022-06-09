import { BigNumber } from "bignumber.js";
import { CycleData } from "src/api-client/abstract_client";
import { BreadcrumbsConfiguration } from "src/config/interfaces";

export interface CycleReport {
  cycle: number;
  delegatorPayments: DelegatorPayment[];
  feeIncomePayments: BasePayment[];
  bondRewardPayments: BasePayment[];
  feeIncome: BigNumber;
  lockedBondRewards: BigNumber;
}

export interface StepArguments {
  config: BreadcrumbsConfiguration;
  cycleData: CycleData;
  cycleReport: CycleReport;
  distributableRewards: BigNumber;
}

export enum EPaymentType {
  Delegator = "delegator_payment",
  FeeIncome = "fee_income_payment",
  BondReward = "bond_reward",
}

export enum ENoteType {
  BalanceBelowMinimum = "balance_below_minimum",
  PaymentBelowMinimum = "payment_below_minimum",
}

export interface BasePayment {
  type: EPaymentType;
  cycle: number;
  recipient: string;
  amount: BigNumber;
  hash: string;
}

export interface DelegatorPayment extends BasePayment {
  delegator: string;
  delegatorBalance: BigNumber;
  bakerStakingBalance: BigNumber;
  bakerCycleRewards: BigNumber;
  fee: BigNumber;
  feeRate: BigNumber;
  note?: ENoteType;
}

export type StepFunction = (args: StepArguments) => StepArguments;
