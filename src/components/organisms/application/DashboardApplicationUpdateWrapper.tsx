import CardApplicationUpdate from "@/components/molecules/card/CardApplicationUpdate";

interface DashboardApplicationUpdateWrapperProps {
  id: number;
}

export default function DashboardApplicationUpdateWrapper({
  id,
}: DashboardApplicationUpdateWrapperProps) {
  return <CardApplicationUpdate id={id} />;
}
