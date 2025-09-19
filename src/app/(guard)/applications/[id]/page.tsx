import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardApplicationDetailWrapper from "@/components/organisms/application/DashboardDetailApplicationWrapper";

interface DashboardApplicationDetailPageProps {
  params: Promise<{ id: number }>;
}

export default async function DashboardApplicationDetailPage({
  params,
}: DashboardApplicationDetailPageProps) {
  const { id } = await params;

  return (
    <section>
      <DashboardTitle title="Detail Lamaran" />
      <DashboardApplicationDetailWrapper id={id} />
    </section>
  );
}
