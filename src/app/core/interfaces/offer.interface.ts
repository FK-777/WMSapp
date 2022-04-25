export interface IOffer {
  _id?: string;
  offerType?: string;
  companyName?: string;
  category?: any;
  description?: string;
  logo?: string;
  cover?: string;
  offerOpenDate?: Date;
  offerCloseDate?: Date;
  stockName?: string;
  minTargetCapital?: number;
  maxTargetCapital?: number;
  pricePerShare?: number;
  currentPricePerShare?: number;
  noOfShares?: number;
  sharesSold?: number;
  holdingTimeDays?: number;
  isApproved?: boolean;
  pricing?: any;
  offerDocs?: any;
  medias?: any;
  UserId?: string;
}
