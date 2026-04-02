import { ArrowLeft, SlidersHorizontal, Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = products.filter(p => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory ||
      (activeCategory === "Organic" && p.tags.includes("Organic"));
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen safe-bottom">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary lg:hidden">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </Link>
          <h1 className="text-base font-bold text-foreground">Fresh Vegetables</h1>
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search vegetables..."
                className="w-full rounded-2xl border border-border bg-secondary/50 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div className="flex-1 md:flex-none" />
          <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
            <SlidersHorizontal className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-4 space-y-4">
        {/* Mobile Search */}
        <div className="relative md:hidden">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search vegetables..."
            className="w-full rounded-2xl border border-border bg-secondary/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {["All", ...categories.map(c => c.name)].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all ${
                activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">{filtered.length} vegetables found</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-4xl mb-3">🥬</span>
            <p className="text-sm text-muted-foreground">No vegetables found</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
