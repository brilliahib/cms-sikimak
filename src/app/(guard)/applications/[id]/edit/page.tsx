import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardApplicationUpdateWrapper from "@/components/organisms/application/DashboardApplicationUpdateWrapper";

interface DashboardApplicationEditPageProps {
  params: Promise<{ id: number }>;
}

export default async function DashboardApplicationEditPage({
  params,
}: DashboardApplicationEditPageProps) {
  const { id } = await params;

  return (
    <section>
      <DashboardTitle title="Ubah Lamaran" />
      <DashboardApplicationUpdateWrapper id={id} />
    </section>
  );
}
