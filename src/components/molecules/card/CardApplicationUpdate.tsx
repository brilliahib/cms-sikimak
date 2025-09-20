"use client";

import { Card, CardContent } from "@/components/ui/card";
import FormUpdateApplication from "../form/applications/FormUpdateApplication";
import { useSession } from "next-auth/react";
import { useGetDetailApplication } from "@/http/application/get-detail-application";

interface CardApplicationUpdateProps {
  id: number;
}

export default function CardApplicationUpdate({
  id,
}: CardApplicationUpdateProps) {
  const { data: session, status } = useSession();

  const { data } = useGetDetailApplication(
    id,
    session?.access_token as string,
    { enabled: status === "authenticated" },
  );
  return (
    <Card>
      <CardContent>
        <FormUpdateApplication id={id} data={data?.data} />
      </CardContent>
    </Card>
  );
}
