"use client";

import CardApplicationDetail from "@/components/molecules/card/CardApplicationDetail";
import { useGetDetailApplication } from "@/http/application/get-detail-application";
import { useSession } from "next-auth/react";

interface DashboardDetailApplicationWrapperProps {
  id: number;
}

export default function DashboardApplicationDetailWrapper({
  id,
}: DashboardDetailApplicationWrapperProps) {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetDetailApplication(
    id,
    session?.access_token as string,
    { enabled: status === "authenticated" },
  );

  return (
    <div>
      <CardApplicationDetail data={data?.data} />
    </div>
  );
}
