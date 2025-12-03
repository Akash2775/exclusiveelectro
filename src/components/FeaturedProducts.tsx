import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { useFeaturedProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

const FeaturedProducts = () => {
  const { data: products, isLoading } = useFeaturedProducts();

  return (
    <section id="products" className="py-20 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="section-title">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="section-subtitle mb-0">
              Handpicked tech essentials just for you
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 border-border/50 hover:border-primary/50">
            View All Products
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={Number(product.price)}
                  originalPrice={product.original_price ? Number(product.original_price) : undefined}
                  image={product.image_url || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"}
                  rating={Number(product.rating) || 0}
                  reviews={product.reviews_count || 0}
                  badge={product.badge || undefined}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No featured products available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
