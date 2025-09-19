import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardApplicationWrapper from "@/components/organisms/application/DashboardApplicationWrapper";

export default function DashboardApplicationPage() {
  return (
    <section>
      <DashboardTitle title="Lamaran" />
      <DashboardApplicationWrapper />
    </section>
  );
}
