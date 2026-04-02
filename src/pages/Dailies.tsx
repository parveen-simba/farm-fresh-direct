import { ArrowLeft, Pause, Play, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/mockData";
import { useState } from "react";

interface DailyItem {
  productId: string;
  frequency: "daily" | "weekly" | "custom";
  quantity: number;
  active: boolean;
  customDays?: string[];
}

const initialDailies: DailyItem[] = [
  { productId: "p4", frequency: "daily", quantity: 1, active: true },
  { productId: "p1", frequency: "weekly", quantity: 2, active: true },
  { productId: "p2", frequency: "custom", quantity: 1, active: false, customDays: ["Mon", "Wed", "Fri"] },
];

const Dailies = () => {
  const [dailies, setDailies] = useState(initialDailies);

  const toggle = (pid: string) => setDailies(d => d.map(i => i.productId === pid ? { ...i, active: !i.active } : i));
  const updateQty = (pid: string, q: number) =>
    setDailies(d => d.map(i => i.productId === pid ? { ...i, quantity: Math.max(1, q) } : i));
  const setFreq = (pid: string, freq: DailyItem["frequency"]) =>
    setDailies(d => d.map(i => i.productId === pid ? { ...i, frequency: freq } : i));

  return (
    <div className="min-h-screen safe-bottom">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link to="/profile" className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </Link>
          <h1 className="flex-1 text-base font-bold text-foreground">My Dailies</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-4 space-y-3">
        {dailies.map(item => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return null;
          return (
            <div key={item.productId} className={`glass-card p-4 space-y-3 transition-opacity ${!item.active ? "opacity-60" : ""}`}>
              <div className="flex items-center gap-3">
                <img src={product.image} alt={product.name} loading="lazy" width={64} height={64} className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">₹{product.price}/{product.unit} · {product.farmer.name}</p>
                </div>
                <button onClick={() => toggle(item.productId)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    item.active ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
                  }`}>
                  {item.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </div>

              {/* Frequency */}
              <div className="flex gap-2">
                {(["daily", "weekly", "custom"] as const).map(freq => (
                  <button key={freq} onClick={() => setFreq(item.productId, freq)}
                    className={`rounded-full px-3 py-1.5 text-[10px] font-medium capitalize transition-all ${
                      item.frequency === freq ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}>
                    {freq}
                  </button>
                ))}
              </div>

              {item.frequency === "custom" && item.customDays && (
                <p className="text-[10px] text-muted-foreground">Days: {item.customDays.join(", ")}</p>
              )}

              {/* Quantity */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Quantity</span>
                <div className="flex items-center gap-2 rounded-xl bg-secondary p-0.5">
                  <button onClick={() => updateQty(item.productId, item.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-background text-foreground">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-foreground">{item.quantity}</span>
                  <button onClick={() => updateQty(item.productId, item.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-background text-foreground">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Dailies;
