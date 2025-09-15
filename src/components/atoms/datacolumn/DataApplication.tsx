"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import {
  Eye,
  FileText,
  UserRound,
  Briefcase,
  CheckCircle,
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

const applyStatusConfig: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
  "CV Screening": { icon: FileText, color: "text-gray-500" },
  "Interview HR": { icon: UserRound, color: "text-blue-500" },
  "Interview User": { icon: Briefcase, color: "text-yellow-500" },
  Selesai: { icon: CheckCircle, color: "text-green-500" },
};

const approvalStatusConfig: Record<
  string,
  { icon: React.ElementType; color: string; label: string }
> = {
  pending: { icon: Clock, color: "text-yellow-500", label: "Menunggu" },
  accepted: { icon: CheckCircle2, color: "text-green-500", label: "Diterima" },
  rejected: { icon: XCircle, color: "text-red-500", label: "Ditolak" },
  ghosting: { icon: Ghost, color: "text-gray-500", label: "Tidak Ada Kabar" },
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
    accessorKey: "apply_status",
    header: "Tahap",
    cell: ({ row }) => {
      const status = row.original.apply_status;
      const config = applyStatusConfig[status] || {
        icon: FileText,
        color: "text-gray-500",
      };
      const Icon = config.icon;

      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Icon className={`h-4 w-4 ${config.color}`} />
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "approval_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.approval_status;
      const config = approvalStatusConfig[status] || {
        icon: Clock,
        color: "text-gray-500",
        label: status,
      };
      const Icon = config.icon;

      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Icon className={`h-4 w-4 ${config.color}`} />
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
