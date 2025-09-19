"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import {
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  Ghost,
  Trash2,
  SquarePen,
} from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Application } from "@/types/applications/application";

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

export const applicationColumns: ColumnDef<Application>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "title",
    header: "Posisi",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.title}
      </p>
    ),
  },
  {
    accessorKey: "application_category",
    header: "Kategori",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.application_category}
      </p>
    ),
  },
  {
    accessorKey: "company_name",
    header: "Perusahaan",
    cell: ({ row }) => <p>{row.original.company_name}</p>,
  },
  {
    accessorKey: "company_location",
    header: "Lokasi Perusahaan",
    cell: ({ row }) => <p>{row.original.company_location}</p>,
  },
  {
    accessorKey: "submitted_status",
    header: "Status Submit",
    cell: ({ row }) => {
      const status = row.original.submitted_status?.toLowerCase();
      const config = status ? submittedStatusConfig[status] : null;

      if (!config) return <p>-</p>;
      const Icon = config.icon;

      return (
        <Badge
          className={`flex w-fit items-center gap-1 rounded-md px-2 py-1 ${config.bg} ${config.text}`}
        >
          <Icon className="h-4 w-4" />
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "approval_status",
    header: "Status Lamaran",
    cell: ({ row }) => {
      const status = row.original.approval_status?.toLowerCase();
      const config = status ? approvalStatusConfig[status] : null;

      if (!config) return <p>-</p>;
      const Icon = config.icon;

      return (
        <Badge
          className={`flex w-fit items-center gap-1 rounded-md px-2 py-1 ${config.bg} ${config.text}`}
        >
          <Icon className="h-4 w-4" />
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Tenggat",
    cell: ({ row }) => (
      <p suppressHydrationWarning>
        {row.original.deadline
          ? format(
              new Date(row.original.deadline),
              "EEEE, d MMMM yyyy, HH:mm",
              { locale: id },
            )
          : "-"}
      </p>
    ),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <ActionButton>
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/applications/${data.id}`}
              className="text-muted-foreground flex items-center"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/applications/${data.id}`}
              className="flex items-center text-yellow-600"
            >
              <SquarePen className="h-4 w-4 text-yellow-600" />
              <span className="ml-2">Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/applications/${data.id}`}
              className="flex items-center text-red-600"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
              <span className="ml-2">Hapus</span>
            </Link>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
