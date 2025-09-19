import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardCreateApplicationWrapper from "@/components/organisms/application/DashboardCreateApplicationWrapper";

export default function DashboardApplicationWrapper() {
  return (
    <section>
      <DashboardTitle title="Tambah Lamaran" />
      <DashboardCreateApplicationWrapper />
    </section>
  );
}
