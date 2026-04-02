import tomatoesImg from "@/assets/products/tomatoes.jpg";
import potatoesImg from "@/assets/products/potatoes.jpg";
import onionsImg from "@/assets/products/onions.jpg";
import spinachImg from "@/assets/products/spinach.jpg";
import carrotsImg from "@/assets/products/carrots.jpg";
import cauliflowerImg from "@/assets/products/cauliflower.jpg";
import cabbageImg from "@/assets/products/cabbage.jpg";
import greenpeasImg from "@/assets/products/greenpeas.jpg";
import brinjalImg from "@/assets/products/brinjal.jpg";
import capsicumImg from "@/assets/products/capsicum.jpg";
import corianderImg from "@/assets/products/coriander.jpg";
import bittergourdImg from "@/assets/products/bittergourd.jpg";

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
  tags: string[];
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
  status: "harvested" | "packed" | "out_for_delivery" | "delivered";
  date: string;
  deliverySlot: string;
}

export const farmers: Farmer[] = [
  { id: "f1", name: "Ramesh Patel", location: "Nashik, MH", rating: 4.8, avatar: "🧑‍🌾", productsCount: 24 },
  { id: "f2", name: "Lakshmi Devi", location: "Anantapur, AP", rating: 4.9, avatar: "👩‍🌾", productsCount: 18 },
  { id: "f3", name: "Suresh Kumar", location: "Amritsar, PB", rating: 4.7, avatar: "🧑‍🌾", productsCount: 32 },
  { id: "f4", name: "Anitha Reddy", location: "Warangal, TS", rating: 4.6, avatar: "👩‍🌾", productsCount: 15 },
  { id: "f5", name: "Mohan Singh", location: "Jaipur, RJ", rating: 4.8, avatar: "🧑‍🌾", productsCount: 20 },
];

export const products: Product[] = [
  {
    id: "p1", name: "Organic Tomatoes", price: 45, unit: "kg", image: tomatoesImg,
    farmer: farmers[0], category: "Seasonal", deliveryTime: "30 min",
    harvestDate: "Today", freshness: "fresh", tags: ["Fresh", "Organic"],
    description: "Vine-ripened organic tomatoes grown without pesticides. Rich in lycopene and vitamin C.",
  },
  {
    id: "p2", name: "Fresh Potatoes", price: 30, unit: "kg", image: potatoesImg,
    farmer: farmers[2], category: "Root", deliveryTime: "45 min",
    harvestDate: "Today", freshness: "fresh", tags: ["Fresh", "Today Harvested"],
    description: "Farm-fresh potatoes, perfect for curries, fries, and everyday cooking.",
  },
  {
    id: "p3", name: "Red Onions", price: 35, unit: "kg", image: onionsImg,
    farmer: farmers[0], category: "Root", deliveryTime: "30 min",
    harvestDate: "Today", freshness: "fresh", tags: ["Fresh"],
    description: "Crisp, pungent red onions. A kitchen staple for everyday cooking.",
  },
  {
    id: "p4", name: "Baby Spinach", price: 25, unit: "bunch", image: spinachImg,
    farmer: farmers[1], category: "Leafy", deliveryTime: "45 min",
    harvestDate: "Today", freshness: "fresh", tags: ["Organic", "Fresh"],
    description: "Tender baby spinach leaves, hand-picked this morning. Perfect for salads and cooking.",
  },
  {
    id: "p5", name: "Fresh Carrots", price: 40, unit: "kg", image: carrotsImg,
    farmer: farmers[3], category: "Root", deliveryTime: "1 hr",
    harvestDate: "Today", freshness: "fresh", tags: ["Organic", "Today Harvested"],
    description: "Sweet, crunchy organic carrots with tops. Great for juicing, salads, and cooking.",
  },
  {
    id: "p6", name: "Cauliflower", price: 50, unit: "piece", image: cauliflowerImg,
    farmer: farmers[2], category: "Seasonal", deliveryTime: "1 hr",
    harvestDate: "Yesterday", freshness: "recent", tags: ["Fresh"],
    description: "Farm-fresh cauliflower, tightly packed florets. Perfect for gobi recipes.",
  },
  {
    id: "p7", name: "Green Cabbage", price: 30, unit: "piece", image: cabbageImg,
    farmer: farmers[4], category: "Leafy", deliveryTime: "45 min",
    harvestDate: "Today", freshness: "fresh", tags: ["Organic"],
    description: "Crisp, fresh green cabbage. Great for salads, stir-fries, and sabzi.",
  },
  {
    id: "p8", name: "Green Peas", price: 80, unit: "kg", image: greenpeasImg,
    farmer: farmers[1], category: "Seasonal", deliveryTime: "2 hrs",
    harvestDate: "Today", freshness: "fresh", tags: ["Fresh", "Seasonal"],
    description: "Sweet, tender green peas freshly harvested. Perfect for pulao and curries.",
  },
  {
    id: "p9", name: "Brinjal", price: 35, unit: "kg", image: brinjalImg,
    farmer: farmers[3], category: "Seasonal", deliveryTime: "1 hr",
    harvestDate: "Yesterday", freshness: "recent", tags: ["Fresh"],
    description: "Glossy purple brinjals, farm-fresh. Ideal for bharta, curry, and frying.",
  },
  {
    id: "p10", name: "Capsicum", price: 60, unit: "kg", image: capsicumImg,
    farmer: farmers[4], category: "Seasonal", deliveryTime: "1 hr",
    harvestDate: "Today", freshness: "fresh", tags: ["Organic", "Fresh"],
    description: "Crunchy, colorful capsicums. Perfect for stir-fries, salads, and stuffing.",
  },
  {
    id: "p11", name: "Fresh Coriander", price: 15, unit: "bunch", image: corianderImg,
    farmer: farmers[1], category: "Leafy", deliveryTime: "30 min",
    harvestDate: "Today", freshness: "fresh", tags: ["Today Harvested", "Organic"],
    description: "Aromatic fresh coriander leaves. Essential garnish for Indian cooking.",
  },
  {
    id: "p12", name: "Bitter Gourd", price: 45, unit: "kg", image: bittergourdImg,
    farmer: farmers[0], category: "Seasonal", deliveryTime: "1 hr",
    harvestDate: "Today", freshness: "fresh", tags: ["Organic"],
    description: "Fresh bitter gourd (karela), organically grown. Rich in nutrients and great for health.",
  },
];

export const categories = [
  { name: "Leafy", icon: "🥬", color: "from-primary/20 to-primary/5" },
  { name: "Root", icon: "🥕", color: "from-accent/20 to-accent/5" },
  { name: "Seasonal", icon: "🍅", color: "from-destructive/20 to-destructive/5" },
  { name: "Organic", icon: "🌿", color: "from-primary/20 to-primary/5" },
];

export const sampleOrders: Order[] = [
  {
    id: "ORD001",
    items: [
      { product: products[0], quantity: 2, isDaily: false },
      { product: products[3], quantity: 1, isDaily: true },
    ],
    total: 115,
    status: "out_for_delivery",
    date: "2026-04-02",
    deliverySlot: "10:00 AM - 12:00 PM",
  },
  {
    id: "ORD002",
    items: [
      { product: products[4], quantity: 1, isDaily: false },
      { product: products[1], quantity: 3, isDaily: false },
    ],
    total: 130,
    status: "delivered",
    date: "2026-03-30",
    deliverySlot: "2:00 PM - 4:00 PM",
  },
];
