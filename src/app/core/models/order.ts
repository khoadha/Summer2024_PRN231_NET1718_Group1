export interface CreateOrderDto {
    userId: string | null; // Make userId nullable to match C# string?
    cost: number;
    guests: any[];
    startDate: Date | null; // Make startDate nullable to match C# DateTime?
    endDate: Date | null; // Make endDate nullable to match C# DateTime?
}
export interface GuestDto {
  fullname?: string;
  email?: string;
  birthday?: Date;
}