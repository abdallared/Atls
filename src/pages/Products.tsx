import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import { useData } from "@/contexts/DataContext";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const Products = () => {
  const { products, categories } = useData();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory && p.category_id !== selectedCategory) return false;
      if (selectedBrand && p.brand_id !== selectedBrand) return false;
      if (showAvailableOnly && !p.available) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.name_ar.includes(q);
      }
      return true;
    });
  }, [products, selectedCategory, selectedBrand, searchQuery, showAvailableOnly]);

  const filterProps = {
    selectedCategory, setSelectedCategory,
    selectedBrand, setSelectedBrand,
    searchQuery, setSearchQuery,
    showAvailableOnly, setShowAvailableOnly,
  };

  return (
    <>
      <SEOHead />
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">المنتجات</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden gap-2">
                  <Filter size={16} /> فلتر
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle>فلتر المنتجات</SheetTitle>
                <div className="mt-4">
                  <ProductFilter {...filterProps} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-8">
            <aside className="hidden md:block w-64 shrink-0">
              <div className="sticky top-24 bg-card rounded-lg border border-border p-4">
                <ProductFilter {...filterProps} />
              </div>
            </aside>

            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  لا توجد منتجات مطابقة
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
