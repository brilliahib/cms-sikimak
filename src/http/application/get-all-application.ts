import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Application } from "@/types/applications/application";

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface GetAllApplicationResponse {
  data: Application[];
  pagination: PaginationMeta;
}

export interface GetAllApplicationParams {
  name?: string;
  page?: number;
}

export const GetAllApplicationHandler = async (
  token: string,
  params?: GetAllApplicationParams,
): Promise<GetAllApplicationResponse> => {
  const { data } = await api.get<GetAllApplicationResponse>("/applications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return data;
};

export const useGetAllApplication = (
  token: string,
  params?: GetAllApplicationParams,
  options?: Partial<UseQueryOptions<GetAllApplicationResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-all-applications", params],
    queryFn: () => GetAllApplicationHandler(token, params),
    ...options,
  });
};
