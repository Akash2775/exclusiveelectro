import { useState } from "react";
import { Send, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Welcome to ElectroHub! Check your inbox for exclusive deals.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Get 10% Off Your First Order</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Join the <span className="gradient-text">ElectroHub</span> Community
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter for exclusive deals, tech news, and early access to new products.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-secondary/50 border-border/50 focus:border-primary/50 h-14 text-lg"
              required
            />
            <Button type="submit" className="btn-primary h-14 px-8 group">
              Subscribe
              <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            No spam, unsubscribe at any time. Read our{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
