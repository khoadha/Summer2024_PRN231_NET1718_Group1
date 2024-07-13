export interface GetReportDto {
  id: number;
  roomId: number;
  authorId: string;
  description: string;
  createdDate?: any;
  startDate?: any;
  endDate?: any;
  authorName: string;
  roomName: string;
  reply?: string;
  status: MaintainanceStatus;
}

export enum MaintainanceStatus {
  Rejected = 0,
  Pending = 1,
  Processing = 2,
  Completed = 3,
}

export interface AddReportDto {
  roomId: number;
  authorId: string;
  description: string;
}

export interface UpdateReportDto {
  reply: string;
  status: MaintainanceStatus;
}
