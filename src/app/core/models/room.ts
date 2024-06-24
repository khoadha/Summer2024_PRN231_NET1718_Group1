export interface Room {
  id: number;
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

// export interface RoomDisplay {
//   id: number
//   name: string
//   imgPath: string
//   roomSize: number
//   roomArea: number
//   costPerDay: number
//   location: string
//   categoryName: string
//   isAvailable: boolean
//   roomFurniture: RoomFurniture[];
// }

export interface RoomDisplay {
  id: number
  name: string
  imgPath: string
  roomArea: number
  costPerDay: number
  roomFurniture: RoomFurniture[];
}

export interface PaginationRoomDisplay {
  total: number
  data: RoomDisplay[]
}
export interface RoomFurniture {
  id: number;
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
  imgPath: string;
}

export interface RoomCategory {
  id?: number;
  categoryName: string;
}
