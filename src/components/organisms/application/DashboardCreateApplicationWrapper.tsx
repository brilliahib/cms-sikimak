import FormCreateApplication from "@/components/molecules/form/applications/FormCreateApplication";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardCreateApplicationWrapper() {
  return (
    <Card>
      <CardContent>
        <FormCreateApplication />
      </CardContent>
    </Card>
  );
}
