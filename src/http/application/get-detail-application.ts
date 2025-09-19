import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Application } from "@/types/applications/application";

export interface GetDetailApplicationResponse {
  data: Application;
}

export const GetDetailApplicationHandler = async (
  id: number,
  token: string,
): Promise<GetDetailApplicationResponse> => {
  const { data } = await api.get<GetDetailApplicationResponse>(
    `/applications/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailApplication = (
  id: number,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailApplicationResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-detail-applications", id],
    queryFn: () => GetDetailApplicationHandler(id, token),
    ...options,
  });
};
