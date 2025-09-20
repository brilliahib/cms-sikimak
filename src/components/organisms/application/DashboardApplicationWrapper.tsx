"use client";

import AlertDialogDeleteApplication from "@/components/atoms/alert-dialog/AlertDialogDeleteApplication";
import { applicationColumns } from "@/components/atoms/datacolumn/DataApplication";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { PaginationControls } from "@/components/molecules/pagination/Pagination";
import SearchInput from "@/components/molecules/search/SearchInput";
import { Button } from "@/components/ui/button";
import { useDeleteApplication } from "@/http/application/delete-application";
import { useGetAllApplication } from "@/http/application/get-all-application";
import { Application } from "@/types/applications/application";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardApplicationWrapper() {
  const { data: session, status } = useSession();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [openAlertDialogDelete, setOpenAlertDialogDelete] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const { data, isPending } = useGetAllApplication(
    session?.access_token as string,
    { name: search, page },
    { enabled: status === "authenticated" },
  );

  const queryClient = useQueryClient();

  const { mutate: deleteApplication, isPending: isDeletePending } =
    useDeleteApplication({
      onSuccess: () => {
        setSelectedApplication(null);
        toast.success("Berhasil menghapus Lamaran!");
        queryClient.invalidateQueries({
          queryKey: ["get-all-applications"],
        });
      },
      onError: (err) => {
        toast.error("Gagal menghapus lamaran!", {
          description: err.message,
        });
      },
    });

  const handleDeleteApplication = (application: Application) => {
    setSelectedApplication(application);
    setOpenAlertDialogDelete(true);
  };

  const confirmDeleteApplication = () => {
    if (selectedApplication?.id) {
      deleteApplication({
        id: selectedApplication.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <>
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
          columns={applicationColumns({
            deleteApplicationHandler: handleDeleteApplication,
          })}
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

      {selectedApplication && (
        <AlertDialogDeleteApplication
          open={openAlertDialogDelete}
          setOpen={setOpenAlertDialogDelete}
          isPending={isDeletePending}
          confirmDelete={confirmDeleteApplication}
        />
      )}
    </>
  );
}
