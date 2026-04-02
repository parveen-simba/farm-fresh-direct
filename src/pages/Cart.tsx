import { ArrowLeft, Minus, Plus, Trash2, CalendarCheck, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, toggleDaily, totalPrice } = useCart();

  // Group by farmer
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    const fid = item.product.farmer.id;
    if (!acc[fid]) acc[fid] = [];
    acc[fid].push(item);
    return acc;
  }, {});

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 safe-bottom px-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="text-lg font-bold text-foreground">Your cart is empty</h2>
        <p className="text-sm text-muted-foreground">Add fresh produce from local farmers</p>
        <Link to="/" className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen safe-bottom">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </Link>
          <h1 className="flex-1 text-base font-bold text-foreground">Cart ({items.length})</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-4 space-y-4 pb-44">
        {Object.entries(grouped).map(([farmerId, farmerItems]) => (
          <div key={farmerId} className="glass-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2.5">
              <span className="text-lg">{farmerItems[0].product.farmer.avatar}</span>
              <span className="text-xs font-semibold text-foreground">{farmerItems[0].product.farmer.name}</span>
              <span className="ml-auto text-[10px] text-muted-foreground">{farmerItems[0].product.farmer.location}</span>
            </div>
            {farmerItems.map(item => (
              <div key={item.product.id} className="flex items-center gap-3 border-b border-border/30 p-3 last:border-0">
                <img src={item.product.image} alt={item.product.name} loading="lazy" width={64} height={64} className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate">{item.product.name}</h3>
                  <p className="text-xs text-muted-foreground">₹{item.product.price}/{item.product.unit}</p>
                  <button onClick={() => toggleDaily(item.product.id)}
                    className={`mt-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
                      item.isDaily ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
                    }`}>
                    <CalendarCheck className="h-3 w-3" /> {item.isDaily ? "Daily Active" : "Add to Dailies"}
                  </button>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm font-bold text-foreground">₹{item.product.price * item.quantity}</span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => removeFromCart(item.product.id)} className="text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <div className="flex items-center gap-1 rounded-xl bg-secondary p-0.5">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-lg bg-background text-foreground">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-foreground">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-lg bg-background text-foreground">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Delivery Estimate */}
        <div className="glass-card p-4 space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Delivery Estimate</h3>
          <p className="text-xs text-muted-foreground">Estimated delivery within 30 min – 2 hrs based on farmer locations</p>
        </div>
      </main>

      {/* Bottom checkout bar */}
      <div className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-xl font-bold text-foreground">₹{totalPrice}</p>
          </div>
          <Link to="/checkout"
            className="flex items-center gap-2 rounded-2xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-95 glow-primary">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
