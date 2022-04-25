export interface ITransaction {
  _id?: string;
  buyPricePerShare?: number;
  buyer?: object;
  contractNumber?: string;
  noOfSharesBought?: number;
  noOfSharesOnSale?: number;
  salePrice?: number;
  noOfSharesSold?: number;
  seller?: object;
  stockName?: string;
  totalOfSoldShares?: number;
}