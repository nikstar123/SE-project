import { Product } from '../types/Product';

const mockProducts: Product[] = [
  {
    id: 1,
    title: "MacBook Pro 16-inch (2023)",
    description: "Apple M2 Pro chip, 16GB RAM, 512GB SSD, Space Gray. Only used for 6 months, in excellent condition with original box and accessories.",
    price: 149999,
    category: "electronics",
    condition: "excellent",
    images: [
      "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    sellerId: 1,
    sellerName: "Alex Johnson",
    sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Engineering Building",
    createdAt: "2023-09-15T10:30:00Z",
    expiresAt: "2023-10-15T10:30:00Z",
    isFeatured: true,
    viewCount: 243,
    bidCount: 5,
    currentBid: 149999
  },
  {
    id: 2,
    title: "Calculus: Early Transcendentals (8th Edition)",
    description: "Textbook for Calculus I and II. Minimal highlighting, no writing or damage. ISBN: 978-1285741550.",
    price: 1499,
    category: "books",
    condition: "good",
    images: [
      "https://images.pexels.com/photos/2665119/pexels-photo-2665119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    sellerId: 2,
    sellerName: "Maria Garcia",
    sellerAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    location: "Math & Science Building",
    createdAt: "2023-09-18T14:45:00Z",
    expiresAt: "2023-10-18T14:45:00Z",
    viewCount: 87,
    bidCount: 2,
    currentBid: 1499
  },
  {
    id: 3,
    title: "Wilson Pro Staff RF97 Tennis Racket",
    description: "Roger Federer signature model. Used for one season, in great condition with original bag. Strung with Wilson Natural Gut 16/Luxilon ALU Power Rough 16L.",
    price: 7999,
    category: "sports",
    condition: "good",
    images: [
      "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    sellerId: 3,
    sellerName: "David Kim",
    sellerAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    location: "Athletics Complex",
    createdAt: "2023-09-10T09:15:00Z",
    expiresAt: "2023-10-10T09:15:00Z",
    viewCount: 64,
    bidCount: 1,
    currentBid: 7999
  },
  {
    id: 4,
    title: "IKEA MALM Desk",
    description: "White MALM desk with pull-out panel, 151x65cm. Purchased last year, still in very good condition. Easy to disassemble for transport.",
    price: 3999,
    category: "furniture",
    condition: "good",
    images: [
      "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    sellerId: 4,
    sellerName: "Sophie Williams",
    sellerAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
    location: "Off-campus Housing",
    createdAt: "2023-09-20T16:30:00Z",
    expiresAt: "2023-10-20T16:30:00Z",
    viewCount: 102,
    bidCount: 3,
    currentBid: 3999
  },
  {
    id: 5,
    title: "iPad Pro 11-inch (2022)",
    description: "M2 chip, 256GB, Space Gray with Apple Pencil 2nd gen and Magic Keyboard. Perfect for digital note-taking and design work.",
    price: 74999,
    category: "electronics",
    condition: "like-new",
    images: [
      "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    sellerId: 5,
    sellerName: "James Rodriguez",
    sellerAvatar: "https://randomuser.me/api/portraits/men/43.jpg",
    location: "Student Union",
    createdAt: "2023-09-12T11:20:00Z",
    expiresAt: "2023-10-12T11:20:00Z",
    isFeatured: true,
    viewCount: 178,
    bidCount: 4,
    currentBid: 74999
  }
];

export default mockProducts;