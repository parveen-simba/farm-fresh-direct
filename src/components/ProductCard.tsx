import { Plus, Clock, CalendarPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <div className="glass-card overflow-hidden animate-fade-in group transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img src={product.image} alt={product.name} loading="lazy" width={512} height={512}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map(tag => (
              <span key={tag} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                tag === "Organic" ? "bg-primary/90 text-primary-foreground" :
                tag === "Today Harvested" ? "bg-accent/90 text-accent-foreground" :
                "bg-success/90 text-success-foreground"
              }`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="p-3 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-foreground line-clamp-1">{product.name}</h3>
          <p className="text-xs text-muted-foreground">{product.farmer.name}</p>
        </Link>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{product.deliveryTime}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-base font-bold text-foreground">₹{product.price}</span>
            <span className="text-xs text-muted-foreground">/{product.unit}</span>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => { addToCart(product); toast.success("Added to cart", { duration: 1000 }); }}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all active:scale-90 hover:bg-primary/80"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={() => { addToCart(product); toast.success("Added to Dailies", { duration: 1000 }); }}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-all active:scale-90 hover:bg-secondary/80"
              title="Add to Dailies"
            >
              <CalendarPlus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
