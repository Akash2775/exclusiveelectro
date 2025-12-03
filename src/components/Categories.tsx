import { Smartphone, Laptop, Headphones, Gamepad2, Tv, Watch, Camera, Cpu } from "lucide-react";

const categories = [
  { name: "Smartphones", icon: Smartphone, count: 1250, color: "from-cyan-500 to-blue-500" },
  { name: "Laptops", icon: Laptop, count: 890, color: "from-purple-500 to-pink-500" },
  { name: "Audio", icon: Headphones, count: 567, color: "from-green-500 to-emerald-500" },
  { name: "Gaming", icon: Gamepad2, count: 432, color: "from-red-500 to-orange-500" },
  { name: "TVs", icon: Tv, count: 321, color: "from-yellow-500 to-amber-500" },
  { name: "Wearables", icon: Watch, count: 654, color: "from-indigo-500 to-violet-500" },
  { name: "Cameras", icon: Camera, count: 234, color: "from-pink-500 to-rose-500" },
  { name: "Components", icon: Cpu, count: 789, color: "from-teal-500 to-cyan-500" },
];

const Categories = () => {
  return (
    <section id="categories" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="section-subtitle">
            Browse through our extensive collection of electronics
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
            <div
              key={category.name}
              className="category-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${category.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-foreground" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-lg mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} Products</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
