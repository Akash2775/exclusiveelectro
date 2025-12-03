import { useState, useEffect } from "react";
import { Clock, Flame, Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import { useFlashDeals } from "@/hooks/useProducts";

const FlashDeals = () => {
  const { data: dealProducts, isLoading } = useFlashDeals();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 glass-card flex items-center justify-center border-primary/30">
        <span className="text-2xl md:text-3xl font-display font-bold text-primary">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );

  if (!isLoading && (!dealProducts || dealProducts.length === 0)) {
    return null;
  }

  return (
    <section id="deals" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-destructive/20 flex items-center justify-center animate-pulse">
              <Flame className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <h2 className="section-title mb-0">
                Flash <span className="text-destructive">Deals</span>
              </h2>
              <p className="text-muted-foreground">Limited time offers - Grab before it's gone!</p>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-primary mr-2" />
            <TimeBox value={timeLeft.hours} label="Hours" />
            <span className="text-2xl text-primary font-bold">:</span>
            <TimeBox value={timeLeft.minutes} label="Mins" />
            <span className="text-2xl text-primary font-bold">:</span>
            <TimeBox value={timeLeft.seconds} label="Secs" />
          </div>
        </div>

        {/* Products */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealProducts?.map((product, index) => (
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
                  badge="Flash Deal"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FlashDeals;
