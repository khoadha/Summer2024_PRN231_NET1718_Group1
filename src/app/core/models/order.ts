import { Room } from './room';

export interface CreateOrderDto {
  roomId: number;
  userId: string | null;
  cost: number;
  guests: any[];
  startDate: Date | null;
  endDate: Date | null;
  roomServices: RoomServiceDto[];
  isMonthly?: boolean;
}
export interface GetOrderDto {
  id?: number;
  roomId: number;
  userId: string | null;
  guests: GuestDto[];
  orderDate: any;
  cancelDate: any;
  userName: string;
  roomName: string;
  status: any;
  roomServices: GetRoomServiceDto[];
  contracts: ContractDto[];
}
export interface GetOrderDisplayDto {
  id?: number;
  roomId: number;
  userId: string | null;
  orderDate: any;
  cancelDate: any;
  userName: string;
  roomName: string;
  status: any;
}
export interface ContractDto {
  cost: number;
  startDate: Date;
  endDate: Date;
  contractTypeId: number;
  contractTypeName: string;
  name: string;
  serviceId: number;
}
export interface GetRoomServiceDto {
  serviceName?: string;
}
export interface GuestDto {
  id?: number;
  fullname?: string;
  email?: string;
  birthday?: Date;
}

export interface ServiceWithPrice {
  id?: number;
  name: string;
  description: string;
  servicePriceNumber: number;
  serviceType: number;
  isCountPerCapita: boolean;
  image?: File;
}

export interface PaginationService {
  total: number;
  data: Service[];
}

export interface RoomServiceDto {
  serviceId?: number;
}
export interface Service {
  id?: number;
  name: string;
  description: string;
  serviceType?: string;
  imgPath?: string;
  isCountPerCapita?: boolean;
  servicePrice?: ServicePrice[];
}

export interface ServicePrice {
  id?: number;
  serviceId?: number;
  amount?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface GetFeeDto {
  id: number;
  name: string;
  feeCategoryName: string;
  amount: number;
  paymentDate: string;
  feeStatus: number;
  usedKWh?: number;
}
