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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">من نحن: مسيرة عراقة.. ورؤية نحو المستقبل</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              {companyInfo.fullName}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">قصة بدأت منذ عام 1988</h2>
                <p className="text-muted-foreground leading-relaxed">
                  في قلب السوق الليبي، وبخطى ثابتة ملؤها الطموح، تأسست شركتنا عام 1988م على يد الحاج علي الشبو وأبنائه.
                  بدأت الحكاية كنشاط عائلي متخصص في بيع المستلزمات المنزلية والكهربائية، ومع مرور العقود، تحول هذا
                  النشاط إلى صرح اقتصادي رائد.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  على مدار أكثر من 35 عاماً، واصلنا مسيرة التطور والتوسع، حتى أصبحت مجموعتنا اليوم تضم 9 فروع
                  متخصصة، تغطي احتياجات عملائنا في مختلف المجالات الكهربائية والمنزلية بكل كفاءة واقتدار.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">محطات في مسيرتنا</h2>
                <p className="text-muted-foreground leading-relaxed">
                  كان عام 2003م نقطة تحول جوهرية في تاريخنا، حيث أطلقنا نشاطنا المتخصص والمستقل في المستلزمات
                  الكهربائية. جاءت هذه الخطوة ضمن رؤية استراتيجية تهدف إلى التخصص وتعميق الخبرة لتلبية متطلبات السوق
                  الليبي المتزايدة، وتقديم حلول متكاملة للمشاريع السكنية والتجارية والصناعية.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">رؤيتنا ورسالتنا</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">رؤيتنا:</span> أن نكون الوجهة الأولى والموثوقة في ليبيا
                  لتوريد الحلول الكهربائية والأجهزة المنزلية العالمية، مع الحفاظ على قيمنا الأصيلة في التعامل والخدمة.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">رسالتنا:</span> تمكين عملائنا من الحصول على أفضل
                  المنتجات العالمية التي تجمع بين التكنولوجيا المتطورة والجودة العالية، وتوفيرها بأسعار تنافسية تناسب
                  كافة شرائح المجتمع.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">لماذا نحن؟ (التزامنا بالجودة)</h2>
                <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pr-5">
                  <li>
                    <span className="font-semibold text-foreground">انتقاء الجودة:</span> نستورد منتجاتنا بعناية فائقة،
                    حيث نوفر خيارات تتراوح بين الجودة العالية والمتوسطة لنلبي احتياجات مختلف الميزانيات دون المساومة
                    على معايير الأمان والسلامة.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">الوكالة الرسمية:</span> بصفتنا وكلاء لماركات عالمية
                    مرموقة، نضمن لعملائنا الحصول على المنتجات الأصلية مباشرة من المصنع، مع كافة الضمانات الفنية
                    المطلوبة.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">فريقنا هو قوتنا:</span> يعمل لدينا فريق من الكفاءات
                    والخبراء المؤهلين الذين يسهرون على تقديم الاستشارات الفنية وخدمات ما بعد البيع لضمان رضاكم التام.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">قيمنا الثابتة</h2>
                <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pr-5">
                  <li>
                    <span className="font-semibold text-foreground">الأمانة:</span> نلتزم بالشفافية المطلقة في مواصفات
                    منتجاتنا.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">التطوير:</span> نسعى دائماً لجلب أحدث ما توصلت إليه
                    التكنولوجيا الكهربائية العالمية إلى السوق الليبي.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">الشراكة:</span> لا نعتبر زبائننا مجرد مشترين، بل
                    شركاء نجاح ننمو معهم وبهم.
                  </li>
                </ul>
              </div>

              <blockquote className="border-r-4 border-primary pr-4 text-foreground font-medium leading-relaxed">
                "منذ جيلين، ونحن نضيء بيوت ليبيا ومشاريعها.. ملتزمون بالأصل، ومتطلعون دائماً للأفضل."
              </blockquote>
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
