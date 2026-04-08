/**
 * Motorcycle types for the product catalog.
 */

export interface MotorcycleEntity {
  id: string;
  name: string;
  type: 'motorcycle';
  price: number;
  image_url: string;
  description: string | null;
  features: string[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface MotorcycleResponseDTO {
  id: string;
  name: string;
  type: 'motorcycle';
  price: number;
  image: string;
  description: string;
  features: string[];
}
