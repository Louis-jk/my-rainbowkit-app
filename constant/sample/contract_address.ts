import {
  ContractString,
  ContractStringType,
} from '@/interface/contract/contract.interface';

export const NFT_WRITE_CONTRACT_ADDRESS: ContractStringType = process.env
  .NEXT_PUBLIC_NFT_WRITE_CONTRACT_ADDRESS as ContractString;

export const READ_TEST_CONTRACT_ADDRESS: ContractStringType = process.env
  .NEXT_PUBLIC_READ_TEST_CONTRACT_ADDRESS as ContractString;
