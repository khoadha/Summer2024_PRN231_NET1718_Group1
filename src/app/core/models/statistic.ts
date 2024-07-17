export interface Statistic {
  storeId?: number;
  revenue: number;
  shippingCost: number;
  orderCount: number;
}

export interface GetRoomAdminDisplayDTO {
  roomCount?: number;
  roomAvailable?: number;
  roomUnavailable?: number;
}

export interface AdminDashboardInformation {
  totalRoomCount: number;
  totalFurnitureCount: number;
  totalUserCount: number;
  totalOrderCount: number;
}

export interface TopProductStatistic {
  topProductsByViewCount: ProductForTopProductStatistic[];
  topProductsBySale: ProductForTopProductStatistic[];
}

export interface ProductForTopProductStatistic {
  id: number;
  name: string;
  imgPath: string;
  numberOfSales: number;
  viewCount: number;
}

export interface DailyRevenue {
  totalRevenue: number;
  date: string;
}

export interface StoreOverviewStatistic {
  totalProductCount: number;
  totalProductRatingCount: number;
}
