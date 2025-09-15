import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ApplicationsType } from "@/validators/applications/applications-validator";

export const CreateApplicationHandler = async (
  body: ApplicationsType,
  token: string,
) => {
  const { data } = await api.post("/applications", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateApplication = (
  options?: UseMutationOptions<unknown, AxiosError, ApplicationsType>,
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (body) =>
      CreateApplicationHandler(body, session?.access_token ?? ""),
    ...options,
  });
};
