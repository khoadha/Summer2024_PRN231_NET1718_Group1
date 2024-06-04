export interface Room {
  name?: string;
  roomSize: number;
  roomDescription?: string;
  roomArea: number;
  costPerDay: number;
  location?: string;
  categoryId: number;
  isAvailable: boolean;
  roomFurniture: RoomFurniture[];
}

export interface RoomFurniture {
  id:number;
  furnitureId?: number;
  quantity: number;
  furniture: Furniture;
}

export interface Furniture {
  id?: number;
  name: string;
}