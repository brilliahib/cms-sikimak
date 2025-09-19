import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardWrapper from "@/components/organisms/dashboard/DashboardWrapper";

export default function Home() {
  return (
    <section>
      <DashboardTitle title="Dashboard" />
      <DashboardWrapper />
    </section>
  );
}
