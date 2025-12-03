const brands = [
  { name: "Apple", logo: "🍎" },
  { name: "Samsung", logo: "📱" },
  { name: "Sony", logo: "🎧" },
  { name: "Microsoft", logo: "💻" },
  { name: "NVIDIA", logo: "🎮" },
  { name: "LG", logo: "📺" },
];

const Brands = () => {
  return (
    <section className="py-16 border-y border-border/30">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground mb-8">
          Trusted by Leading <span className="text-primary">Brands</span>
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{brand.logo}</span>
              <span className="font-display font-semibold text-lg">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
