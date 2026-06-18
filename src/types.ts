export interface Service {
  id: string;
  name: string;
  category: 'manicure' | 'pedicure' | 'enhancements' | 'nail-art' | 'spa-care';
  price: number;
  durationMin: number;
  description: string;
  popular?: boolean;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
  specialty: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceIds: string[];
  staffId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  notes?: string;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  source: 'Google' | 'Instagram' | 'NailBar App' | 'Yelp';
  text: string;
  date: string;
  likes: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  likes: number;
  artist: string;
}
