"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Application } from "@/types/applications/application";
import { CheckCircle2, Clock, XCircle, Ghost } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import ExternalLink from "@/components/atoms/link/ExternalLink";

interface CardApplicationDetailProps {
  data?: Application;
}

const approvalStatusConfig: Record<
  string,
  { icon: React.ElementType; bg: string; text: string; label: string }
> = {
  pending: {
    icon: Clock,
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    label: "Menunggu",
  },
  accepted: {
    icon: CheckCircle2,
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Diterima",
  },
  rejected: {
    icon: XCircle,
    bg: "bg-red-100",
    text: "text-red-700",
    label: "Ditolak",
  },
  ghosting: {
    icon: Ghost,
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: "Tidak Ada Kabar",
  },
};

const submittedStatusConfig: Record<
  string,
  { icon: React.ElementType; bg: string; text: string; label: string }
> = {
  submitted: {
    icon: CheckCircle2,
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Sudah submit",
  },
  "not submitted": {
    icon: XCircle,
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: "Belum submit",
  },
};

export default function CardApplicationDetail({
  data,
}: CardApplicationDetailProps) {
  const approvalStatus = data?.approval_status
    ? approvalStatusConfig[data.approval_status]
    : null;

  const submittedStatus = data?.submitted_status
    ? submittedStatusConfig[data.submitted_status.toLowerCase()]
    : null;

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Posisi</span>
            <h3 className="font-medium">{data?.title}</h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Perusahaan / Instansi</span>
            <h3 className="font-medium">{data?.company_name}</h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Lokasi</span>
            <h3 className="font-medium">{data?.company_location}</h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Detail Lamaran</span>
            <h3 className="font-medium">{data?.application_category}</h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Tipe Pekerjaan</span>
            <h3 className="font-medium">{data?.work_location}</h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Tahap Lamaran</span>
            <h3 className="font-medium">{data?.apply_status ?? "-"}</h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Status Lamaran</span>
            {approvalStatus ? (
              <Badge
                className={`flex w-fit items-center gap-1 rounded-md px-2 py-1 ${approvalStatus.bg} ${approvalStatus.text}`}
              >
                <approvalStatus.icon className="h-4 w-4" />
                {approvalStatus.label}
              </Badge>
            ) : (
              <h3 className="font-medium">-</h3>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Status Submit</span>
            {submittedStatus ? (
              <Badge
                className={`flex w-fit items-center gap-1 rounded-md px-2 py-1 ${submittedStatus.bg} ${submittedStatus.text}`}
              >
                <submittedStatus.icon className="h-4 w-4" />
                {submittedStatus.label}
              </Badge>
            ) : (
              <h3 className="font-medium">-</h3>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Tenggat Deadline</span>
            <h3 className="font-medium">
              {data?.deadline
                ? format(new Date(data?.deadline), "EEEE, d MMMM yyyy, HH:mm", {
                    locale: id,
                  })
                : "-"}
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Link Lamaran</span>
            {data?.application_link ? (
              <ExternalLink href={data.application_link}>
                {data.application_link}
              </ExternalLink>
            ) : (
              <h3 className="font-medium">-</h3>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">
              Poster Lamaran (Instagram, Linkedin, dll)
            </span>
            {data?.poster_link ? (
              <ExternalLink href={data.poster_link}>
                {data.poster_link}
              </ExternalLink>
            ) : (
              <h3 className="font-medium">-</h3>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Catatan</span>
            <h3 className="font-medium capitalize">
              {data?.notes ?? "Tidak ada catatan"}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
