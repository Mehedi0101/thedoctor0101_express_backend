// --- Transport Interface ---
export type ITransport = {
  title: string;
  duration: string;
  capacity: number;
  price: string;
  pickup: string;
  destination: string;
  features: string[];
  images: string[];
  isDeleted: boolean;
};
