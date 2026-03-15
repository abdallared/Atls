import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { companyInfo } from "@/data/products";

const About = () => {
  return (
    <>
      <SEOHead />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">من نحن</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              {companyInfo.fullName} - أكثر من 15 سنة خبرة في توفير أفضل المنتجات
            </p>
          </div>
        </section>

        {/* Stories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {companyInfo.stories.map((story, i) => (
                <div key={i} className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">{story.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{story.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {companyInfo.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
