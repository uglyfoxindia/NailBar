import { Service, Staff, Review, GalleryItem } from './types';

export const SERVICES: Service[] = [
  // Manicures
  {
    id: 'm1',
    name: 'Essential Manicure',
    category: 'manicure',
    price: 35,
    durationMin: 30,
    description: 'Nail shaping, cuticle grooming, hand massage, and professional lacquer finish.',
    popular: false,
  },
  {
    id: 'm2',
    name: 'Signature Gel Manicure',
    category: 'manicure',
    price: 50,
    durationMin: 45,
    description: 'Long-lasting gel polish cured with LED light. Includes basic nail care and premium cuticle conditioning.',
    popular: true,
  },
  {
    id: 'm3',
    name: 'Russian Dry Manicure',
    category: 'manicure',
    price: 75,
    durationMin: 75,
    description: 'Advanced dry e-file technique for flawless cuticles and incredibly clean margins. Ideal for lasting gel overlays.',
    popular: true,
  },

  // Pedicures
  {
    id: 'p1',
    name: 'Classic Nourishing Pedicure',
    category: 'pedicure',
    price: 45,
    durationMin: 40,
    description: 'Relaxing foot soak, scrub extension, nail shaping, cuticle work, and heel smoothing.',
    popular: false,
  },
  {
    id: 'p2',
    name: 'Volcanic Hot Stone Pedicure',
    category: 'pedicure',
    price: 65,
    durationMin: 60,
    description: 'Ultra-luxurious pedicure featuring warm oil massage, hot volcanic stone therapy, sugar scrub, and clay mask.',
    popular: true,
  },

  // Enhancements
  {
    id: 'e1',
    name: 'Apres Gel-X Full Set',
    category: 'enhancements',
    price: 95,
    durationMin: 90,
    description: 'Next-gen full coverage soft gel extension system. Lightweight, durable, and minimal damage to natural nails.',
    popular: true,
  },
  {
    id: 'e2',
    name: 'Sculpted Acrylic Full Set',
    category: 'enhancements',
    price: 110,
    durationMin: 100,
    description: 'Custom sculpted acrylic extensions designed by our master techs. Includes single-color gel coating.',
    popular: false,
  },
  {
    id: 'e3',
    name: 'Structured Gel Overlay',
    category: 'enhancements',
    price: 65,
    durationMin: 60,
    description: 'Builder gel overlay designed to strengthen bendy natural nails. Helps support growth and prevents chips.',
    popular: false,
  },

  // Nail Art
  {
    id: 'a1',
    name: 'Minimalist Fine Accent Art',
    category: 'nail-art',
    price: 20,
    durationMin: 20,
    description: 'Subtle lines, dots, or small foil details on 2-4 accent nails.',
    popular: false,
  },
  {
    id: 'a2',
    name: 'Chrome / Glazed Donut Finish',
    category: 'nail-art',
    price: 15,
    durationMin: 15,
    description: 'Stunning metallic or glossy iridescent chrome powder buffed over any manicure.',
    popular: true,
  },
  {
    id: 'a3',
    name: 'Avant-Garde Mastery Art',
    category: 'nail-art',
    price: 45,
    durationMin: 45,
    description: 'Intricate custom lettering, 3D gems, multi-pigment gradients, or marble textures on all 10 nails.',
    popular: true,
  },

  // Spa Care
  {
    id: 's1',
    name: 'Warm Paraffin Treatment',
    category: 'spa-care',
    price: 20,
    durationMin: 15,
    description: 'Deep heat therapy mask with nourishing peach-scented warm paraffin oils to intensely moisturize hands.',
    popular: false,
  },
  {
    id: 's2',
    name: 'Anti-Aging Collagen Glow Mask',
    category: 'spa-care',
    price: 25,
    durationMin: 20,
    description: 'Infused with hydrating serums, antioxidants, and a signature massage with chilled ice globes.',
    popular: false,
  }
];

export const STAFF: Staff[] = [
  {
    id: 'st1',
    name: 'Elena Rostova',
    role: 'Russian Mani Specialist',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    specialty: 'Ultra-precision Cuticles & Overlays',
  },
  {
    id: 'st2',
    name: 'Sasha Cruz',
    role: 'Senior Nail Artist',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=150&auto=format&fit=crop',
    specialty: '3D Chrome, Custom French & Marble',
  },
  {
    id: 'st3',
    name: 'Marcus Vance',
    role: 'Enhancement Guru',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    specialty: 'Sculpted Acrylics & Gel-X Full Sets',
  },
  {
    id: 'st4',
    name: 'Chloe Thorne',
    role: 'Pedicure & Spa Expert',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    specialty: 'Therapeutic Hot Stone & Massage',
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Minimalist Ivory Whim',
    category: 'Minimalist',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
    likes: 342,
    artist: 'Elena Rostova',
  },
  {
    id: 'g2',
    title: 'Futuristic Chrome Flare',
    category: 'Chrome',
    imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop',
    likes: 512,
    artist: 'Sasha Cruz',
  },
  {
    id: 'g3',
    title: 'Gold Foil Sunset Gel',
    category: 'Nail Art',
    imageUrl: 'https://images.unsplash.com/photo-1610992015732-2449b7de3581?q=80&w=600&auto=format&fit=crop',
    likes: 289,
    artist: 'Sasha Cruz',
  },
  {
    id: 'g4',
    title: 'Glossy French Rebirth',
    category: 'Classic',
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
    likes: 418,
    artist: 'Elena Rostova',
  },
  {
    id: 'g5',
    title: 'Neon Oasis Summer',
    category: 'Vibrant',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    likes: 260,
    artist: 'Marcus Vance',
  },
  {
    id: 'g6',
    title: 'Midnight Mulberry Velvet',
    category: 'Bold',
    imageUrl: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=600&auto=format&fit=crop',
    likes: 605,
    artist: 'Elena Rostova',
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Seraphina Wilde',
    rating: 5,
    source: 'Instagram',
    text: 'Sasha is literally an artist. She spent so much time custom painting the micro chrome stars on my nails. Hands down the cleanest lines I’ve ever seen in NYC! 😍💅🏼',
    date: '2026-06-12',
    likes: 124,
  },
  {
    id: 'r2',
    author: 'Devanie Miller',
    rating: 5,
    source: 'Google',
    text: 'Came in for the Russian dry manicure with Elena. My cuticles are virtually non-existent! The salon is incredibly chic with pink marble accents and complimentary mocktails. Highly recommend.',
    date: '2026-06-08',
    likes: 83,
  },
  {
    id: 'r3',
    author: 'Jordan Sterling',
    rating: 5,
    source: 'Yelp',
    text: 'Usually skeptical about nail retention but Marcus Vance’s build-gel overlays lasted me a solid five weeks through multiple lifting training sessions. Best nail investment!',
    date: '2026-06-01',
    likes: 47,
  }
];
