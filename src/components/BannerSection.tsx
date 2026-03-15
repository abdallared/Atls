import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import aboutImg from "@/assets/about-lighting.png";
import { motion } from "framer-motion";
import { useData } from "@/contexts/DataContext";
import { resolveMediaUrl } from "@/lib/media";

const BannerSection = () => {
  const { seoSettings } = useData();
  const homeSeo = seoSettings.find((s) => s.page_path === "/");
  const seoImage = homeSeo?.og_image?.trim();
  const hasCustomImage = !!seoImage && !seoImage.includes("placeholder.svg");
  const bannerImage = hasCustomImage ? seoImage : aboutImg;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-muted rounded-lg aspect-[4/3] flex items-center justify-center overflow-hidden"
          >
            <img
              src={resolveMediaUrl(bannerImage)}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = resolveMediaUrl(aboutImg);
              }}
              alt="حلول الإضاءة - منازل، مكاتب، متاجر، ورش"
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              منتجاتنا بتخدم مين؟
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              بنقدم حلول ومنتجات مناسبة للشركات، المصانع، والمتاجر. من الإضاءة الاحترافية إلى الأجهزة المنزلية عالية الجودة، نوفر كل ما تحتاجه لتطوير بيزنسك وتحسين مساحات العمل والمعيشة.
            </p>
            <Button asChild variant="default">
              <Link to="/about">اعرف عنا أكتر</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
