import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Vehicle, GarageItem } from '../types';

interface GarageContextType {
  garage: GarageItem[];
  isGarageOpen: boolean;
  totalMotos: number;
  addToGarage: (vehicle: Vehicle) => void;
  removeFromGarage: (id: string) => void;
  openGarage: () => void;
  closeGarage: () => void;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

export function GarageProvider({ children }: { children: ReactNode }) {
  // Initialize from LocalStorage
  const [garage, setGarage] = useState<GarageItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('suzuki_garage');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const [isGarageOpen, setIsGarageOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('suzuki_garage', JSON.stringify(garage));
  }, [garage]);

  const totalMotos = garage.reduce((acc, item) => acc + item.quantity, 0);

  const addToGarage = (vehicle: Vehicle) => {
    setGarage((prev) => {
      const existing = prev.find((item) => item.id === vehicle.id);
      if (existing) {
        // Since it's a garage/wishlist, we might not need "quantity" as per classical shop 
        // but keeping it for now if they want to track interest count, or just unique.
        // Let's keep it unique for a garage.
        return prev;
      }
      return [...prev, { ...vehicle, quantity: 1 }];
    });
    setIsGarageOpen(true);
  };

  const removeFromGarage = (id: string) => {
    setGarage((prev) => prev.filter((item) => item.id !== id));
  };

  const openGarage = () => setIsGarageOpen(true);
  const closeGarage = () => setIsGarageOpen(false);

  return (
    <GarageContext.Provider
      value={{
        garage,
        isGarageOpen,
        totalMotos,
        addToGarage,
        removeFromGarage,
        openGarage,
        closeGarage,
      }}
    >
      {children}
    </GarageContext.Provider>
  );
}

export function useGarage() {
  const context = useContext(GarageContext);
  if (context === undefined) {
    throw new Error('useGarage must be used within a GarageProvider');
  }
  return context;
}
