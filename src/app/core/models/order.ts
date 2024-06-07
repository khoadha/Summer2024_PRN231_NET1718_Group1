export interface CreateOrderDto {
  roomId: number;
    userId: string | null;
    cost: number;
    guests: any[];
    startDate: Date | null;
    endDate: Date | null;
    roomServices: RoomServiceDto[];
}
export interface ServiceWithPrice {
  id?: number;
  name: string;
  description: string;
  servicePriceNumber: number;
}
export interface RoomServiceDto {
  serviceId?: number;
}
export interface GuestDto {
  id?: number;
  fullname?: string;
  email?: string;
  birthday?: Date;
}

export interface Service {
  id?: number;
  name: string;
  description: string;
  servicePrice?: ServicePrice[];
}
export interface ServicePrice {
  id?: number;
  serviceId?: number;
  amount?: number;
  startDate?: Date;
  endDate?: Date;
}