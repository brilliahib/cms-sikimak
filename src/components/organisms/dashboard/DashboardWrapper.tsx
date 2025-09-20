"use client";

import CalendarApplication from "@/components/atoms/calendar/CalendarApplication";
import CardDashboardSummary from "@/components/molecules/card/CardDashboardSummary";
import { useGetSummaryApplication } from "@/http/application/get-summary-application";
import { useGetTimelineApplication } from "@/http/application/get-timeline-application";
import { useSession } from "next-auth/react";

export default function DashboardWrapper() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetTimelineApplication(
    session?.access_token as string,
    { enabled: status === "authenticated" },
  );

  const { data: summary, isPending: isSummaryPending } =
    useGetSummaryApplication(session?.access_token as string, {
      enabled: status === "authenticated",
    });

  return (
    <section className="flex flex-col gap-6">
      <CardDashboardSummary data={summary?.data} isLoading={isSummaryPending} />
      <CalendarApplication data={data?.data} isLoading={isPending} />
    </section>
  );
}
