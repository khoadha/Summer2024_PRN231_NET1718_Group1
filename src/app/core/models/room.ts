export interface Room {
  id:number;
  name: string;
  roomSize: number;
  roomDescription: string;
  roomArea: number;
  costPerDay: number;
  location: string;
  categoryId: number;
  category?: RoomCategory;
  isAvailable: boolean;
  roomFurniture: RoomFurniture[];
  roomImages: RoomImage[];
  //dto
  categoryName?: string;
}
export interface RoomFurniture {
  id:number;
  furnitureId?: number;
  quantity: number;
  furniture?: Furniture;
  //dto
  furnitureName?: string;
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