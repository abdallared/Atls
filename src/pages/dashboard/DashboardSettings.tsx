import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const DashboardSettings = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground mb-6">الإعدادات</h1>
      <Card>
        <CardHeader><CardTitle className="text-base">معلومات النظام</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>الإصدار: 1.0.0</p>
          <p>البيانات: محفوظة في قاعدة بيانات Lovable Cloud</p>
          <p>المستخدم: {user?.email || "-"}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSettings;
