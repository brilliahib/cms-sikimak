import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Application } from "@/types/applications/application";
import { ApplicationsType } from "@/validators/applications/applications-validator";

interface UpdateApplicationResponse {
  data: Application;
}

export const UpdateApplicationHandler = async (
  id: number,
  body: ApplicationsType,
  token: string,
): Promise<UpdateApplicationResponse> => {
  const { data } = await api.patch(`/applications/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateApplication = (
  options?: UseMutationOptions<
    UpdateApplicationResponse,
    AxiosError<UpdateApplicationResponse>,
    { id: number; body: ApplicationsType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      UpdateApplicationHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};
