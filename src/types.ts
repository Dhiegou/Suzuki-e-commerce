export interface Vehicle {
  id: string;
  name: string;
  type: "motorcycle";
  price: number;
  image: string;
  description: string;
  features: string[];
}

export interface GarageItem extends Vehicle {
  quantity: number;
}
