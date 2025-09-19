"use client";

import { applicationColumns } from "@/components/atoms/datacolumn/DataApplication";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { PaginationControls } from "@/components/molecules/pagination/Pagination";
import SearchInput from "@/components/molecules/search/SearchInput";
import { Button } from "@/components/ui/button";
import { useGetAllApplication } from "@/http/application/get-all-application";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardApplicationWrapper() {
  const { data: session, status } = useSession();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isPending } = useGetAllApplication(
    session?.access_token as string,
    { name: search, page },
    { enabled: status === "authenticated" },
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <SearchInput
          onSearch={(q: string) => {
            setSearch(q);
            setPage(1);
          }}
        />
        <Button className="w-full text-white md:w-fit" asChild>
          <Link href="/applications/create">
            <Plus /> Tambah Lamaran
          </Link>
        </Button>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={applicationColumns}
        isLoading={isPending}
      />

      <div className="w-full">
        {data?.pagination && (
          <PaginationControls
            currentPage={page}
            lastPage={data.pagination.last_page}
            perPage={data.pagination.per_page}
            total={data.pagination.total}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
