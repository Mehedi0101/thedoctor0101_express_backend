export type TTour = {
  title: string;
  description: string;
  location: string;
  duration: string;
  type: 'group' | 'individual';
  images: string[];
  features: string[];
  frequency: string;
  totalSpot: number;
  availableSpot: number;
  featured: boolean;
  includedItems: string[];
  isDeleted: boolean;
};
