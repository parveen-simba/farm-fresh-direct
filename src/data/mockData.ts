import tomatoesImg from "@/assets/products/tomatoes.jpg";
import spinachImg from "@/assets/products/spinach.jpg";
import mangoesImg from "@/assets/products/mangoes.jpg";
import milkImg from "@/assets/products/milk.jpg";
import riceImg from "@/assets/products/rice.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  farmer: Farmer;
  category: string;
  deliveryTime: string;
  harvestDate: string;
  freshness: "fresh" | "recent";
  description: string;
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  rating: number;
  avatar: string;
  productsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isDaily: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "ordered" | "packed" | "out_for_delivery" | "delivered";
  date: string;
  deliverySlot: string;
}

export const farmers: Farmer[] = [
  { id: "f1", name: "Ramesh Patel", location: "Nashik, MH", rating: 4.8, avatar: "🧑‍🌾", productsCount: 24 },
  { id: "f2", name: "Lakshmi Devi", location: "Anantapur, AP", rating: 4.9, avatar: "👩‍🌾", productsCount: 18 },
  { id: "f3", name: "Suresh Kumar", location: "Amritsar, PB", rating: 4.7, avatar: "🧑‍🌾", productsCount: 32 },
  { id: "f4", name: "Anitha Reddy", location: "Warangal, TS", rating: 4.6, avatar: "👩‍🌾", productsCount: 15 },
];

export const products: Product[] = [
  {
    id: "p1", name: "Organic Tomatoes", price: 45, unit: "kg", image: tomatoesImg,
    farmer: farmers[0], category: "Vegetables", deliveryTime: "30 min",
    harvestDate: "Today", freshness: "fresh",
    description: "Vine-ripened organic tomatoes grown without pesticides. Rich in lycopene and vitamin C.",
  },
  {
    id: "p2", name: "Fresh Spinach", price: 30, unit: "bunch", image: spinachImg,
    farmer: farmers[1], category: "Vegetables", deliveryTime: "45 min",
    harvestDate: "Today", freshness: "fresh",
    description: "Tender baby spinach leaves, hand-picked this morning. Perfect for salads and cooking.",
  },
  {
    id: "p3", name: "Alphonso Mangoes", price: 320, unit: "dozen", image: mangoesImg,
    farmer: farmers[0], category: "Fruits", deliveryTime: "2 hrs",
    harvestDate: "Yesterday", freshness: "recent",
    description: "Premium Alphonso mangoes from Ratnagiri. Naturally ripened, incredibly sweet and aromatic.",
  },
  {
    id: "p4", name: "Farm Fresh Milk", price: 65, unit: "litre", image: milkImg,
    farmer: farmers[2], category: "Dairy", deliveryTime: "1 hr",
    harvestDate: "Today", freshness: "fresh",
    description: "Pure A2 cow milk, delivered fresh from the farm. No preservatives or adulterants.",
  },
  {
    id: "p5", name: "Organic Brown Rice", price: 120, unit: "kg", image: riceImg,
    farmer: farmers[3], category: "Grains", deliveryTime: "Next day",
    harvestDate: "This week", freshness: "recent",
    description: "Unpolished brown rice rich in fiber and nutrients. Sourced directly from organic farms.",
  },
  {
    id: "p6", name: "Red Onions", price: 35, unit: "kg", image: tomatoesImg,
    farmer: farmers[2], category: "Vegetables", deliveryTime: "30 min",
    harvestDate: "Today", freshness: "fresh",
    description: "Crisp, pungent red onions. A kitchen staple for everyday cooking.",
  },
];

export const categories = [
  { name: "Vegetables", icon: "🥬", color: "from-emerald-500/20 to-emerald-600/5" },
  { name: "Fruits", icon: "🍎", color: "from-orange-500/20 to-orange-600/5" },
  { name: "Dairy", icon: "🥛", color: "from-blue-400/20 to-blue-500/5" },
  { name: "Grains", icon: "🌾", color: "from-amber-500/20 to-amber-600/5" },
];

export const sampleOrders: Order[] = [
  {
    id: "ORD001",
    items: [
      { product: products[0], quantity: 2, isDaily: false },
      { product: products[3], quantity: 1, isDaily: true },
    ],
    total: 155,
    status: "out_for_delivery",
    date: "2026-04-02",
    deliverySlot: "10:00 AM - 12:00 PM",
  },
  {
    id: "ORD002",
    items: [
      { product: products[2], quantity: 1, isDaily: false },
      { product: products[1], quantity: 3, isDaily: false },
    ],
    total: 410,
    status: "delivered",
    date: "2026-03-30",
    deliverySlot: "2:00 PM - 4:00 PM",
  },
];
