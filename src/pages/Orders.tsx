import { ArrowLeft, ChevronRight, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { sampleOrders } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  harvested: "bg-accent/15 text-accent",
  packed: "bg-primary/15 text-primary",
  out_for_delivery: "bg-primary/15 text-primary",
  delivered: "bg-success/15 text-success",
};
const statusLabels: Record<string, string> = {
  harvested: "Harvested",
  packed: "Packed",
  out_for_delivery: "On the way",
  delivered: "Delivered",
};

const Orders = () => {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen safe-bottom">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary lg:hidden">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </Link>
          <h1 className="flex-1 text-base font-bold text-foreground">My Orders</h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-4 space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        {sampleOrders.map(order => (
          <div key={order.id} className="glass-card overflow-hidden animate-fade-in">
            <Link to={`/order-tracking/${order.id}`} className="block p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">#{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${statusColors[order.status] || "bg-secondary text-secondary-foreground"}`}>
                  {statusLabels[order.status] || order.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {order.items.slice(0, 3).map(item => (
                  <img key={item.product.id} src={item.product.image} alt={item.product.name} loading="lazy" width={40} height={40}
                    className="h-10 w-10 rounded-lg object-cover" />
                ))}
                {order.items.length > 3 && <span className="text-xs text-muted-foreground">+{order.items.length - 3}</span>}
                <div className="ml-auto flex items-center gap-1">
                  <span className="text-sm font-bold text-foreground">₹{order.total}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </Link>
            {order.status === "delivered" && (
              <button
                onClick={() => {
                  order.items.forEach(i => addToCart(i.product, i.quantity));
                  toast.success("Items added to cart", { duration: 1000 });
                }}
                className="flex w-full items-center justify-center gap-2 border-t border-border/50 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                <RotateCw className="h-3.5 w-3.5" /> Reorder
              </button>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Orders;
