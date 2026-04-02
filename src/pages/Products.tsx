import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCat);

  const filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen safe-bottom">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </Link>
          <h1 className="flex-1 text-base font-bold text-foreground">Products</h1>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
            <SlidersHorizontal className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-4 space-y-4">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {["All", ...categories.map(c => c.name)].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all ${
                activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
    </div>
  );
};

export default Products;
