import { Search, MapPin, Star, ChevronRight, Zap, CalendarClock, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { products, categories, farmers } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import heroFarm from "@/assets/hero-farm.jpg";

const Index = () => {
  return (
    <div className="min-h-screen safe-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Delivering to</p>
                <p className="text-sm font-semibold text-foreground">Koramangala, Bangalore</p>
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-lg">
              👤
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search fresh produce..."
            className="w-full rounded-2xl border border-border bg-secondary/50 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl">
          <img src={heroFarm} alt="Fresh farms" width={1280} height={720} className="h-40 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-5">
            <h1 className="text-xl font-bold text-foreground">Fresh from farms<br /><span className="text-gradient">near you</span></h1>
            <p className="mt-1 text-xs text-muted-foreground">Farm to your doorstep in minutes</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Zap, label: "Buy Now", desc: "Instant delivery", color: "bg-primary/10 text-primary" },
            { icon: CalendarClock, label: "Pre-order", desc: "Plan ahead", color: "bg-accent/10 text-accent" },
            { icon: Package, label: "Bulk Buy", desc: "Save more", color: "bg-secondary text-secondary-foreground" },
          ].map(({ icon: Icon, label, desc, color }) => (
            <button key={label} className="glass-card flex flex-col items-center gap-1.5 p-3 transition-transform active:scale-95">
              <div className={`rounded-xl p-2 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-foreground">{label}</span>
              <span className="text-[10px] text-muted-foreground">{desc}</span>
            </button>
          ))}
        </div>

        {/* Categories */}
        <section>
          <h2 className="mb-3 text-base font-bold text-foreground">Categories</h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.map(cat => (
              <Link key={cat.name} to={`/products?category=${cat.name}`}
                className={`flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-b ${cat.color} p-3 transition-transform active:scale-95`}>
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium text-foreground">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Farmers */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Featured Farmers</h2>
            <span className="text-xs text-primary">View all</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {farmers.map(f => (
              <div key={f.id} className="glass-card flex min-w-[140px] flex-col items-center gap-2 p-4 flex-shrink-0">
                <span className="text-3xl">{f.avatar}</span>
                <h3 className="text-xs font-semibold text-foreground text-center">{f.name}</h3>
                <p className="text-[10px] text-muted-foreground">{f.location}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <span className="text-xs font-medium text-foreground">{f.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Fresh Today</h2>
            <Link to="/products" className="flex items-center gap-0.5 text-xs text-primary">
              See all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Buy Again */}
        <section>
          <h2 className="mb-3 text-base font-bold text-foreground">🔄 Buy Again</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {products.slice(0, 3).map(p => (
              <div key={p.id} className="glass-card flex min-w-[200px] items-center gap-3 p-3 flex-shrink-0">
                <img src={p.image} alt={p.name} loading="lazy" width={64} height={64} className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="text-xs font-semibold text-foreground">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">₹{p.price}/{p.unit}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
