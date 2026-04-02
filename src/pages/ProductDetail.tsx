import { ArrowLeft, Star, MapPin, Clock, Minus, Plus, ShoppingCart, CalendarPlus, Truck, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { products } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [deliveryType, setDeliveryType] = useState<"instant" | "scheduled">("instant");

  if (!product) return <div className="flex min-h-screen items-center justify-center text-foreground">Product not found</div>;

  return (
    <div className="min-h-screen safe-bottom">
      {/* Image */}
      <div className="relative">
        <img src={product.image} alt={product.name} width={512} height={512} className="h-72 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        <Link to="/products" className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/60 backdrop-blur-md">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </Link>
        <div className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
          product.freshness === "fresh" ? "bg-success/90 text-success-foreground" : "bg-accent/90 text-accent-foreground"
        }`}>
          Harvested {product.harvestDate}
        </div>
      </div>

      <main className="mx-auto max-w-lg -mt-8 relative z-10 px-4 space-y-5 pb-32">
        {/* Info */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">{product.name}</h1>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-foreground">₹{product.price}</span>
              <span className="text-sm text-muted-foreground">/{product.unit}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {/* Farmer */}
        <div className="glass-card flex items-center gap-3 p-4">
          <span className="text-3xl">{product.farmer.avatar}</span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">{product.farmer.name}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {product.farmer.location}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold text-foreground">{product.farmer.rating}</span>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Delivery</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { type: "instant" as const, icon: Truck, label: "Instant", desc: product.deliveryTime },
              { type: "scheduled" as const, icon: Calendar, label: "Scheduled", desc: "Pick a slot" },
            ].map(({ type, icon: Icon, label, desc }) => (
              <button key={type} onClick={() => setDeliveryType(type)}
                className={`glass-card flex items-center gap-3 p-3 transition-all ${
                  deliveryType === type ? "ring-2 ring-primary border-primary" : ""
                }`}>
                <Icon className={`h-5 w-5 ${deliveryType === type ? "text-primary" : "text-muted-foreground"}`} />
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">{label}</p>
                  <p className="text-[10px] text-muted-foreground">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Quantity</h3>
          <div className="flex items-center gap-3 rounded-2xl bg-secondary p-1">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-background text-foreground">
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-foreground">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-background text-foreground">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            onClick={() => { addToCart(product, quantity); toast.success("Added to Dailies"); }}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary text-sm font-semibold text-secondary-foreground transition-transform active:scale-95"
          >
            <CalendarPlus className="h-4 w-4" /> Add to Dailies
          </button>
          <button
            onClick={() => { addToCart(product, quantity); toast.success("Added to cart"); }}
            className="flex h-12 flex-[2] items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-primary-foreground transition-transform active:scale-95 glow-primary"
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart · ₹{product.price * quantity}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
