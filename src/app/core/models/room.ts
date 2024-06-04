export interface Room {
  name?: string;
  roomSize: number;
  roomDescription?: string;
  roomArea: number;
  costPerDay: number;
  location?: string;
  categoryId: number;
  category?: RoomCategory;
  isAvailable: boolean;
  roomFurniture: RoomFurniture[];
  roomImages: RoomImage[];
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
  description: string;
  cost: number;
}
export interface RoomImage {
  id?: number;
  url: string;
}

export interface RoomCategory {
  id?: number;
  categoryName: string;
}