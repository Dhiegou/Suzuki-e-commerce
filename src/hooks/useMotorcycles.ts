import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import type { Vehicle } from '../types';

export type MotorcycleCategory = 'SUPER SPORT' | 'NAKED' | 'BIG TRAIL' | 'SPORT TOURING' | 'SUPREME SPORT CROSSOVER';

export interface MegaMenuMoto {
  id: string;
  name: string;
  category: MotorcycleCategory;
  price: number;
  priceNote?: string;
  image: string;
  link: string;
  badge?: string;
}

export const MEGA_MENU_CATEGORIES: { label: string; value: MotorcycleCategory | 'TODOS' }[] = [
  { label: 'TODOS', value: 'TODOS' },
  { label: 'BIG TRAIL', value: 'BIG TRAIL' },
  { label: 'NAKED', value: 'NAKED' },
  { label: 'SUPER SPORT', value: 'SUPER SPORT' },
  { label: 'SPORT TOURING', value: 'SPORT TOURING' },
  { label: 'SUPREME SPORT CROSSOVER', value: 'SUPREME SPORT CROSSOVER' },
];

function deriveCategory(name: string): MotorcycleCategory {
  const upper = name.toUpperCase();
  if (upper.includes('V-STROM')) return 'BIG TRAIL';
  if (upper.includes('HAYABUSA') || upper.includes('GSX-R') || upper.includes('GSX-8R')) return 'SUPER SPORT';
  if (upper.includes('GSX-S1000GX')) return 'SUPREME SPORT CROSSOVER';
  if (upper.includes('GSX-S1000 GT')) return 'SPORT TOURING';
  return 'NAKED';
}

function deriveLink(id: string): string {
  return `https://suzukimotos.com.br/${id.replace(/_/g, '-')}`;
}

export function useMotorcycles() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['motorcycles'],
    queryFn: async () => {
      const vehicles = await apiService.getMotorcycles();
      
      const megaMenuMotos: MegaMenuMoto[] = vehicles.map((v: any) => ({
        id: v.id,
        name: v.name,
        category: deriveCategory(v.name),
        price: v.price,
        image: v.image,
        link: deriveLink(v.id),
        badge: v.name.includes('8S') || v.name.includes('8R') || v.name.includes('800') ? 'NOVA' : undefined
      }));

      return { vehicles: vehicles as Vehicle[], megaMenuMotos };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times
  });

  return {
    vehicles: data?.vehicles || [],
    megaMenuMotos: data?.megaMenuMotos || [],
    loading: isLoading,
    error: isError ? (error as Error).message : null,
  };
}
