import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { DbSeoSetting } from "@/contexts/DataContext";

const DashboardSEO = () => {
  const { seoSettings, updateSeoSetting } = useData();
  const { toast } = useToast();
  const [localSeo, setLocalSeo] = useState<Record<string, Partial<DbSeoSetting>>>({});

  const getField = (seo: DbSeoSetting, field: keyof DbSeoSetting) => {
    return (localSeo[seo.id]?.[field] as string) ?? (seo[field] as string) ?? "";
  };

  const setField = (id: string, field: string, value: string) => {
    setLocalSeo(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const saveSeo = async (seo: DbSeoSetting) => {
    const updates = localSeo[seo.id];
    if (updates) {
      await updateSeoSetting(seo.id, updates);
      setLocalSeo(prev => { const n = { ...prev }; delete n[seo.id]; return n; });
      toast({ title: "تم حفظ إعدادات SEO" });
    }
  };

  const pageNames: Record<string, string> = {
    "/": "الرئيسية",
    "/products": "المنتجات",
    "/about": "من نحن",
    "/contact": "تواصل معنا",
  };

  return (
    <div className="rtl" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-foreground">إدارة SEO</h1>
      </div>

      <div className="space-y-4">
        {seoSettings.map((seo) => (
          <Card key={seo.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between card-header-flex" style={{ gap: '900px' }}>
                <Button size="sm" onClick={() => saveSeo(seo)} disabled={!localSeo[seo.id]}>حفظ</Button>
                <CardTitle className="text-base text-right">{pageNames[seo.page_path] || seo.page_path}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-right"><Label className="text-right">العنوان (Title)</Label><Input className="text-right" value={getField(seo, "title")} onChange={(e) => setField(seo.id, "title", e.target.value)} /></div>
              <div className="text-right"><Label className="text-right">الوصف (Meta Description)</Label><Textarea className="text-right" value={getField(seo, "description")} onChange={(e) => setField(seo.id, "description", e.target.value)} rows={2} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-right"><Label className="text-right">OG Title</Label><Input className="text-right" value={getField(seo, "og_title")} onChange={(e) => setField(seo.id, "og_title", e.target.value)} /></div>
                <div className="text-right"><Label className="text-right">Robots</Label><Input className="text-right" value={getField(seo, "robots")} onChange={(e) => setField(seo.id, "robots", e.target.value)} /></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardSEO;
