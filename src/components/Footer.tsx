import { Zap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Shop: ["All Products", "New Arrivals", "Best Sellers", "Deals", "Gift Cards"],
    Support: ["Help Center", "Track Order", "Returns", "Shipping Info", "Contact Us"],
    Company: ["About Us", "Careers", "Press", "Blog", "Affiliate Program"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
  };

  return (
    <footer className="bg-secondary/30 border-t border-border/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-display font-bold gradient-text">ElectroHub</span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Your ultimate destination for cutting-edge electronics. Quality products, competitive prices, exceptional service.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-border/30">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="w-4 h-4 text-primary" />
            support@electrohub.com
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Phone className="w-4 h-4 text-primary" />
            1-800-ELECTRO
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            San Francisco, CA 94102
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 ElectroHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="https://img.icons8.com/color/48/apple-pay.png" alt="Apple Pay" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
