import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApplicationSummary } from "@/types/applications/application";

interface CardDashboardSummaryProps {
  data?: ApplicationSummary;
}

export default function CardDashboardSummary({
  data,
}: CardDashboardSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Lamaran</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-3xl font-bold">{data?.total_applications}</h3>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Belum Disubmit</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-3xl font-bold">{data?.total_not_submitted}</h3>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Lamaran Diterima</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-3xl font-bold">{data?.total_accepted}</h3>
        </CardContent>
      </Card>
    </div>
  );
}
