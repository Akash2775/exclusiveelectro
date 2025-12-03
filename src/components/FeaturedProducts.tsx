import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Apple MacBook Pro 16\" M3 Max",
    price: 2499,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 2341,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 349,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 1892,
    badge: "Hot",
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: 1199,
    originalPrice: 1399,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 3421,
  },
  {
    id: 4,
    name: "PS5 Digital Edition Console",
    price: 449,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 5621,
    badge: "Popular",
  },
  {
    id: 5,
    name: "Apple Watch Ultra 2 GPS + Cellular",
    price: 799,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 1234,
  },
  {
    id: 6,
    name: "DJI Mavic 3 Pro Drone",
    price: 2199,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 876,
    badge: "New",
  },
  {
    id: 7,
    name: "NVIDIA RTX 4090 Graphics Card",
    price: 1599,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 2145,
  },
  {
    id: 8,
    name: "LG C3 65\" OLED 4K Smart TV",
    price: 1799,
    originalPrice: 2299,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 1567,
    badge: "Deal",
  },
];

const FeaturedProducts = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="opacity-0 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
