import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Application } from "@/types/applications/application";

interface DeleteApplicationPayload {
  id: number;
  token: string;
}

interface DeleteApplicationResponse {
  data: Application;
}

export const DeleteApplicationHandler = async ({
  id,
  token,
}: DeleteApplicationPayload): Promise<DeleteApplicationResponse> => {
  const { data } = await api.delete(`/applications/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteApplication = (
  options?: UseMutationOptions<
    DeleteApplicationResponse,
    AxiosError<unknown>,
    DeleteApplicationPayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteApplicationHandler,
    ...options,
  });
};
