import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-slide-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">New Arrivals 2024</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-slide-up delay-100">
              Experience the{" "}
              <span className="gradient-text">Future</span> of{" "}
              <span className="gradient-text">Technology</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up delay-200">
              Discover cutting-edge electronics with unbeatable prices. From smartphones to gaming gear, we've got your tech needs covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up delay-300">
              <Button className="btn-primary text-lg px-8 py-6 group">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6 border-border/50 hover:bg-secondary/50 hover:border-primary/50">
                View Deals
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 animate-slide-up delay-400">
              {[
                { value: "50K+", label: "Products" },
                { value: "100K+", label: "Customers" },
                { value: "24/7", label: "Support" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-display font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Product */}
          <div className="relative flex justify-center animate-slide-up delay-200">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-[80px] animate-pulse-glow" />
              
              {/* Product Image */}
              <div className="relative animate-float">
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=700&fit=crop"
                  alt="Featured Smartphone"
                  className="w-full max-w-md rounded-3xl shadow-2xl"
                />
                
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-full border-primary/30">
                  <span className="text-primary font-bold">-30% OFF</span>
                </div>
                
                {/* Product Info Card */}
                <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl max-w-[200px]">
                  <p className="text-sm text-muted-foreground">Latest Model</p>
                  <p className="font-display font-bold">iPhone 15 Pro</p>
                  <p className="text-primary font-bold">$999</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
