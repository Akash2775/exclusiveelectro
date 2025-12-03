import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

const ProductCard = ({ name, price, originalPrice, image, rating, reviews, badge }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${name} has been added to your cart.`,
    });
  };

  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <div className="product-card group">
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
          {badge}
        </div>
      )}
      
      {/* Wishlist Button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"
          }`}
        />
      </button>

      {/* Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-secondary/30">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({reviews})</span>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-display font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-green-500">-{discount}%</span>
            </>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          className="w-full mt-2 bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn"
        >
          <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
