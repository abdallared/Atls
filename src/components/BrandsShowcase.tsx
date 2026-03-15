import { useData } from "@/contexts/DataContext";
import { motion } from "framer-motion";

const BrandsShowcase = () => {
  const { brands } = useData();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-12 md:py-16 bg-card border-y border-border"
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8"
        >
          الماركات اللي نوفرها
        </motion.h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 md:h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-lg font-bold text-muted-foreground hover:text-foreground transition-colors">
                  {brand.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default BrandsShowcase;
