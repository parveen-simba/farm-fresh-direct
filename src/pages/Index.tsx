import { Search, MapPin, Star, ChevronRight, Zap, CalendarClock, Package, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { products, categories, farmers } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import heroFarm from "@/assets/hero-farm.jpg";

const Index = () => {
  return (
    <div className="min-h-screen safe-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Delivering to</p>
                <p className="text-sm font-semibold text-foreground">Koramangala, Bangalore</p>
              </div>
            </div>
            {/* Desktop search */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search vegetables..."
                  className="w-full rounded-2xl border border-border bg-secondary/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
                <Leaf className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">100% Fresh</span>
              </div>
              <Link to="/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-lg">
                👤
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-4 space-y-6 lg:py-8 lg:space-y-8">
        {/* Mobile Search */}
        <div className="relative md:hidden">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search vegetables..."
            className="w-full rounded-2xl border border-border bg-secondary/50 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl">
          <img src={heroFarm} alt="Fresh vegetable farms" width={1280} height={720} className="h-44 md:h-56 lg:h-72 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-5 md:p-8 lg:p-12">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Fresh vegetables from<br />
              <span className="text-gradient">nearby farms 🌿</span>
            </h1>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground max-w-md">
              Farm to your doorstep in minutes. 100% organic, zero middlemen.
            </p>
            <Link to="/products" className="mt-3 inline-flex w-fit items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-transform active:scale-95 hover:bg-primary/90">
              Shop Now <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Zap, label: "Buy Now", desc: "Instant delivery", color: "bg-primary/10 text-primary" },
            { icon: CalendarClock, label: "Pre-order", desc: "Plan ahead", color: "bg-accent/10 text-accent" },
            { icon: Package, label: "Bulk Buy", desc: "Save more", color: "bg-secondary text-secondary-foreground" },
          ].map(({ icon: Icon, label, desc, color }) => (
            <button key={label} className="glass-card flex flex-col items-center gap-1.5 p-3 lg:p-5 transition-all active:scale-95 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
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
          <h2 className="mb-3 text-base lg:text-lg font-bold text-foreground">Vegetable Categories</h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.map(cat => (
              <Link key={cat.name} to={`/products?category=${cat.name}`}
                className={`flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-b ${cat.color} p-3 lg:p-5 transition-all active:scale-95 hover:scale-105`}>
                <span className="text-2xl lg:text-3xl">{cat.icon}</span>
                <span className="text-xs font-medium text-foreground">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Farmers */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base lg:text-lg font-bold text-foreground">Featured Farmers</h2>
            <span className="text-xs text-primary cursor-pointer hover:underline">View all</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {farmers.map(f => (
              <div key={f.id} className="glass-card flex flex-col items-center gap-2 p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
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

        {/* Trending Vegetables */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base lg:text-lg font-bold text-foreground">🔥 Trending Vegetables</h2>
            <Link to="/products" className="flex items-center gap-0.5 text-xs text-primary hover:underline">
              See all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {products.slice(0, 8).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Buy Again */}
        <section>
          <h2 className="mb-3 text-base lg:text-lg font-bold text-foreground">🔄 Buy Again</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.slice(0, 3).map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="glass-card flex items-center gap-3 p-3 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <img src={p.image} alt={p.name} loading="lazy" width={64} height={64} className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="text-xs font-semibold text-foreground">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">₹{p.price}/{p.unit}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
